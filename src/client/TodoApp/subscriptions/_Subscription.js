/* @flow */

import { requestSubscription } from 'react-relay'
import type { RequestSubscriptionConfig } from 'react-relay'
import type { RelayEnvironment, Disposable } from 'relay-runtime'

/**
 * Type defination of a typical variables object for Subscriptions.
 */
export type Variables = {|
  [string]: any,
|};

/**
 * A base abstract class for Subscriptions.
 */
export default class Subscription<T = Variables> {
  /**
   * Default variables
   */
  static defaultVariables = ({}: $Shape<Variables>)

  /**
   * The GraphQL subscription query
   */
  static subscription = (undefined: any)

  /**
   * Subscription configurations
   * @see {@link https://facebook.github.io/relay/docs/subscriptions.html|Relay Subscriptions}
   */
  getSubscriptionConfig(): $Shape<RequestSubscriptionConfig> {
    return (this.constructor.subscriptionConfig)
  }

  static subscriptionConfig = ({}: $Shape<RequestSubscriptionConfig>)

  _variables: $Shape<T>
  _environment: RelayEnvironment

  _subscriptionDisposable: Disposable | void

  /**
   * Constructor of a new Subscription
   *
   * @param {RelayEnvironment} environment - The Relay Environment.
   * @param {Variables} variables - An object that contains the variables of subscription.
   */
  constructor(environment: RelayEnvironment, variables?: $Shape<T>) {
    const { defaultVariables } = this.constructor

    this._environment = environment
    this._variables = Object.freeze({
      ...defaultVariables,
      ...variables,
    })
  }

  /**
   * Getter of the Relay Environment.
   *
   * $FlowFixMe
   */
  get environment(): RelayEnvironment {
    return this._environment
  }

  /**
   * Getter of the variables object.
   *
   * $FlowFixMe
   */
  get variables(): $Shape<T> {
    return this._variables
  }


  /**
   * Subscribe the subscription.
   */
  subscribe = (): Promise<void> => {
    const { subscription } = this.constructor
    const { environment, variables } = this

    const subscriptionConfig = this.getSubscriptionConfig()

    return new Promise((resolve, reject) => {
      this._subscriptionDisposable = requestSubscription(
        environment,
        {
          subscription,
          ...subscriptionConfig,
          variables,
          onCompleted: () => resolve(),
          onError: () => reject(),
        },
      )
    })
  }

  /**
   * Unsubscribe the subscription.
   */
  unsubscribe = (): boolean => {
    if (!this._subscriptionDisposable) return false
    this._subscriptionDisposable.dispose()
    this._subscriptionDisposable = undefined
    return true
  }
}
