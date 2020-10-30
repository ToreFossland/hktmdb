"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _graphqlSchema = require("./graphql-schema");

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _neo4jDriver = _interopRequireDefault(require("neo4j-driver"));

var _neo4jGraphqlJs = require("neo4j-graphql-js");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _initialize = require("./initialize");

var _resolvers = require("./resolvers");

// set environment variables from .env
_dotenv.default.config();

const app = (0, _express.default)();
const schema = (0, _neo4jGraphqlJs.makeAugmentedSchema)({
  typeDefs: _graphqlSchema.typeDefs,
  resolvers: _resolvers.resolvers,
  config: {
    auth: {
      isAuthenticated: true
    }
  }
});
/*-------------------------------- */

const driver = _neo4jDriver.default.driver(process.env.NEO4J_URI, _neo4jDriver.default.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD), {
  encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF'
});

const init = async driver => {
  await (0, _initialize.initializeDatabase)(driver);
};

init(driver);
const server = new _apolloServerExpress.ApolloServer({
  context: async ({
    req
  }) => {
    let userid = "";

    try {
      userid = await req.headers.userid;
      console.log(userid + "server");
    } catch {}

    return {
      req,
      driver,
      neo4jDatabase: process.env.NEO4J_DATABASE,
      userid
    };
  },
  schema: schema,
  introspection: true,
  playground: true
}); // Specify host, port and path for GraphQL endpoint

const port = process.env.GRAPHQL_SERVER_PORT || 4001;
const path = process.env.GRAPHQL_SERVER_PATH || '/graphql';
const host = process.env.GRAPHQL_SERVER_HOST || '0.0.0.0';
/*
 * Optionally, apply Express middleware for authentication, etc
 * This also also allows us to specify a path for the GraphQL endpoint
 */

server.applyMiddleware({
  app,
  path
});
app.listen({
  host,
  port,
  path
}, () => {
  console.log(`GraphQL server ready at http://${host}:${port}${path}`);
});
/*

<id>:173_id:2343header:fin filmreview:darrlig filmscore:3userId:3343

CREATE (n:MovieReview {userId:'auth0|5f903d3f7539d1006893182f', header: 'haakon', review: 'Developer', score:'3' })
CREATE (n:MovieReview {userId:'5f903d3f7539d1006893182f', header: 'haakon', review: 'Developer', score:'3' })

MATCH (n:MovieReview), (k:Movie)
WHERE ID(MovieReview) = 175
RETURN MovieReview
5436543

//LAGE EN RELASJON MELLOM NODER
MATCH (n:MovieReview),(k:Movie)
WHERE  id(n) = 175 AND id(k) = 92
CREATE (n)-[r:REVIEW_OF]->(k)
RETURN type(r)


//      """MATCH (n:MovieReview {_id: $movieReviewId}) MATCH (k:Movie {_id: $movieId}) MERGE (n)-[:IN_CATEGORY]->(k) RETURN n;")


CREATE p = (Movie { ID:'92' })-[:Review]->(neo)<-[:WORKS_AT]-(michael { name: 'Michael' })
RETURN p
"funker i neo4j desktop
//statement:"MATCH (n:MovieReview),(k:Movie) WHERE  id(n) = $movieReviewId AND id(k) = $movieId CREATE (n)-[r:REVIEW_OF]->(k) RETURN n"
      )


type Mutation {
  addMovieReviewsRelation(movieReview: ID!, movieId: ID!): MovieReview 
    @cypher(
      statement:"""
      MATCH (n:MovieReview),(k:Movie) 
      WHERE id(n) = $movieReviewId AND id(k) = $movieId 
      CREATE (n)-[r:REVIEW_OF]->(k) 
      RETURN n"""
      )
}



*/