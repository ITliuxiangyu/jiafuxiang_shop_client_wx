<template>
  <div>
  <x-header title="我的分享" style="position:fixed;top:0px;z-index:1000;width:100%" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 

    <!-- <share-page :shareList="shareList"></share-page> -->
      <div id="shareList_wrap" v-if="hasRecord"> 
        <div class="shareList_contents" v-for="(item,index) in shareList" :key="index" >
            <div class="shareList_img" @click="shopListDetail(item.goodsid)">
                <img :src="item.src" alt="">
            </div>
            <div class="shareList_detail">
               <div class="shareList_desc">{{item.title}},{{item.desc}}</div>
               <div class="shareList_spans"><span>{{item.keyWorlds}}</span></div>
               <div class="shareList_prices">￥{{item.shop_price}} <span>{{item.rebate}}</span></div>
               <div class="shareList_others"> 20条评价 &nbsp;98%好评</div>
               <div class="deleData" @click="deleData(item.shareid)">取消分享</div>
            </div>
        </div>
        <toast position="middle" v-model="messShow" type="text">{{message}}</toast>
        
    </div>
     <div class="cart_wrap" v-else style="">
        <x-button mini plain class="go_choose" @click.native="go_classify">马上去分享</x-button>
      </div>
  </div>
</template>

<style>
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
      width: 110px;
  }
  .shareList_img img{
      width: 100px;
      height: 100px;
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

import {homeUrl, myTools} from '../../components/utils/utils.js'
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
    XButton
  },
  data () {
    return {
      myFavourite: [],
      messShow: false,
      message: '',
      shareList: [],
      user_info: myTools().get_local_userinfo,
      hasRecord: true
    }
  },
  methods: {
    // 分享列表
    requestShareList () {
      var datas = qs.stringify({
        wxid: this.user_info.wxid
      })
      axios
        .post(homeUrl() + 'findShare/', datas, {emulateJSON: true})
        .then(
          result => {
            if (result.data.status === 'ok') {
              var searchArr = []
              var shareLists = result.data.data
              if (shareLists.length === '0') {
                this.hasRecord = false
              } else {
                for (var i = 0; i < shareLists.length; i++) {
                  var searchObj = {}
                  searchObj.src = this.urlList(shareLists[i].goods.product_thumb_image)
                  searchObj.title = shareLists[i].goods.goodsname
                  searchObj.desc = shareLists[i].goods.standard
                  searchObj.goodsid = shareLists[i].goods.goodsid
                  searchObj.shop_price = shareLists[i].goods.shop_price
                  searchObj.market_price = shareLists[i].goods.market_price
                  searchObj.rebate = '返利￥' + shareLists[i].goods.rebate + '元'
                  searchObj.kucun = shareLists[i].goods.counts
                  searchObj.sellCount = shareLists[i].goods.sellcount
                  searchObj.shareid = shareLists[i].shareid
                  searchArr.push(searchObj)
                }
                this.shareList = searchArr
              }
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    },
    // 去详情
    shopListDetail (goodsid) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: goodsid
        }
      })
    },
    // 取消分享
    deleData (shareId) {
      var datas = qs.stringify({
        shareid: shareId
      })
      axios
        .post(homeUrl() + 'delShare/', datas, {emulateJSON: true})
        .then(
          result => {
            if (result.data.status === 'ok') {
              this.messShow = true
              this.message = '取消分享成功'
              this.requestShareList()
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    },
    // 图片
    urlList (imgObj) {
      if (imgObj !== null) {
        var srcUrl = homeUrl() + imgObj
        return srcUrl
      }
    },
    // 去分类
    go_classify () {
      this.$router.push({
        name: 'classify'
      })
    }
  },
  created () {
    this.requestShareList()
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>