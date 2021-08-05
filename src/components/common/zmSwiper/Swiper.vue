<template>
  <div id="zm-swpier">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item, index) in slideCount" :key="index" class="indi-item"
             :class="{active: index === currentIndex - 1}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      /**
       * 多久滑动一次
       * 单位：毫秒
       */
      interval: {
        type: Number,
        default: 3000,
      },
      /**
       * 滚动动画的延迟时间(单次的滚动)
       * 单位：毫秒
       */
      animDuration: {
        type: Number,
        default: 300,
      },
      showIndicator: {
        type: Boolean,
        default: true,
      },
      /**
       * 按住slide元素拖动距离百分比指数
       * 比如：0.25->就是拖动到超过屏幕的25也就是1/4就直接滚动到下一个slide
       */
      moveRatio: {
        type: Number,
        default: 0.25,
      },
    },
    data() {
      return {
        // 元素个数
        slideCount: 0,
        // 当前下标
        currentIndex: 1,
        // swiper的宽度
        totalWidth: 0,
        // swiper的样式-》便于通过css属性-添加动画属性
        swiperStyle: {},
        // 是否正在滚动
        scrolling: false,
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.totalWidth = document.querySelector('.swiper').offsetWidth
      })
      setTimeout(() => {
        // 1.操作dom,在当前滚动的slide中，前后添加对应的slide
        this.handleDom()

        // 2.开启定时器
        this.startTimer()
      }, 100)
    },
    methods: {
      /**
       * 操作dom,在当前滚动的slide中，前后添加对应的slide
       */
      handleDom() {
        // 1.通过子组件的类slide获取需要操作的元素
        let swiperEl = document.querySelector('.swiper')
        let slideEls = swiperEl.getElementsByClassName('slide')

        // 2.保存slide个数
        this.slideCount = slideEls.length

        // 3.如果元素个数>1则在其前后分别添加slide
        if (this.slideCount > 1) {
          let cloneFirst = slideEls[0].cloneNode(true)
          let cloneLast = slideEls[this.slideCount - 1].cloneNode(true)
          /*
             滚动是一个持续的过程，当滑动到最后的一个元素，继续滑动，那么在第一个前面插入一个最后一个元素，周而复始
             比如：元素下标开始是:0>1>2,2需要重新回到0:0>1>2>0
           */
          swiperEl.insertBefore(cloneLast, slideEls[0])
          swiperEl.appendChild(cloneFirst)
          // offsetWidth = width + 左右padding + 左右border
          this.totalWidth = swiperEl.offsetWidth
          this.swiperStyle = swiperEl.style
        }
        // 设置滚动的位置
        this.setTransform(-this.totalWidth)
      },
      touchStart(e) {
        // 1.如果正在滚动，不可以拖动
        if (this.scrolling) return

        // 2.停止计时器
        this.stopTimer()

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX
      },
      touchMove(e) {
        // 1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX
        this.distance = this.currentX - this.startX
        let currentPosition = -this.currentIndex * this.totalWidth
        let movePosition = this.distance + currentPosition

        // 2.设置当前位置
        this.setTransform(movePosition)
      },
      touchEnd(e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance)

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
          // 向左超过moveRatio
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
          // 向右超过moveRatio
          this.currentIndex++
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth)

        // 4.开启计时器
        this.startTimer()
      },
      /**
       * 开启计时器
       * 设置多久滚动一次；
       * 下标++
       * 设置滚动动画
       */
      startTimer() {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++
          // 滚动到正确的位置
          this.scrollContent(-this.currentIndex * this.totalWidth)
        }, this.interval)
      },
      stopTimer() {
        window.clearInterval(this.playTimer)
      },

      /**
       * 设置滚动内容
       * 设置开启滚动标识
       * 设置滚动动画的过渡时间
       * 设置滚动的动画距离
       * 检查滚动的位置
       * 关闭滚动的标识
       * @param currentPosition 当前的位置
       */
      scrollContent(currentPosition) {
        // 1.设置开始滚动标识
        this.scrolling = true

        // 2.开始滚动动画
        this.swiperStyle.transition = `transform ${this.animDuration}ms`
        // 3.设置滚动的位置->默认往左滚动,因此距离是负的
        this.setTransform(currentPosition)

        // 4.校验滚动的位置
        this.checkPosition()

        // 5.设置滚动结束
        this.scrolling = false
      },
      /**
       * 检查滚动的位置->在单哥滚动动画的过渡时间之内(保持与滚动动画的时间一致)
       *
       * 滚动的下标必须在0-banner长度之间
       * 超出将当前下标重置==1;其他将不滚动==0
       * 设置滚动的距离
       */
      checkPosition: function () {
        window.setTimeout(() => {
          // 1.校验正确的位置
          this.swiperStyle.transition = '0ms'
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1
            this.setTransform(-this.currentIndex * this.totalWidth)
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount
            this.setTransform(-this.currentIndex * this.totalWidth)
          }

          // 2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex - 1)
        }, this.animDuration)
      },
      /**
       * 设置滚动的位置
       * @param position 滚动的距离
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate3d(${position}px,0,0)`
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`
      },
    },
  }
</script>

<style scoped>
  #zm-swpier {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    position: absolute;
    bottom: 8px;
    width: 100%;
    justify-content: center;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212, 62, 46, 1.0);
  }
</style>
