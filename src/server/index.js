// @flow

import express from 'express'
import morgan from 'morgan'
import { createServer } from 'http'
import path from 'path'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import graphqlHTTP from '../vendor/express-graphql'
import schema from './schema'

import { getAuthenticatedUser } from './data'

const env = process.env.ENV || 'production'
const port = process.env.PORT || 1337

const app = express()
app.use(morgan(env === 'production' ? 'combined' : 'dev'))

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

app.use('/', express.static(path.join(__dirname, '..', 'client')))

if (env === 'development') {
  /* eslint-disable global-require */
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../../webpack.config.js')
  const compiler = webpack({
    ...webpackConfig,
    entry: [
      ...webpackConfig.entry,
      'webpack-hot-middleware/client?reload=true',
    ],
    output: {
      filename: './bundle.js',
    },
    plugins: [
      ...webpackConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
  })
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    noInfo: true,
    stats: {
      colors: true,
    },
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'static', 'index.html')))

server.listen(port, () => console.log(`Server is now running on http://0.0.0.0:${port}`))
