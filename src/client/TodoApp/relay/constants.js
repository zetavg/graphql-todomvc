export const GRAPHQL_ENDPOINT = `${window.location.protocol}//${window.location.host}/graphql`
export const GRAPHQL_SUBSCRIPTION_ENDPOINT =
  `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/graphql/subscriptions`
