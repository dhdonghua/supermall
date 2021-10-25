<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goodsItem="goodsItem"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';

import { getDetail, Goods } from "network/detail";


export default {
  name: "Detail",
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsItem: {},
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
      });
    },
  },
};
</script>

<style scoped>
</style>