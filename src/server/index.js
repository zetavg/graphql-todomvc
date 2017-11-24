// @flow

import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

import { getAuthenticatedUser } from './data'

const host = process.env.HOST || '0.0.0.0'
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

app.listen(port, () => console.log(`Server running at http://${host}:${port}/`))
