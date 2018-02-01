import Vue from 'vue'
import Vuex from 'vuex'
import signIn from './modules/signIn'
import dialogs from './modules/dialog'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    signIn,
    dialogs
  },
  strict: debug
})
