import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart ({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      // 1.判断物品是不是已存在-unshift,shift,push,pop,reverse,sort,reduce,splice,filter,map,forEach,find,indexOf,includes
      const oldProduct = state.cartList.find(cart => cart.iid === payload.iid)

      // 2.商品数量是否+1
      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('成功添加商品')
      }
    })
  },
}
