<template>
  <div id="Init">
      <div v-if="$route.meta.keepAlive">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive && $route.name == 'home'">
          </router-view>
          <router-view v-else-if="$route.meta.keepAlive && $route.name == 'classify'">
          </router-view>
          <router-view v-else-if="$route.meta.keepAlive && $route.name == 'find'">
          </router-view>
          <router-view v-else-if="$route.meta.keepAlive && $route.name == 'cart'">
          </router-view>
          <router-view v-else-if="$route.meta.keepAlive && $route.name == 'userInfo'">
          </router-view>
          <router-view v-else>
          </router-view>
        </keep-alive>
      </div>
      <div v-else>
        <router-view>
        </router-view>
      </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import Top from '../components/layouts/top.vue'
  import Bottom from '../components/layouts/bottom.vue'
  export default {
    components: {Top, Bottom}
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background: #f4f4f4
  }
  #Init .top{margin-bottom: 46px;}
</style>
