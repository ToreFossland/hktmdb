import { typeDefs } from './graphql-schema'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import neo4j from 'neo4j-driver'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import dotenv from 'dotenv'
import { initializeDatabase } from './initialize'

// set environment variables from .env
dotenv.config()

const app = express()

const schema = makeAugmentedSchema({
  typeDefs,
  config: {
    auth: {
      isAuthenticated: true,
    },
  },
})

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
  context: ({ req }) => {
    return {req, driver, neo4jDatabase: process.env.NEO4J_DATABASE};
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
