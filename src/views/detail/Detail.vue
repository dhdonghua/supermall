<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goodsItem="goodsItem" />
    <detail-shop-info :shop="shopInfo" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';

import {
  getDetail,
  Goods,
  Shop
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsItem: {},
      shopInfo: {}
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
        this.topImages = results.itemInfo.topImage;
        this.goodsItem = new Goods(results.itemInfo, results.columns, results.shopInfo.services)
        this.shopInfo = new Shop(results.shopInfo)
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
