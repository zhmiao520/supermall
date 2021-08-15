<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        scroll: null,
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // 1.创建scroll对象
        // click: true -> 放开scroll 里面标签元素的点击事件：div,span等等，但是不包含button
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad,
          //开启鼠标滚轮
          // mouseWheel: true,
        })

        // 2.监听滚动位置
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })

        // 3.监听上拉事件
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })

      },
      scrollTo (x, y, time = 300) {
        // 通过scroll回到哪个位置，time:滑动的过渡时间，单位：ms
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp () {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      getScrollY () {
        return this.scroll ? this.scroll.y : 0
      },
    },
  }
</script>

<style scoped>
</style>
