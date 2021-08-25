<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'

  import Scroll from 'components/common/scroll/Scroll'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      CartListItem,
      Scroll,
    },
    computed: {
      ...mapGetters(['cartList']),
    },
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    /*为了不让鼠标可滚动*/
    overflow: hidden;
  }
</style>
