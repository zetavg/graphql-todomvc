// @flow

import { GraphQLObjectType } from 'graphql'

import { nodeField } from '../relay'
import userType from './userType'

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    viewer: {
      type: userType,
      resolve(obj, args, context) {
        return context.viewer
      },
    },
  },
})

export default queryType
