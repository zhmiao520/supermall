<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <!--便于tab-control吸顶展示-->
    <tab-control v-show="isTabControlFixed" ref="tabControlFixed" :class="{fixed: isTabControlFixed}"
                 :titles="['流行', '新款', '潮流']"
                 class="tab-control" @tabClick="tabClick"/>
    <scroll ref="scroll" :probe-type="3" :pull-up-load="true" class="content" @pullingUp="loadMore"
            @scroll="contentScroll">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl" :titles="['流行', '新款', '潮流']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import { getHomeGoods, getHomeMultiData } from 'network/home'
  import { backTopMixin, itemImageListenerMixin } from 'common/mixin'
  import { NEW, POP, SELL } from 'common/const'

  export default {
    name: 'Home',
    mixins: [itemImageListenerMixin, backTopMixin],
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        currentType: POP,
        tabControlOffsetTop: 0,
        isTabControlFixed: false,
        saveScrollY: 0,
      }
    },
    computed: {
      showGoods () {
        return this.goods[this.currentType].list
      },
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    created () {
      // 1.获取多个数据
      this.getHomeMultiData()

      // 2.获取商品数据
      this.getHomeGoods(POP)
      this.getHomeGoods(NEW)
      this.getHomeGoods(SELL)
    },
    activated () {
      this.$refs.scroll.scrollTo(0, this.saveScrollY, 0)
      // 避免来回切换界面，出现偶尔界面无法滑动，因此最好重新刷新refresh
      this.$refs.scroll.refresh()
    },
    deactivated () {
      // 1.保存滚动的位置
      this.saveScrollY = this.$refs.scroll.getScrollY()

      // 2.关闭事件总线的事件监听
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        // 当tabControl处于吸顶的状态，不管点击的是哪个(原有状态/吸顶状态)需要将点击的index赋值给组件
        this.$refs.tabControlFixed.currentIndex = this.$refs.tabControl.currentIndex = index
      },
      contentScroll (position) {
        // position.y 是一个负数
        // 1.监听backTop是否展示
        this.listenShowBackTop(position)

        // 2.监听tabControl是否吸顶
        this.isTabControlFixed = Math.abs(position.y) > this.tabControlOffsetTop
      },
      loadMore () {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad () {
        /*
         此时获取tab-control的offsetTop是不准的，因为轮播图以及其他小图片没有全部加载完
         当轮播图加载完成后，其他小图已经加载完了，如果高度不准，后续可继续对其他小图也进行图片加载完成的监听
         */
        this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultiData () {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods (type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 关闭上拉加载事件
          this.$refs.scroll.finishPullUp()
        })
      },
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFF;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }

  .tab-control {
    position: relative;
    z-index: 10;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  /*.content {*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 44px - 49px);*/
  /*}*/
</style>
