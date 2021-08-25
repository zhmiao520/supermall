<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.isChecked" @click.native="checkBtnClick"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.newPrice }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    props: {
      itemInfo: {
        type: Object,
        default () {
          return {}
        },
      },
    },
    components: {
      CheckButton,
    },
    methods: {
      checkBtnClick () {
        this.itemInfo.isChecked = !this.itemInfo.isChecked
      },
    },
  }
</script>

<style scoped>
  .shop-item {
    display: flex;
    /*width: 100%;*/
    font-size: 0;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    padding-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-title, .item-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
