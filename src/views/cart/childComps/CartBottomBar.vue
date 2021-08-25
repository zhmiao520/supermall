<template>
  <div class="bottom-bar">
    <div class="checked-content">
      <check-button :is-checked="isSelectAll" class="checked-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calc" @click="calcClick">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice () {
        return '¥' + this.cartList
          .filter(d => d.isChecked)
          .reduce(((previousValue, item) => previousValue + item.count * item.newPrice), 0)
          .toFixed(2)
      },
      checkedLength () {
        return this.cartList.filter(d => d.isChecked).length
      },
      isSelectAll () {
        if (!this.cartList.length) return false

        // 找到有未选中的，然后如果有一个未选中，则将全选改为false：true -> false
        return !this.cartList.find(d => !d.isChecked)
      },
    },
    methods: {
      checkClick () {
        if (this.isSelectAll) {
          // 全部选中
          this.cartList.forEach(d => d.isChecked = false)
        } else {
          // 部分选中
          this.cartList.forEach(d => d.isChecked = true)
        }
      },
      calcClick () {
        // 有未选中的/活着商品列表为空
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品')
        }
      },
    },
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    line-height: 40px;
    display: flex;

    font-size: 14px;

    background-color: #eee;
  }

  .checked-content {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 90px;
    margin-right: 10px;
  }

  .checked-button {
    width: 22px;
    height: 22px;
    line-height: 22px;

    margin: 0 5px;
  }

  .price {
    flex: 1;
  }

  .calc {
    width: 90px;
    text-align: center;

    background-color: red;
    color: #FFFFFF;
  }
</style>
