import { debounce } from './utils'
import { BACKTOP_DISTANCE } from './const'

import BackTop from 'components/content/BackTop/BackTop'

export const itemImageListenerMixin = {
  data () {
    return {
      itemImageListener: null,
    }
  },
  mounted () {
    // 1.监听better-scroll中的图片加载完毕后，重新渲染scrollHeight
    const refresh = debounce(this.$refs.scroll.refresh, 400)
    this.itemImageListener = () => {
      // 这样执行refresh会每次分页查询被执行30次,运用防抖函数
      // this.$refs.scroll.refresh()
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    listenShowBackTop (position) {
      this.isShowBackTop = Math.abs(position.y) > BACKTOP_DISTANCE
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
  },
}
