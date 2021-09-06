<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>首页</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      homedata: [],
    };
  },
  created() {
    getHomeMultidata().then((res) => {
      console.log(res);
      //this.homedata = res;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>