<template>
  <div id="detail">
    <detail-nav-bar @NavBarClick="scrollTo" class="detail-nav-bar" ref="navbar" />
    <detail-swiper :topImages="topImages" ref="swiper" />
    <detail-base-info :goodsItem="goodsItem" />
    <detail-shop-info :shop="shopInfo" />
    <detail-goods-info :detailInfo="detailInfo" />
    <detail-param-info :paramInfo="paramInfo" ref="param" />
    <detail-comment-info :commentInfo="commentInfo" ref="comment" />
    <goods-list :goods="recommends" ref="goodsList" />
    <detail-bottom-bar />  
    <back-top @click="backtopclick" v-show="showBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import GoodsList from "components/content/goods/GoodsList";
import { backTopMixin } from "common/mixin.js"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
  },
  mixins: [ backTopMixin ],
  data() {
    return {
      iid: null,
      topImages: [],
      goodsItem: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTop: [],
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData(this.iid);
    this.getRecommendData();
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    $route(to, from) {
      if (to.path.indexOf("/detail/") != -1 && from.path.indexOf("/detail/") != -1) {
        this.iid = to.params.id;
        this.getDetailData(this.iid);
        this.getRecommendData();
        window.scrollTo(0, 0);
      }
    },
  },
  methods: {
    /**
     * 网络请求相关
     */
    getDetailData(iid) {
      getDetail(iid).then((res) => {
        const results = res.result;

        //顶部轮播图
        this.topImages = results.itemInfo.topImage;

        //获取商品信息
        this.goodsItem = new Goods(results.itemInfo, results.columns, results.shopInfo.services);

        //获取店铺信息
        this.shopInfo = new Shop(results.shopInfo);

        //获取商品的详情数据
        this.detailInfo = results.detailInfo;

        //获取参数信息
        this.paramInfo = new GoodsParam(results.itemParams.info, results.itemParams.rule);

        //获取评论信息
        if (results.rate.cRate !== 0) {
          this.commentInfo = results.rate.list[0];
        }

        this.$nextTick(() => {
          this.themeTop.push(this.$refs.swiper.$el.offsetTop - 44);
          this.themeTop.push(this.$refs.param.$el.offsetTop - 44);
          this.themeTop.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTop.push(this.$refs.goodsList.$el.offsetTop - 44);
          window.addEventListener('scroll', this.handleScroll)
        });
      });
    },
    getRecommendData() {
      getRecommend().then((res) => {
        //获取推荐商品信息
        this.recommends = res.data.list;
      });
    },
    /**
     * 事件相关
     */
    //跳转到指定元素
    scrollTo(val) {
      const STEP = 50; // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离
      var targetOffsetTop = this.themeTop[val]; //获取指定元素与视口的距离

      if (scrollTop < targetOffsetTop) {
        smoothDown();
      } else {
        smoothUp();
      }
      // 定义下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳加上 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          // 屏幕在绘制下一帧时会回调传给 requestAnimationFrame 的函数
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义上滑函数
      function smoothUp() {
        // 如果当前 scrollTop 大于 targetOffsetTop 说明视口已经滑过指定位置需要上滑
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothUp);
        }
      }
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop //获取滚动距离
      
      //判断是否显示回到顶部组件BackTop
      this.showBackTop = scrollTop > 1000;

      let length = this.themeTop.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length - 1 && scrollTop >= this.themeTop[i] - 1 && scrollTop < this.themeTop[i + 1]) || (i === length - 1 && scrollTop >= this.themeTop[i] - 1))) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
    },
    backtopclick() {
      this.scrollTo(0)
    }
  },
};
</script>

<style scoped>
#detail {
  /* 为了覆盖底部的导航栏MainTabBar组件 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 为了不被底部的导航栏DetailBottomBar组件覆盖部分商品信息*/
  margin-bottom: 58px; 
}

.detail-nav-bar {
  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #fff;
}
</style>
