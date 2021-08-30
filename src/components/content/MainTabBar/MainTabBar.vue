<template>
  <tab-bar>
      <tab-bar-item path="/home">
        <!-- 旧版本的solt
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text" class="tab-bar-item">首页</div> -->
        <template #item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
        <template #item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
        <template #item-text><div class="tab-bar-item">首页</div></template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template #item-icon><img src="~assets/img/tabbar/category.svg" alt=""></template>
        <template #item-icon-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
        <template #item-text><div class="tab-bar-item">分类</div></template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template #item-icon><img src="~assets/img/tabbar/cart.svg" alt=""></template>
        <template #item-icon-active><img src="~assets/img/tabbar/cart_active.svg" alt=""></template>
        <template #item-text><div class="tab-bar-item">购物车</div></template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template #item-icon><img src="~assets/img/tabbar/profile.svg" alt=""></template>
        <template #item-icon-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
        <template #item-text><div class="tab-bar-item">我的</div></template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>

import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>