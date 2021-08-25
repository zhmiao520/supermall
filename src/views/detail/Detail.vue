<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll ref="scroll" :probe-type="3" class="detail-scroll" @scroll="detailScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goodsList/GoodsList'

  import { getDetail, getRecommend, Goods, GoodsParam, Shop } from '@/network/detail'
  import { backTopMixin, itemImageListenerMixin } from 'common/mixin'
  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    mixins: [itemImageListenerMixin, backTopMixin],
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        itemImageListener: null,
        /*
         导航栏每个标题对应的offsetTop
         1.created-》获取不到！此时界面dom元素未渲染
         2.mountrd-》也不行！此时created加载的数据还未加载完毕
         3.updated->会触发多次，且前面几次也是没完全渲染完毕，直到后面几次才是完完全全加载完毕的
         4.$nexttick->在数据完全加载完毕，但是图片还未加载完毕

         因此，只能监听商品图片加载完毕后，获取！
         */
        themeOffsetTopYs: [],
      }
    },
    created () {
      // 1.获取界面传递的商品iid
      this.iid = this.$route.query.iid

      // 2.根据商品iid-》获取商品详情
      getDetail(this.iid).then(res => {
        const data = res.result
        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.获取推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    destroyed () {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      // ...mapActions({
      //   add: 'addCart'
      // }),
      ...mapActions(['addCart']),
      titleClick (index) {
        this.$refs.scroll.scrollTo(0, -this.themeOffsetTopYs[index])
      },
      imageLoad () {
        this.$refs.scroll.refresh()

        // 获取商品，参数，评论，推荐-》offsetTop
        this.themeOffsetTopYs = [
          0,
          this.$refs.param.$el.offsetTop,
          this.$refs.comment.$el.offsetTop,
          this.$refs.recommend.$el.offsetTop,
          Number.MAX_VALUE,
        ]
      },
      detailScroll (position) {
        // 1.监听backTop是否展示
        this.listenShowBackTop(position)

        // 2.监听显示标题的激活
        const positionY = -position.y
        const length = this.themeOffsetTopYs.length
        // for (let i = 0; i < length; i++) {
        //   let themeOffsetTopY = this.themeOffsetTopYs[i]
        //   if (this.currentIndex !== i && (
        //     (i < length - 1 && positionY >= themeOffsetTopY && positionY < this.themeOffsetTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= themeOffsetTopY)
        //   )) {
        //     this.$refs.nav.currentIndex = this.currentIndex = i
        //   }
        // }
        for (let i = 0; i < length - 1; i++) {
          if (positionY >= this.themeOffsetTopYs[i] && positionY < this.themeOffsetTopYs[i + 1]) {
            if (this.currentIndex !== i) {
              this.$refs.nav.currentIndex = this.currentIndex = i
            }
            break
          }
        }
      },
      addToCart () {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.realPrice;

        // 3.将商品加入vuex
        // this.$store.dispatch('addCart', obj).then(res => {
        //   console.log(res)
        // })

        this.addCart(obj).then(res => {
          this.$toast.show(res)
        })
      },
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;

    height: 100vh;
  }

  .detail-scroll {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
  }
</style>
