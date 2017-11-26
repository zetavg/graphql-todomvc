/**
 * Dynamic get a type to avoid circular dependency.
 *
 * @flow
 */

import type { GraphQLObjectType } from 'graphql'

/**
 * Get a type by it's name.
 *
 * @example getType('userType') // returns the userType
 */
const getType = (name: string): GraphQLObjectType => {
  /* eslint-disable global-require, import/no-dynamic-require */
  return require(`./${name}`).default
}

export default getType
