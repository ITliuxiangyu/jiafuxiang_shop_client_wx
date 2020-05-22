<template>
  <div>
    <tabbar>
      <tabbar-item v-tap="{methods: backFn , luyou_name: 'home'}">
        <img slot='icon' src='static/bottom/homeblack.png'>
        <img slot="icon-active" src="static/bottom/home.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-tap="{methods: backFn , luyou_name: 'classify'}">
        <img slot="icon" src="static/bottom/分类black.png">
        <img slot="icon-active" src="static/bottom/分类.png">
        <span slot="label">分类</span>
      </tabbar-item>
        <tabbar-item v-tap="{methods: backFn , luyou_name: 'find'}">
        <img slot="icon" src="static/bottom/发现.png">
        <img slot="icon-active" src="static/bottom/发现hong.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item v-tap="{methods: backFn , luyou_name: 'cart'}">
        <img slot="icon" src="static/bottom/购物车black.png">
        <img slot="icon-active" src="static/bottom/购物车.png">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item v-tap="{methods: backFn , luyou_name: 'userInfo'}">
        <img slot="icon" src="static/bottom/account.png">
        <img slot="icon-active" src="static/bottom/accountred.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  // this.$router.push({name: 'userInfo'})

  export default {
    components: {
      Tabbar,
      TabbarItem
    },
    methods: {
      backFn (params) {
        console.log(params)
        console.log(this.$router)
        this.$router.push({name: params.luyou_name})
      }
    }
  }
</script>
<style scoped>
  tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: red;
  }
</style>
