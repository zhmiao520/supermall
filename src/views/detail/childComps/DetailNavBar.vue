<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img alt="" src="~assets/img/common/back.svg">
        </div>
      </template>
      <template #center>
        <div class="title">
          <div v-for="(item, index) in titles" :key="index" :class="{active: currentIndex === index}"
               class="title-item" @click="itemClick(index)">{{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar,
    },
    data () {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      backClick () {
        this.$router.back()
      },
      itemClick (index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
    },
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .back {
    text-align: center;
  }

  .back img {
    margin-top: 11px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
