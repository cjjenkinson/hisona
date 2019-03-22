require('dotenv').config()
const compression = require('compression')
const debug = require('debug')('api')
debug('API server starting...')
debug('logging with debug enabled 🚀')
import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'
import resolvers from './resolvers'
import securityMiddleware from './routes/middlewares/security'
import permissionMiddleware from './routes/middlewares/permissions'

const apiTypeDefs = '../api/database/schema.graphql'
const prismaTypeDefs = '../api/generated/prisma.graphql'

const debugEnabled = process.env.NODE_ENV === 'development'

const endpoint = process.env.PRISMA_ENDPOINT_DEVELOPMENT

const prisma = new Prisma({
  typeDefs: prismaTypeDefs, // the auto-generated GraphQL schema of the Prisma API
  endpoint: endpoint, // the endpoint of the Prisma API (value set in `.env`)
  debug: debugEnabled, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
})

const context = (req) => {

  return {
    ...req,
    db: prisma,
  }
}

const server = new GraphQLServer({
  typeDefs: apiTypeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  middlewares: [
    permissionMiddleware,
  ],
  context,
})

const app = server.express
securityMiddleware(app)
app.use(compression())

const opts = {
  port: 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000']
  },
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.start(opts, () =>
  console.log(`API Server is running on http://localhost:${opts.port}/graphql`),
)

process.on('unhandledRejection', async err => {
  console.error('Unhandled rejection', err)
  try {
    // await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    console.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

process.on('uncaughtException', async err => {
  console.error('Uncaught exception', err)
  try {
    // await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    console.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})
