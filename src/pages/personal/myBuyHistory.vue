<template>
  <div>
  <x-header title="我的消费记录">
    <span v-tap="{methods: backFn}" slot="right" type="navicon" size="35">我的</span>
  </x-header>
    <div id="shareList_wrap11" v-if="shareList.length > 0"> 
      <div class="shareList_contents" v-for="(item,index) in shareList" :key="index" >
          <div class="shareList_img" @click="shopListDetail(item.goodsid)">
            <img :src="item.src" alt="">
          </div>
          <div class="shareList_detail">
            <div class="shareList_desc">{{item.title}},{{item.desc}}</div>
            <div class="shareList_spans"><span>{{item.keyWorlds}}</span></div>
            <div class="shareList_prices">￥{{item.shop_price}} <span>{{item.rebate}}</span></div>
            <div class="shareList_others"> 20条评价 &nbsp;98%好评</div>
            <div class="deleData" @click="detele(item.buyid)">删除记录</div>
            <toast position="middle" v-model="messShow" type="text">{{message}}</toast>
            
          </div>
          </div>
      </div>
      <div v-else class="noList">
        亲,你还没有买过东西呢 ~
      </div>
      <div class="cart_wrap" v-else style="margin-top:46px">
        <x-button mini plain class="go_choose" @click.native="go_classify">马上去挑选</x-button>
      </div>

      

    </div>
</template>

<style>
  .noList{
      padding-top: 100px;
      text-align: center;
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
import {myTools, getGoodsImg} from '../../components/utils/utils.js'
export default {
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Divider,
    Toast,
    XButton
  },
  data () {
    return {
      shareList: [],
      messShow: false,
      message: '',
      user_info: myTools().get_local_userinfo
    }
  },
  methods: {
    go_classify () {
      this.$router.push({path: '/classify/classify', params: { name: '张三' }})
    },
    backFn () {
      this.$router.push({name: 'userInfo'})
    },
    buyHistory () {
      var that = this
      myTools().my_post('buyhistorySelect', {
        wxid: that.user_info.wxid
      }, function (result) {
        that.$vux.loading.hide()
        var searchArr = []
        if (result.data.status === 'ok') {
          that.buyList = result.data.data
          var shareLists = result.data.data
          for (var i = 0; i < shareLists.length; i++) {
            var searchObj = {}
            searchObj.src = getGoodsImg(shareLists[i].goods)
            searchObj.title = shareLists[i].goods.goodsname
            searchObj.desc = shareLists[i].goods.standard
            searchObj.goodsid = shareLists[i].goods.goodsid
            searchObj.shop_price = shareLists[i].goods.shop_price
            searchObj.market_price = shareLists[i].goods.market_price
            searchObj.rebate = '返利￥' + shareLists[i].goods.rebate + '元'
            searchObj.kucun = shareLists[i].goods.counts
            searchObj.sellCount = shareLists[i].goods.sellcount
            searchObj.buyid = shareLists[i].buyid
            searchArr.push(searchObj)
          }
          that.shareList = searchArr
        }
      })
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
    // 取消收藏
    detele (buyId) {
      var that = this
      myTools().my_post('buyhistoryDelete', {
        buyid: buyId
      }, function (result) {
        if (result.data.status === 'ok') {
          that.messShow = true
          that.message = '删除记录'
          that.buyHistory()
        }
      })
    },
    // 删除分享记录
    deleData (buyid) {
    }
  },
  mounted () {
    // 视频滚动区域高度
    var windowHeight = this.$(window).height()
    var headerHeight = this.$('.vux-header').outerHeight()
    this.$('#shareList_wrap11').height(windowHeight - headerHeight)
    this.$('#shareList_wrap11').css({
      'overflow': 'scroll'
    })
  },
  created () {
    this.$vux.loading.show({
      text: 'loading'
    })
    this.buyHistory()
    this.$nextTick(function () {
    })
  },
  deactivated: function () {
    // this.$destroy()
  }
}
</script>