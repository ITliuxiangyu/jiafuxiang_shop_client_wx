<template>
  <div id="myFocusPage">
    <x-header title="红包" :right-options="{showMore: true}" @on-click-more="show = true"></x-header> 
    <!--<tab v-model="index" :line-width=2 active-color='#fc378c' prevent-default @on-before-index-change="switchTabItem">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"  :key="index">{{item}}</tab-item>
    </tab>-->
    <swiper id="mySwiper" v-model="index" :show-dots="false" ref="mySwiper">
      <shop-cell :list="list"></shop-cell>
    </swiper>
  </div>
</template>



<script>
import {Tab, TabItem, Swiper, SwiperItem, XHeader} from 'vux'
import ShopCell from '../../components/toolComponent/shopCell.vue'
import {homeUrl, myTools} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'

export default {
  components: {
    ShopCell,
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      list: [],
      list2: ['红包', '购物券'],
      demo2: '商品',
      demoDisabled: 'A',
      index: 0,
      redPacketList: [],
      youhuiList: [],
      user_info: myTools().get_local_userinfo
    }
  },
  // activated
  created: function () {
    this.$nextTick(function () {
      this.$refs.mySwiper.xheight = '300px'
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      var tabHeight = this.$('.vux-tab').outerHeight()
      this.$refs.mySwiper.xheight =
        windowHeight - headerHeight - tabHeight + 'px'
      this.$('.vux-swiper').css({ overflow: 'scroll' })
    })

    this.redPackReq()
  },
  methods: {
    switchTabItem (index) {
      this.$vux.loading.show({
        text: 'loading'
      })
      var that = this
      setTimeout(() => {
        that.$vux.loading.hide()
        that.$data.index = index
        if (index === 0) {
          that.redPackReq()
        }
        if (index === 1) {
          that.$data.list = that.youhuiList
        }
        that.$('.vux-swiper').scrollTop(0)
      }, 500)
    },
    // 红包列表
    redPackReq () {
      var that = this
      var datas = qs.stringify({
        wxid: that.user_info.wxid
      })
      axios
        .post(homeUrl() + 'redpackApi/', datas, {emulateJSON: true})
        .then(
          result => {
            if (result.data.status === 'ok') {
              var listdata = []
              var datasList = result.data.data
              for (var i = 0; i < datasList.length; i++) {
                var obj = {}
                obj.src = 'static/cart/redpack.png'
                obj.title = '<p><span>' + datasList[i].title + '</span><span style="float:right;color:#cc0010;font-size:18px">￥' + datasList[i].money + '</span></p>'
                obj.desc = '<p style="line-height:20px">' + datasList[i].description + '</p><p>' + datasList[i].starttime + '-' + datasList[i].endtime + '</p>'
                listdata.push(obj)
              }
              this.list = listdata
            }
          },
          error => {
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

<style lang="less" scoped>
  @import "~vux/src/styles/1px.less";
  @import "~vux/src/styles/center.less";

  #myFocusPage .vux-slider {
    overflow: unset;
  }

  #myFocusPage #mySwiper .vux-swiper {
    overflow: unset;
  }

  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
</style>