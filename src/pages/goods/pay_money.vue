<template>
 <div class="payWraps">
     <x-header style="position:fixed;top:0px;width:100%;z-index:1000">订单支付</x-header>
    <!-- <div class="pay_price">
        <div class="pay_all">订单总额:  <span id="mons">￥978.00</span></div>
        <div class="pay_another">还需支付 <span class="price_">￥978.00</span></div>
    </div> -->
    <!-- <div class="pay_way">
        <div class="pay_tip">选择支付方式（建议微信支付）</div>
        <div class="pay_ways">
            <div><img src="static/cart/wx@2x.png" alt=""></div>
            <div><img src="static/cart/zfb@2x.png" alt=""></div>
        </div>
    </div> -->
    <div class="checkPayWays">
       <div class="aboutWx">
        <div class="infoItem">
          <div class="infoIcons"><img src="static/cart/wxicon.png" alt=""></div>
          <div class="infoTitles  marginDiv">支付方式</div>
          <div class="mustchoose" ><div class="">必选</div></div>
        </div>
      </div>
      <div class="infoItem">
        <div class="infoIcons">
          <check-icon :value.sync="wxpayment" type="plain"></check-icon>  
        </div>
        <div class="infoTitles marginDiv">微信支付</div>
      </div> 
    </div>

    <!--<orderListCell 
      :orderInfoList="orderInfo"
    >

    </orderListCell>-->
    <div class="confirmWrap" v-for="(item,index) in orderInfo.goodsInfo" :key="index">
      <shop-cell3 
        :goods="item.goods"
        :params='item.params'
        :buyNumber='item.buyNumber'
      ></shop-cell3>
    </div>
     
    
    <div class="payConfirm111"  >
        <div class="zhifuMoney">支付：￥{{orderInfo.totalMoney}}</div>
        <div class="cancel_order" v-tap="{methods:cancel_order_fn}">取消订单</div>
        <div class="goFukuan" v-tap="{methods:payConfirm_fn}">付款</div>
    </div>
      <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '60%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
          <span>
          <img src="static/cart/fudai.png" style="max-width:60%">            
          </span>
          <br>
          <br>
          <span class="vux-close" @click="fudaiShop(fuDaiGoodsid)"><img src="static/cart/i_ico_del.png" alt=""></span>
        </p>
      </x-dialog>
    </div>
 </div>
</template>

