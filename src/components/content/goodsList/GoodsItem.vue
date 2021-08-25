<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        },
      },
    },
    computed: {
      showImage () {
        return this.goodsItem.image || this.goodsItem.show.img
      },
    },
    methods: {
      /**
       * 监听每个图片加载完毕-》
       * better-scroll第一次初始化的scrollHeight，是可能图片还没有完全加载完毕后的高度
       * 导致整个屏幕的高度，滑不动，监听每个图片加载完成后，然后调用scroll.refresh()-重新计算高度
       */
      imageLoad () {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick () {
        this.$router.push({ path: '/detail', query: { iid: this.goodsItem.iid } })
        // this.$router.push({ name: 'detail', params: { iid: this.goodsItem.iid } })
      },
    },
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;

    margin-bottom: 4px;
  }

  .goods-item img {
    width: 100%;
    height: 88%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    text-align: center;

    margin-top: 5px;
  }

  .goods-info p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;

    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;

    background: url("~assets/img/common/collect.svg") 0 0/14px;
  }
</style>
