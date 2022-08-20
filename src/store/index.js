import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

const context = require.context('./modules', false, /\.js$/)

const modules = context.keys().reduce((modules, path) => {
  const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = context(path).default
  return modules
}, {})

export default new Vuex.Store({
  getters,
  modules
})
