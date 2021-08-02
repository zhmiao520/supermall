<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive" class="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isActive" class="item-icon-active">
      <slot name="item-icon-active"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: {
        type: String,
        required: true
      },
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.link) !== -1
      },
      activeStyle() {
        return {color: this.isActive ? this.activeColor : ''}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.link)
      },
    },
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
  }
  .item-icon img, .item-icon-active img{
    margin-top: 5px;
    width: 23px;
    height: 23px;
    vertical-align: middle;
  }
  .item-text{
    font-size: 13px;
    color: #333;
    margin-top: 3px;
  }
</style>
