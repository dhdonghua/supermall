<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: { DetailNavBar, DetailSwiper },
  data() {
    return {
      iid: null,
      topImages: [],
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
        this.topImages = res.result.itemInfo.topImage;
      });
    },
  },
};
</script>

<style scoped>
</style>