import Vue from 'vue'
import Vuex from 'vuex'

import navigator from './modules/navigator'
import shared from './modules/shared'
import user from './modules/user'
import social from './modules/social'
import signup from './modules/signup'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    navigator,
    shared,
    user,
    social,
    signup
  }
})
