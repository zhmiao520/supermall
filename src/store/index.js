import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
  cartList: [],
}

const store = new Vuex.Store({
  state,
  /**
   * mutations->唯一的作用就是修改state中的数据
   * 原则：尽量单一一点的事件
   */
  mutations,
  /**
   * actions->复杂的业务逻辑/判断/异步
   */
  actions,
  getters,
});

export default store
