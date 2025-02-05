import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { resolvers } from '@/graphql/schema/resolvers'
import { typeDefs } from '@/graphql/schema/typeDefs'

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Create a handler for Next.js API routes
const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST, handler as OPTIONS }