<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goodsItem="goodsItem" />
    <detail-shop-info :shop="shopInfo" />
    <detail-goods-info :detailInfo="detailInfo" />
    <detail-param-info :paramInfo="paramInfo" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsItem: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData(this.iid);
  },
  methods: {
    /**
     * 网络请求相关
     */
    getDetailData(iid) {
      getDetail(iid).then((res) => {
        console.log(res);
        const results = res.result

        //顶部轮播图
        this.topImages = results.itemInfo.topImage;

        //获取商品信息
        this.goodsItem = new Goods(results.itemInfo, results.columns, results.shopInfo.services)

        //获取店铺信息
        this.shopInfo = new Shop(results.shopInfo)

        //获取商品的详情数据
        this.detailInfo = results.detailInfo

        //获取参数信息
        this.paramInfo = new GoodsParam(results.itemParams.info, results.itemParams.rule)
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
