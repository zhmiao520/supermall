<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  import Swiper from 'components/common/zmSwiper/Swiper'
  import SwiperItem from 'components/common/zmSwiper/SwiperItem'

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default () {
          return []
        },
      },
    },
    data () {
      return {
        isLoad: false,
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      imageLoad () {
        // 当第一张图片加载完成，就可以知道了，后续的无需继续回传函数
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      },
    },
  }
</script>

<style scoped>

</style>
