//主要是将vuex的内容整合导出
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

//安装上Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store