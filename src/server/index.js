// @flow

import express from 'express'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import graphqlHTTP from '../../vendor/express-graphql'
import schema from './schema'

import { getAuthenticatedUser } from './data'

const port = process.env.PORT || 1337

const app = express()

app.use((req, res, next) => {
  req.viewer = getAuthenticatedUser()
  next()
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

const server = createServer(app)

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server,
    path: '/graphql/subscriptions',
  },
)

server.listen(port, () => console.log(`Server is now running on http://0.0.0.0:${port}`))
