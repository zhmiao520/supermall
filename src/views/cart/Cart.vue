<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="nav-bar">
      <template #center>购物车({{ cartLength }})</template>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部工具栏-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import NavBar from 'components/common/navbar/NavBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      CartList,
      CartBottomBar,
      NavBar,
    },
    computed: {
      ...mapGetters(['cartLength']),
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
