<template>
  <div>
    <x-header>
      <span>{{this_page_title}}</span>
      <x-icon @click="goBackBtn" slot="ios-arrow-left" type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <x-icon v-tap="{methods:hengshuBtn}" v-if="isHeng" slot="right" type="android-menu" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <x-icon v-tap="{methods:hengshuBtn}" v-if="!isHeng" slot="right" type="android-apps" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div class="wrap_content">
      <shop-list v-show="isHeng" :shopList="shoplistData"></shop-list>
      <shoplist-page v-show="!isHeng" :shoplistData="shoplistData"></shoplist-page>
    </div>
    
        
  
  
  </div>       
</template>



<style>
</style>

<script>
import {XHeader} from 'vux'
import shopList from '../../components/toolComponent/shopList.vue'
import shoplistPage from '../../components/toolComponent/shoplistPage.vue'
import {homeUrl, myTools} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    XHeader,
    shoplistPage,
    shopList
  },
  data () {
    return {
      isHeng: false,
      this_page_title: '浏览记录',
      shoplistData: [],
      user_info: myTools().get_local_userinfo,
      fromPosition: localStorage.getItem('fromPosition'),
      dataUrl: 'favoriteAndLookTableManageJsonSelect/'
    }
  },
  created: function () {
    if (this.$data.fromPosition === 'jifen') {
      this.$data.dataUrl = 'jifenListJson/'
      this.$data.this_page_title = '积分商城'
    }
    this.historyData()
    this.$nextTick(function () {
      // 视频滚动区域高度
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      this.$('.wrap_content').height(windowHeight - headerHeight)
      this.$('.wrap_content').css({
        'overflow': 'scroll'
      })
    })
  },
  methods: {
    goBackBtn () {
      window.history.go(-1)
    },
    hengshuBtn () {
      this.$data.isHeng = !this.$data.isHeng
    },
    historyData () {
      var that = this
      var datas = qs.stringify({
        wxid: that.user_info.wxid,
        tablename: 'lookhistory'
      })
      axios
        .post(homeUrl() + this.$data.dataUrl, datas, { emulateJSON: true })
        .then(
          result => {
            that.shoplistData = []
            for (var i = 0; i < result.data.data.length; i++) {
              that.shoplistData.push(result.data.data[i].goods)
            }
          },
          error => {
            localStorage.removeItem('fromPosition')
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    }
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>