<script>
import {
  Scroller,
  Group,
  XInput,
  XHeader,
  Divider,
  Spinner,
  XButton,
  Cell,
  LoadMore,
  Toast,
  XDialog,
  CheckIcon,
  TransferDomDirective as TransferDom
} from 'vux'
import {homeUrl, myTools} from '../../components/utils/utils.js'
import shopCell3 from '../../components/toolComponent/shopCell3.vue'
import md5 from 'js-md5'
import axios from 'axios'
import qs from 'qs'
export default {
  directives: {
    TransferDom
  },
  components: {
    Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    XInput,
    LoadMore,
    XHeader,
    Toast,
    XDialog,
    CheckIcon,
    shopCell3
  },
  // this.$route.params.orderInfo
  data () {
    return {
      orderInfo: this.$route.params.orderInfo,
      show1: false,
      message: '',
      showFu: false,
      showDialogStyle: false,
      wxpayment: true,
      wxOpenId: localStorage.getItem('openid'),
      fuDaiGoodsid: '',
      totileMoney: 0
    }
  },
  methods: {
    // 取消订单
    cancel_order_fn () {
      var that = this
      var datas = qs.stringify({
        orderTableId: this.$data.orderInfo.orderId,
        status: 2
      })
      axios
      .post(homeUrl() + 'modify_order_status/', datas, { emulateJSON: false })
      .then(
        result => {
          that.$vux.toast.text(result.data.message, 'bottom')
          if (result.data.status === 'ok') {
            // 取消订单之后 准备跳转界面
            that.$router.push({name: 'my_order', params: {index: 6}})
          }
        },
        error => {
          this.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        }
      )
    },
    payConfirm_fn () {
      this.payMoneyFn()
    },
    payMoneyFn () {
      var that = this
      var prepayId = this.orderInfo.wxOrderId
      var aaa = Date.parse(new Date()) / 1000
      aaa = aaa + ''
      var suijiStr = aaa + 'abd'
      var stringA = 'appId=' + this.wxAppid + '&nonceStr=' + suijiStr + '&package=prepay_id=' + prepayId + '&signType=MD5&timeStamp=' + aaa
      stringA = stringA + '&key=' + this.shanghuKey
      var qianming = md5(stringA)
      qianming = qianming.toUpperCase()
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': this.wxAppid,
          'nonceStr': suijiStr,
          'package': 'prepay_id=' + prepayId,
          'paySign': qianming,
          'signType': 'MD5',
          'timeStamp': aaa
        },
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            that.shangjiaZhifuFn()
          } else {
            that.$vux.toast.show({
              text: '支付失败'
            })
          }
        }
      )
    },
    shangjiaZhifuFn () {
      var that = this
      this.$vux.loading.show({
        text: 'loading'
      })
      myTools().my_post('weixinPayFn', {
        orderid: that.orderInfo.orderId,
        wxid: myTools().get_local_wxid
      }, function (result) {
        that.$vux.toast.text(result.data.message, 'center')
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.userInfoChange(result.data.data)
          // that.fudai()
          that.$vux.toast.show({
            text: '支付成功',
            onHide () {
              // that.$router.push({name: 'my_order', params: {index: 0}})
            }
          })
          // that.$router.push({name: 'my_order', params: {index: 0}})
          that.$router.push({name: 'querenShouhuo', params: {title: '支付成功'}})
          // that.fudaiReq()
        }
      }, function () {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        that.$vux.loading.hide()
      })
    },
    userInfoChange (data) {
      var userInfo = myTools().get_local_userinfo
      if (userInfo.rebate !== undefined) {
        userInfo.rebate = data.rebeat_money - 0
      }
      if (userInfo.buyMoney !== undefined) {
        userInfo.buyMoney = data.total_money - 0
      }
      myTools().set_local_userinfo(userInfo)
    },
    // 福袋随机
    fudaiReq () {
      this.$http.get(homeUrl() + 'getOneRandomFudai/').then(
        result => {
          if (result.data.status === 'ok') {
            this.showDialogStyle = true
            this.fuDaiGoodsid = result.data.data.goodsInfo.goodsid
          }
        },
        error => {
          this.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        }
      )
    },
    // 福袋商品
    fudaiShop (id) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: id
        }
      })
    }
  },
  created () {
    var that = this
    if (this.orderInfo === '' || this.orderInfo === undefined) {
      this.orderInfo = JSON.parse(localStorage.getItem('pay_money_orderInfo'))
    } else {
      for (var i = 0; i < this.orderInfo.goodsInfo.length; i++) {
        delete this.orderInfo.goodsInfo[i].orderInfo
      }
      localStorage.setItem('pay_money_orderInfo', JSON.stringify(this.orderInfo))
    }
    this.$vux.loading.show({
      text: 'loading'
    })
    myTools().my_post('getDingdanByDingdanid', {
      orderId: that.orderInfo.orderId
    }, function (result) {
      if (result.data.status === 'ok') {
        if (result.data.data.length > 0) {
          if (result.data.data[0].status >= 1) {
            that.$vux.toast.text('已经支付过', 'center')
            setTimeout(function () {
              that.$router.push({name: 'my_order', params: {index: 0}})
            }, 1000)
          } else {
          }
        } else {
        }
      } else {
      }
      that.$vux.loading.hide()
    }, function (error) {
      that.$vux.loading.hide()
      console.log(error)
      that.$vux.toast.text('获取订单失败', 'bottom')
    })
  }
}
</script>

