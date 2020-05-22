<template>
  <div id="mySecondKill">
    <x-header title="秒杀列表" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 
  
      <div id="killList_wrap"> 
        <div class="killList_contents" v-for="(item, index) in this.secondKillList" :key="index" @click="goDetailKill(item.goods.goodsid)">
            <div class="shopList_img">
                <img :src="getImgUrl(item.goods)" alt="">
            </div>
            <div class="killList_detail">
               <div class="killList_desc">{{item.goods.goodsname}}</div>
               <div class="killList_spans"><span>小米</span><span>已抢{{item.alreadyMiaoShaNumber}}/{{item.miaoShaCount}}件</span></div>               
               <box gap="10px" >
                <x-progress style="background:#ed393d;width:160px" :percent="(item.alreadyMiaoShaNumber - 0)/(item.miaoShaCount - 0) * 100" :show-cancel="false"></x-progress>
              </box>
               <div class="killList_prices">￥{{item.goods.shop_price}} <span id="sellPrice">￥{{item.goods.market_price}}</span><span id="goQiang">去抢购</span></div>
               <!-- <div class="killList_others"> 20条评价 &nbsp;98%好评</div> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, Swiper, SwiperItem, XHeader, XProgress, Box} from 'vux'
import ShopCell from '../../components/toolComponent/shopCell.vue'
import {getGoodsImg, myTools} from '../../components/utils/utils.js'

const list = () => ['红包', '购物券']
export default {
  components: {
    ShopCell,
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XProgress,
    Box
  },
  data () {
    return {
      list: [
      ],
      list2: list(),
      demo2: '商品',
      demoDisabled: 'A',
      index: 0,
      redPacketList: [],
      secondKillList: []
    }
  },
  created: function () {
    if (this.$route.params.secondKillList) {
      this.secondKillList = this.$route.params.secondKillList
    } else {
      this.get_second_kill_list()
    }
    this.$nextTick(function () {
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      this.$('#killList_wrap').css({
        height: windowHeight - headerHeight + 'px',
        position: 'relative',
        overflow: 'scroll'
      })
    })
  },
  methods: {
    isChaoshi () {

    },
    get_second_kill_list () {
      var that = this
      myTools().miaosha_list_fn(function (result) {
        that.secondKillList = []
        for (var i = 0; i < result.length; i++) {
          var item = result[i]
          var start = new Date(Date.parse(item.startTime))
          var stop = new Date(Date.parse(item.stopTime))
          if (myTools().getStatusByTimes(myTools().getServerDate(), start, stop) === '进行中') {
            that.secondKillList.push(item)
          }
        }
      })
    },
    // 秒杀列表
    secondKillReq () {
      var socket = ''
      if (socket === '') {
        // socket = new WebSocket('ws://' + 'www.dangsh' + '/echo_once/')
      }

      socket.onopen = function () {
        socket.send('你好 服务器  nihao fuwuqi')// 发送数据到服务端
      }
      socket.onmessage = function (e) {
      }
    },
    goDetailKill (goodsid) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: goodsid
        }
      })
    },
    getImgUrl (imgObj) {
      return getGoodsImg(imgObj)
    }
  }
}
</script>

<style lang="less" scoped>
  #killList_wrap{
      // margin: 0px 0.5rem;
      overflow: scroll;
  }
  #mySecondKill .killList_contents{
      display: flex;
      // width:100%;
      // margin-top:0.1rem; 
      // border-radius: 5px;
      padding: 6px;
      background: #ffffff;
      border-bottom: 1px solid #ebebeb
  }
  #mySecondKill .killList_img{
      width: 110px;
  }
  .killpList_img img{
      width: 100px;
      height: 100px;
  }
  #mySecondKill .killList_detail{
      flex: 1
  }
  #mySecondKill .killList_spans span{
      display: inline-block;
      background: #f4f4f4;
      margin: 1px;
      font-size: 8px;
      color: #666
  }
  #mySecondKill .killList_prices{
      font-size: 16px;
      color: #ed393d
  }
  // #mySecondKill .killList_prices span{
  //  display: inline-block;
  //  padding: 0px 0.5rem;
  //     background: #ed393d;
  //     margin: 1px;
  //     border-radius: 10px;
  //     font-size: 8px;
  //     color: #ffffff
  // }
  #mySecondKill .killList_desc{
      font-size: 14px;
      display: -webkit-box;  
    word-break: break-all;  
    text-overflow: ellipsis;  
    -webkit-box-orient: vertical;  
    -webkit-line-clamp: 1;
    overflow: hidden
  }
  #mySecondKill .killList_others{
      font-size: 10px;
      color: #666
  }
  #mySecondKill #sellPrice{
  text-decoration: line-through;
  color: #ccc
  }
  #mySecondKill #goQiang{
      display: inline-block;
  padding: 0px 0.5rem;
      background: #ed393d;
      margin: 1px;
      // border-radius: 10px;
      // font-size: 12px;
      color: #ffffff;
      float: right;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center
  }
  #mySecondKill .weui-progress__inner-bar {
      width: 0;
      height: 100px!important;
      background-color: #ed393d!important;
  }
  #mySecondKill .weui-progress__bar {
      background-color: #EBEBEB;
      height: 10px!important;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
  }
  .shopList_img img{
    width: 80%;
    height: 100%;
  }
</style>