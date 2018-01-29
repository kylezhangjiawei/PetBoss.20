import Vue from 'vue'
import Vuex from 'vuex'
import signIn from './modules/signIn'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    signIn
  },
  strict: debug
})