<style scoped>
  .pay_price {
    margin-top: 2.875rem;
    width: 100%;
    height: 9.4375rem;
    background: #ffffff;
    font-size: 0.9375rem;
  }
  .pay_all {
    height: 6.1875rem;
    line-height: 6.1875rem;
    border-bottom: 1px solid #ebebeb;
    text-align: center;
  }
  .pay_another {
    line-height: 3.125rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
  .price_ {
    float: right;
    color: #e60012;
  }
  .pay_way {
    width: 100%;
    height: 9.4375rem;
    margin-top: 0.625rem;
    background: #ffffff;
  }
  .pay_tip {
    border-bottom: 1px solid #ebebeb;
    height: 3.125rem;
    line-height: 3.125rem;
    color: #999999;
    font-size: 0.75rem;
    padding-left: 0.625rem;
  }
  .pay_ways {
    display: flex;
  }
  .pay_ways div {
    flex: 1;
    text-align: center;
    padding-top: 1.5625rem;
  }
  .pay_ways div img {
    width: 2.875rem;
    height: 2.875rem;
  }
  #mons {
    color: #333333;
    font-size: 1.25rem;
    font-weight: 500;
  }
  .pay_introduce {
    font-size: 0.8125rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    color: #666666;
    padding-top: 1.25rem;
  }
  .pay_introduce p:nth-child(1) {
    color: #e60012;
  }
  .pay_introduce p:nth-child(2) {
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
  }
  .payConfirm111 {
    width: 100%;
    height: 2.875rem;
    background: #ffffff;
    /* color: #999999; */
    font-size: 0.9375rem;
    position: fixed;
    bottom: 0;
    line-height: 2.875rem;
    text-align: center;
    display: flex
  }
  .fudai {
    position: absolute;
    width: 100%;
    top: 20%;
    left: 22%;
  }
  .fudai img {
    width: 60%;
    height: 30%;
  }
  .fudai_none {
    /* display:absolute;
      left:10%;
      color:red */
  }
  /* .dialog-demo { */
  .payWraps.dialog-demo .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .payWraps.dialog-demo .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .payWraps .dialog-demo .img-box {
    height: 350px;
    overflow: hidden;
  }
  .payWraps .dialog-demo .img-box img {
    height: 200px;
    width: 200px;
  }
  .payWraps .dialog-demo .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .infoItem {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ececec;
  }
  .infoIcons {
    width: 30px;
    padding-right: 8px;
    /* padding-left: 10px; */
    text-align: center;
    padding-top: 10px;
  }
  .infoIcons img {
    width: 40px;
    /* height: 40px; */
  }
  .mustchoose {
    width: 40px;
    height: 20px;
    background: #ff3b3b;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    margin-top: 15px;
    font-size: 12px
  }
  .infoItem {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ececec;
  }
  .infoTitles {
    line-height: 50px;
    flex: 1;
  }
  .marginDiv {
    margin-left: 1rem;
  }
  .checkPayWays{
    background: #ffffff;
    /* margin-top: 10px; */
    margin-top: 2.875rem;
    padding: 6px;
    
  }
  .zhifuMoney{
    flex: 1;
    text-align: left;
    padding-left: 10px;
    color: #e60012
  }
  .goFukuan{
    width: 90px;
    height: 46px;
    background: rgba(1 , 1 , 1 , 0);
    color: green;
    line-height: 46px;
    border-radius: 4px;
    border: 1px solid green;
    box-sizing: border-box;
    margin: 0 5px;

  }

  .cancel_order{
    width: 90px;
    height: 46px;
    background: rgba(1 , 1 , 1 , 0);
    color: red;
    line-height: 46px;
    margin: 0 5px;
    border-radius: 4px;
    border: 1px solid red;
    box-sizing: border-box;
  }

</style>
