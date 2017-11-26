import { Network } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { GRAPHQL_ENDPOINT, GRAPHQL_SUBSCRIPTION_ENDPOINT } from './constants'

function fetchQuery(
  operation,
  variables,
  // cacheConfig,
  // uploadables,
) {
  return fetch(GRAPHQL_ENDPOINT, {
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

const wsSubscriptionClient = new SubscriptionClient(GRAPHQL_SUBSCRIPTION_ENDPOINT, {
  reconnect: true,
})

function subscriptionHandler(
  operation,
  variables,
  cacheConfig,
  observer,
) {
  const subscription = wsSubscriptionClient.request({
    query: operation.text,
    operationName: operation.name,
    variables,
  }).subscribe({
    next(result) {
      observer.onNext(result)
    },
    error(e) {
      observer.onError(e)
    },
    complete() {
      observer.onCompleted()
    },
  })

  // Return an object for Relay to unsubscribe with
  return {
    dispose: () => {
      subscription.unsubscribe()
    },
  }
}

const network = Network.create(fetchQuery, subscriptionHandler)

export default network
