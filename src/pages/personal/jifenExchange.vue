<template>
  <div>
  <!--<x-header title="积分商城" style="position:fixed;top:0px;z-index:1000;width:100%" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> -->
  <x-header style="position:fixed;top:0px;z-index:1000;width:100%">
    <span>积分商城</span>
    <x-icon @click="goBackBtn" slot="ios-arrow-left" type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
  </x-header>

    <!-- <share-page :shareList="shareList"></share-page> -->
      <div id="shareList_wrap" v-if="hasRecord"> 
        <div class="shareList_contents" v-for="(item,index) in shareList" :key="index" >
            <div class="shareList_img" @click="shopListDetail(item.goodsid)">
                <img :src="urlList(item)" alt="">
            </div>        
            <div class="shareList_detail">
               <div class="shareList_desc">{{item.goodsname}},{{item.standard}}</div>
               <div class="shareList_spans"><span>{{item.keyWorlds}}</span></div>
               <div class="shareList_prices">积分:{{item.jifenprice}} <span>返利￥{{item.rebate}}元</span></div>
               <div class="shareList_others"> 销量：{{item.sellcount}} &nbsp;库存：{{item.counts}}</div>
               <div class="deleData" @click="shopListDetail(item.goodsid)">去看看</div>
            </div>
        </div>
        <toast position="middle" v-model="messShow" type="text">{{message}}</toast>
        
    </div>
     <div class="cart_wrap" v-else style="">
        <x-button mini plain class="go_choose" @click.native="go_classify">马上去分享</x-button>
      </div>
  </div>
</template>

<style scoped>
  .deleData{
      font-size:0.8rem; 
    border: 1px solid red;
    margin-top:1.25rem;
    padding: .125rem .3125rem;
    color:  red;
    border-radius:.1875rem;
    position: absolute;
    z-index: 100
  }
  #shareList_wrap{
      margin: 50px 0.5rem;
  }
  .shareList_contents{
      display: flex;
      margin-top:0.1rem; 
      border-radius: 5px;
      padding: 6px;
      background: #ffffff
  }
  .shareList_img{
      /*width: 110px;*/
      width: 24%;
      height: 0;
      overflow: hidden;
      padding-bottom: 24%;
      padding-right: 10px;
  }
  .shareList_img img{
      /*width: 100px;
      height: 100px;*/
      width: 100%;
  }
  .shareList_detail{
      flex: 1;
      position: relative
  }
  .shareList_spans span{
      display: inline-block;
      background: #f4f4f4;
      margin: 1px;
      font-size: 8px;
      color: #666
  }
  .shareList_prices{
      font-size: 16px;
      color: #ed393d
  }
  .shareList_prices span{
      display: inline-block;
      padding: 0px 0.5rem;
      background: #ed393d;
      margin: 1px;
      border-radius: 10px;
      font-size: 8px;
      color: #ffffff
  }
  .shareList_desc{
      font-size: 14px;
      display: -webkit-box;  
    word-break: break-all;  
    text-overflow: ellipsis;  
    -webkit-box-orient: vertical;  
    -webkit-line-clamp: 2;
    overflow: hidden
  }
  .shareList_others{
      font-size: 10px;
      color: #666
  }
  .deleData{
      font-size:0.8rem; 
    border: 1px solid red;
    margin-top:1.25rem;
    padding: .125rem .3125rem;
    color:  red;
    border-radius:.1875rem;
    position: absolute;
    bottom: 20px;
    right: 0;
  }
  .cart_wrap {
    background: url(/static/cart/gwbg@2x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 43rem;
    position: relative;
  }
  .go_choose {
    position: absolute;
    top: 30rem;
    left: 10rem;
  }
</style>

<script>
import {XHeader, Flexbox, Toast, FlexboxItem, Divider, XButton} from 'vux'
import SharePage from '../../components/toolComponent/sharePage'
import shoplistPage from '../../components/toolComponent/shoplistPage.vue'
import {homeUrl, getGoodsImg} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Divider,
    Toast,
    SharePage,
    XButton,
    shoplistPage
  },
  data () {
    return {
      myFavourite: [],
      messShow: false,
      message: '',
      shareList: [],
      wxOpenId: localStorage.getItem('openid'),
      hasRecord: true
    }
  },
  methods: {
    goBackBtn () {
      window.history.go(-1)
    },
    // 积分列表
    requestJifenList () {
      var that = this
      var datas = qs.stringify({
        wxid: this.wxOpenId
      })
      axios
        .post(homeUrl() + 'jifenListJson/', datas, {emulateJSON: true})
        .then(
          result => {
            this.$vux.loading.hide()
            if (result.data.status === 'ok') {
              that.$data.shareList = result.data.data
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
            this.$vux.loading.hide()
          }
        )
    },
    // 去详情
    shopListDetail (goodsid) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: goodsid,
          isjifen: true
        }
      })
    },
    // 图片
    urlList (obj) {
      return getGoodsImg(obj)
    },
    // 去分类
    go_classify () {
      this.$router.push({
        name: 'classify'
      })
    }
  },
  created () {
    this.$vux.loading.show({
      text: 'loading'
    })
    this.requestJifenList()
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>