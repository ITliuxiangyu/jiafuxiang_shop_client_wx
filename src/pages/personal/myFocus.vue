<template>
  <div id="myFocusPage">
    <x-header title="我的关注" :right-options="{showMore: true}" @on-click-more="show = true"></x-header> 
    <tab v-model="index" :line-width=2 active-color='#fc378c' prevent-default @on-before-index-change="switchTabItem">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"  :key="index">{{item}}</tab-item>
    </tab>
    <swiper id="mySwiper" v-model="index" :show-dots="false" ref="mySwiper">
      <shop-cell :list="dataList"></shop-cell>
    </swiper>
  </div>
</template>



<script>
import {Tab, TabItem, Swiper, SwiperItem, XHeader} from 'vux'
import ShopCell from '../../components/toolComponent/shopCell.vue'

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
      dataList: [],
      list2: ['商品', '店铺'],
      demo2: '商品',
      index: 0,
      shangpinList: [],
      dianpuList: []
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.$refs.mySwiper.xheight = '300px'
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      var tabHeight = this.$('.vux-tab').outerHeight()
      this.$refs.mySwiper.xheight = windowHeight - headerHeight - tabHeight + 'px'
      this.$('.vux-swiper').css({'overflow': 'scroll'})
    })
  },
  methods: {
    switchTabItem (index) {
      var that = this
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        that.$vux.loading.hide()
        that.$data.index = index
        if (index === 0) {
          that.$data.dataList = []
        }
        if (index === 1) {
          that.$data.dataList = []
        }
        that.$('.vux-swiper').scrollTop(0)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  #myFocusPage .vux-slider{
    overflow: unset;
  }

  #myFocusPage #mySwiper .vux-swiper{
    overflow: unset;
  }

  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
</style>