import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  [ADD_TO_CART] (state, payload) {
    // 默认商品加入购物车时-》选中
    payload.isChecked = true
    state.cartList.push(payload)
  },
}
