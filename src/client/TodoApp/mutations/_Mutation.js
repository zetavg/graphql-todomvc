/* @flow */

import { commitMutation } from 'react-relay'
import type { CommitMutationConfig } from 'react-relay'
import type { RelayEnvironment } from 'relay-runtime'
import uuidv4 from 'uuid/v4'
import validate from 'validate.js'
import type { Constraints } from 'validate.js'

/**
 * Type defination of a typical input object.
 */
export type Input = {|
  [string]: any,
|};

/**
 * Type defination of a typical option object.
 */
export type Options = ?{||};

/**
 * Defination for validation errors.
 */
export type ValidationErrors = { [key: string]: Array<string> };

class MutationValidationError extends Error {
  object: ValidationErrors

  constructor(message: string, object: ValidationErrors) {
    super(message)
    this.object = object
  }
}

/**
 * A base abstract Mutation class to support input validation.
 */
export default class Mutation<T = Input, O = Options> {
  /**
   * Default input
   */
  static defaultInput = ({}: $Shape<T>)

  /**
   * Constraints that is used for validate.js
   */
  static constraints = ({}: Constraints)

  /**
   * The GraphQL mutation query
   */
  static mutation = (undefined: any)

  /**
   * The input variable name in the GraphQL mutation query
   */
  static inputName = 'input'

  /**
   * Mutation configurations
   * @see {@link https://facebook.github.io/relay/docs/mutations.html|Relay Mutations}
   */
  getMutationConfig(): $Shape<CommitMutationConfig> {
    return (this.constructor.mutationConfig)
  }

  static mutationConfig = ({}: $Shape<CommitMutationConfig>)

  /**
   * A static function to update the input of a given mutation
   *
   * @param {Mutation} mutation - A mutation.
   * @param {Input} inputChanges - An object that contains the input of mutation.
   * @returns {Mutation}
   */
  static updateInput<MT: $Supertype<Mutation<*>>>(mutation: MT, inputChanges: $Shape<T>): MT {
    if (
      !mutation ||
      !mutation.environment ||
      typeof mutation.input !== 'object' ||
      typeof mutation.constructor !== 'function'
    ) {
      const message = `${this.name}.updateInput accepts a mutation object as the first argument, ` +
                      'and the changes as the second argument.'
      throw new Error(message)
    }

    const newInput = {
      ...mutation.input,
      ...inputChanges,
    }

    const { options } = mutation

    return new mutation.constructor(mutation.environment, newInput, options)
  }

  _id: string;
  _environment: RelayEnvironment;
  _input: $Shape<T>;
  _options: ?O;

  _validated: boolean;
  _errors: ValidationErrors;
  _asyncValidationPromise: Promise<ValidationErrors | void>;

  /**
   * Constructor of a new Mutation.
   *
   * @param {RelayEnvironment} environment - The Relay Environment.
   * @param {Input} input - An object that contains the input of mutation.
   */
  constructor(environment: RelayEnvironment, input?: $Shape<T>, options?: O) {
    const { defaultInput } = this.constructor

    this._id = uuidv4()
    this._environment = environment
    this._input = Object.freeze({
      ...defaultInput,
      ...input,
    })
    this._options = options
    this._validated = false
  }

  /**
   * Getter of the Mutation ID.
   *
   * $FlowFixMe
   */
  get id(): string {
    return this._id
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
   * Getter of the input object.
   *
   * $FlowFixMe
   */
  get input(): $Shape<T> {
    return this._input
  }

  /**
   * Getter of the options object.
   *
   * $FlowFixMe
   */
  get options(): O | {} {
    return this._options || {}
  }

  /**
   * Getter of validation errors.
   *
   * $FlowFixMe
   */
  get errors(): ValidationErrors {
    this._validate()
    return this._errors
  }

  /**
   * Getter of valid status.
   *
   * $FlowFixMe
   */
  get isValid(): Promise<boolean> {
    this._validate()
    return !this._errors
  }

  /**
   * Getter of async validation errors.
   */
  getIsValidAsync = async (): Promise<boolean> => {
    const errors = await this._validateAsync()
    return !errors
  }

  /**
   * Getter of async valid status.
   */
  getErrorsAsync = async (): Promise<ValidationErrors> => {
    const errors = await this._validateAsync()
    return errors
  }

  _validate = () => {
    if (this._validated) return
    this._errors = validate(this.input, this.constructor.constraints)
    this._validated = true
  }

  _validateAsync = () => {
    // Reuse the existing promise
    if (this._asyncValidationPromise) return this._asyncValidationPromise

    // Or create the promise of async validation
    // $FlowFixMe
    this._asyncValidationPromise = new Promise((resolve) => {
      validate.async(this.input, this.constructor.constraints).then(() => {
        resolve()
      }, (errors: ValidationErrors) => {
        resolve(errors)
      })
    })

    return this._asyncValidationPromise
  }

  /**
   * Commit the mutation.
   */
  commit = (options?: {| throw?: boolean |}): Promise<{ response: ?Object, errors: ?[Error]} > => {
    if (!this.isValid) {
      const { errors } = this
      const fullMessage =
        Object.keys(errors).map(k => errors[k].join(', ')).join(', ')
      const error = new MutationValidationError(fullMessage, errors)

      if (!options || options.throw !== false) {
        throw error
      }

      return Promise.resolve({ response: null, errors: [error] })
    }

    const { mutation, inputName } = this.constructor
    if (!mutation) throw new Error(`The mutation of ${this.constructor.name} is undefined`)
    const { id: clientMutationId, environment, input } = this
    const mutationConfig = this.getMutationConfig()

    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation,
          ...mutationConfig,
          variables: {
            [inputName]: {
              ...input,
              clientMutationId,
            },
            ...mutationConfig.variables,
          },
          onCompleted: (response, errors) => resolve({ response, errors }),
          onError: error => reject(error),
        },
      )
    })
  }
}
