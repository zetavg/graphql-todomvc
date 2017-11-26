const objToKeyValAry = obj => Object.keys(obj).map(k => [k, obj[k]])
const reduceKeyValAryToObjArgs = [(o, [k, v]) => ({ ...o, [k]: v }), {}]

const getSubscriptionFieldsFromMutation = mutation => (
  objToKeyValAry(mutation.type.getFields())
    .filter(([k]) => k !== 'clientMutationId')
    .map(([k, { name, type, resolve }]) => [k, { name, type, resolve }])
    .reduce(...reduceKeyValAryToObjArgs)
)

export default getSubscriptionFieldsFromMutation
