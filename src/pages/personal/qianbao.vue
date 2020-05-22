<template>
  <div id="qianbao1">
    <x-header title="钱包"  @on-click-more="show = true"></x-header> 

        <div class="qb_myDiv">
            <div class="qb_yueDiv"> 账户余额（元） </div>
            <div class="qb_moneyDiv">{{userInfo ? userInfo.acountmoney : 0}}</div>
            <!--<div class="qb_moneyDiv">100</div>-->
        </div>

        <div class="qb_czDiv_box">
            <div class="qb_czDiv_1">
                请选择充值金额:（元）
            </div>

            <div class="qb_czDiv">
              <!-- v-model="demo5" -->
            <checker
            radio-required
            default-item-class="qb_czDiv-item"
            selected-item-class="qb_czDiv-item-selected"
            >
            <checker-item @click.native="selectMoneyFn()" v-for="i in [1, 2, 3 ,4 ,5]" :key="i" :value="i * 300">￥{{i*300}}</checker-item>
            </checker>
            </div>
        </div>

    <div v-transfer-dom>
      <popup v-model="show7" height="270px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
         <group>
          <cell title="微信" value="微信充值"></cell>
          <cell title="充值金额" :value='selectMoney'></cell>
         </group>
         <div style="padding:20px 15px;">
          <x-button @click.native="chongzhiFn()" type="primary">充值</x-button>
          <x-button @click.native="show7 = false">取消</x-button>
         </div>
        </div>
      </popup>
    </div>
  </div>
</template>



<script>
import {
  XHeader,
  TransferDom,
  Popup,
  Group,
  Cell,
  XButton,
  XSwitch,
  Toast,
  XAddress,
  Checker,
  CheckerItem
} from 'vux'
import {myTools} from '../../components/utils/utils.js'
import md5 from 'js-md5'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XHeader,
    Group,
    Cell,
    XSwitch,
    Toast,
    XAddress,
    XButton,
    Checker,
    CheckerItem
  },
  data () {
    return {
      userInfo: this.$route.params.userInfos,
      show7: false,
      selectMoney: 300
    }
  },
  created () {
    this.isHaveUerInfo()
  },
  methods: {
    selectMoneyFn (aaa) {
      this.$data.selectMoney = event.target.innerText.replace('￥', '') - 0.0
      this.$data.show7 = true
    },
    isHaveUerInfo () {
      if (this.$data.userInfo === undefined) {
        this.$data.userInfo = JSON.parse(localStorage.getItem('personalInfo'))
      } else {
        localStorage.setItem('personalInfo', JSON.stringify(this.$data.userInfo))
      }
    },
    wxZhiFuChengGongFn () {
      var that = this
      myTools().my_post('addUserAcountMoney', {
        wxid: that.$data.userInfo.wxid,
        acountMoney: this.$data.selectMoney
      }, function (result) {
        if (result.data.status === 'ok') {
          that.$data.userInfo.acountmoney = that.$data.userInfo.acountmoney + that.$data.selectMoney
          localStorage.setItem('personalInfo', JSON.stringify(this.$data.userInfo))
        }
        that.$vux.toast.text(result.data.message, 'bottom')
        that.$data.show7 = false
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    wxZhiFuFn (prepayId) {
      var that = this
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
            that.wxZhiFuChengGongFn()
          } else {
            that.$vux.toast.show({
              text: '支付失败'
            })
          }
        }
      )
    },
    chongzhiFn () {
      var that = this
      this.$vux.loading.show({
        text: 'loaing...'
      })
      myTools().my_post('xunichongzhi', {
        totalMoney: that.$data.selectMoney,
        wxid: that.$data.userInfo.wxid
      }, function (result) {
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.wxZhiFuFn(result.data.data.xml.prepay_id.$)
        } else {
          that.$vux.toast.text('订单失败', 'center')
        }
      }, function (error) {
        that.$vux.loading.hide()
        that.$vux.toast.text('订单失败', 'center')
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "~vux/src/styles/close.less";
.qb_czDiv-item {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
//   border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  margin-top: .6375rem;
  margin-bottom: .6375rem;
}
.qb_czDiv-item-selected {
  background: #ffffff url(../../assets/demo/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}

.popup0 {
  padding-bottom: 15px;
  height: 200px;
}
.popup1 {
  width: 100%;
  height: 100%;
}
.popup2 {
  padding-bottom: 15px;
  height: 400px;
}
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
}

.qb_myDiv{
    height: 10.75rem;
    background-color: #ffe26d;
    color: white;
}
.qb_yueDiv{
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
    padding-left: 1.5rem;
}
.qb_moneyDiv{
    padding-left: 2rem;
    font-size: 2rem;
}
.qb_czDiv_box{
    margin-top:1rem; 
}
.qb_czDiv{
    background: #ffffff;
    border-radius:5px;
    // height: 7rem; 
    margin:0rem 0.5rem;
    padding-left:0.5rem; 
}
.qb_czDiv_1{
    margin-left:0.5rem ;
    margin-bottom:0.5rem ;
}
</style>