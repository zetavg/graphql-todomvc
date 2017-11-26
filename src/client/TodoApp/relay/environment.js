import {
  Environment,
} from 'relay-runtime'

import network from './network'
import handlerProvider from './handlerProvider'
import store from './store'

const environment = new Environment({
  handlerProvider,
  network,
  store,
})

export default environment
