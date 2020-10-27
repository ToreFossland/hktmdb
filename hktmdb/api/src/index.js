import { typeDefs } from './graphql-schema'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import neo4j from 'neo4j-driver'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import dotenv from 'dotenv'
import { initializeDatabase } from './initialize'
import {resolvers} from './resolvers';



// set environment variables from .env
dotenv.config()

const app = express()

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  config: {
    auth: {
      isAuthenticated: true,
    },
  },
})


/*-------------------------------- */


const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEO4J_USER,
    process.env.NEO4J_PASSWORD
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

const init = async (driver) => {
  await initializeDatabase(driver)
}

init(driver)

const server = new ApolloServer({
  context: async ({ req }) => {
    let userid = ""
    try{
      userid = await req.headers.userid
      console.log(userid + "server")
    }
    catch{}
    return {req, driver, neo4jDatabase: process.env.NEO4J_DATABASE, userid}
  },
  schema: schema,
  introspection: true,
  playground: true,
})



// Specify host, port and path for GraphQL endpoint
const port = process.env.GRAPHQL_SERVER_PORT || 4001
const path = process.env.GRAPHQL_SERVER_PATH || '/graphql'
const host = process.env.GRAPHQL_SERVER_HOST || '0.0.0.0'

/*
 * Optionally, apply Express middleware for authentication, etc
 * This also also allows us to specify a path for the GraphQL endpoint
 */



server.applyMiddleware({ app, path })

app.listen({ host, port, path }, () => {
  console.log(`GraphQL server ready at http://${host}:${port}${path}`)
})



/*

<id>:173_id:2343header:fin filmreview:darrlig filmscore:3userId:3343

CREATE (n:MovieReview {userId:'auth0|5f903d3f7539d1006893182f', header: 'haakon', review: 'Developer', score:'3' })
CREATE (n:MovieReview {userId:'5f903d3f7539d1006893182f', header: 'haakon', review: 'Developer', score:'3' })

MATCH (n:MovieReview), (k:Movie)
WHERE ID(MovieReview) = 175
RETURN MovieReview


//LAGE EN RELASJON MELLOM NODER
MATCH (n:MovieReview),(k:Movie)
WHERE  id(n) = 175 AND id(k) = 92
CREATE (n)-[r:REVIEW_OF]->(k)
RETURN type(r)


CREATE p = (Movie { ID:'92' })-[:Review]->(neo)<-[:WORKS_AT]-(michael { name: 'Michael' })
RETURN p


*/