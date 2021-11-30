<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goodsItem="goodsItem" />
    <detail-shop-info :shop="shopInfo" />
    <detail-goods-info :detailInfo="detailInfo" />
    <detail-param-info :paramInfo="paramInfo" />
    <detail-comment-info :commentInfo="commentInfo" />
    <goods-list :goods="recommends" />
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

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
import GoodsList from 'components/content/goods/GoodsList'

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
    GoodsList,
  },
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
    };
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData(this.iid);
    this.getRecommendData();
  },
  watch:{
    $route(to,from){
      if(to.path.indexOf('/detail/') != -1 && from.path.indexOf('/detail/') != -1){
        this.iid = to.params.id;
        this.getDetailData(this.iid);
        this.getRecommendData();
        window.scrollTo(0, 0);
      }
    }
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
        this.goodsItem = new Goods(
          results.itemInfo,
          results.columns,
          results.shopInfo.services
        );

        //获取店铺信息
        this.shopInfo = new Shop(results.shopInfo);

        //获取商品的详情数据
        this.detailInfo = results.detailInfo;

        //获取参数信息
        this.paramInfo = new GoodsParam(
          results.itemParams.info,
          results.itemParams.rule
        );

        //获取评论信息
        if (results.rate.cRate !== 0) {
          this.commentInfo = results.rate.list[0];
        }
      });
    },
    getRecommendData() {
      getRecommend().then((res) => {
        //获取推荐商品信息
        this.recommends = res.data.list;
      });
    },
  },
};
</script>

<style scoped>
#detail {
  /* 为了覆盖底部的导航栏MainTabBar组件 */
  position: relative;
  z-index: 9;
  background-color: #fff;
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
