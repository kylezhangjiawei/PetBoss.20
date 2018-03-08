import Vue from 'vue'
import Vuex from 'vuex'
import signIn from './modules/signIn'
import dialogs from './modules/dialog'
import copy from './modules/copy'
import peopleData from './modules/peopleData'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    signIn,
    dialogs,
    copy,
    peopleData
  },
  strict: debug
})
