import { Network } from 'relay-runtime'
import { API_ENDPOINT } from './constants'

function fetchQuery(
  operation,
  variables,
  // cacheConfig,
  // uploadables,
) {
  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      operationName: operation.name,
      variables,
    }),
  }).then(response => response.json())
}

const network = Network.create(fetchQuery)

export default network
