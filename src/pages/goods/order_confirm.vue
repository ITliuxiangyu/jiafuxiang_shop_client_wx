<template>
<div>
     <x-header style='position:fixed;top:0px;width:100%;z-index:1000;background:;'>确认订单</x-header>
    
    <div class="wraps_">
       
        <div class="user_address" v-if="ishasAddress" @click="address_list"> 
            <div class="position"><img src="static/bottom/dizhi@2x.png" alt=""></div>
            <div class="address_detail">
              <p>收货人：{{addressData.username}} <span>{{addressData.tel}}</span></p>
              <p> 收货地址：{{addressData.address}}</p>
            </div>
            <div class="more_list"><img class="" src="static/cart/yjt@2x.png" alt=""></div>                        
        </div>
         <div class="choose_address" v-else @click="address_list">
             <div>选择收货地址<img class="imgds" src="static/dizhi@2x/dizhi@2x.png" alt=""></div>
        </div>
    </div>
     <div class="orderClass" >
         <div class="confirmWrap" v-for="(item,index) in comfirGoodsInfo" :key="index">
            <div class="shopsName">{{item.shopname}}</div>
            <shop-cell3 
              :goods="item.goods.goods"
              :params='jsonParamsToStr(item.params)'
              :buyNumber='item.number'
            ></shop-cell3>
         </div>
          </div>
         <!-- </keep-alive> -->
      
          <!-- 订单明细 -->
          <div class="informations">
          <div class="">
               <group>
                <cell :title="('使用优惠券')" value="优惠券" is-link @click.native="youhuiPopup=true"></cell>
                </group>
                  <div v-transfer-dom>
                <popup v-model="youhuiPopup" class="checker-popup" height="60%">
                        <ticket-page></ticket-page>
                </popup>
                </div>
          </div>
              <!-- 选择配送方式 -->
              <div class="">
                <group>
                  <cell :title="('选择配送方式')" :value="sendType" is-link @click.native="sendTypePopup=true"></cell>
                </group>
                <div v-transfer-dom>
                  <popup v-model="sendTypePopup" class="checker-popup">
                    <div style="padding:10px 10px 40px 10px;">
                      <p style="padding: 5px 5px 5px 2px;color:#888;">配送方式</p>
                      <checker
                      v-model="sendType"
                      default-item-class="demo4-item"
                      selected-item-class="demo4-item-selected"
                      disabled-item-class="demo4-item-disabled">
                          <checker-item @on-item-click="onItemClicks" :value="item.value" v-for="(item, index) in items1" :key="index"> {{item.value}} </checker-item>
                      </checker>
                    </div>
                  </popup>
                </div>
              <div>
          </div>
          <div>
          </div>
          <!-- 弹起 -->
        </div>
         
          <!-- 开发票 -->
         
           <div>
              <group>
                <cell :title="('开发票')" :value="demo4" is-link @click.native="showPopup=true"></cell>
                </group>
                <div v-transfer-dom>
                <popup v-model="showPopup" class="checker-popup" height="60%">
                    <div style="padding:10px 10px 40px 10px;">
                    <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
                    <checker
                    v-model="demo4"
                    default-item-class="demo4-item"
                    selected-item-class="demo4-item-selected"
                    disabled-item-class="demo4-item-disabled">
                        <checker-item @on-item-click="onItemClicktick" :value="item.value" v-for="(item, index) in commontype" :key="index"> {{item.value}} </checker-item>
                    </checker>
                    </div>
                </popup>
                </div>
            <div>
          </div>
          <div>
          </div>
        </div>
        <!-- 送货时间 -->
        <div>
              <group>
                <cell :title="('送货时间')" :value="demo5" is-link v-tap="{methods:demo5Popup_fn}"></cell>
                </group>
                <div v-transfer-dom>
                <popup v-model="demo5Popup" class="checker-popup" height="60%">
                    <div style="padding:10px 10px 40px 10px;">
                    <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
                    <checker
                    v-model="demo5"
                    default-item-class="demo4-item"
                    selected-item-class="demo4-item-selected"
                    disabled-item-class="demo4-item-disabled">
                        <checker-item @on-item-click="onItemClickdemo5" :value="item" v-for="(item, index) in commonList" :key="index"> {{item}} </checker-item>
                    </checker>
                    </div>
                </popup>
                </div>
            <div>
          </div>
          <div>
          </div>
        </div>
          
          <!-- 缺货处理 -->
           <div>
              <group>
                <cell :title="('缺货处理')" :value="demo10" is-link @click.native="demo10Popup=true"></cell>
                </group>
                <div v-transfer-dom>
                <popup v-model="demo10Popup" class="checker-popup" height="60%">
                    <div style="padding:10px 10px 40px 10px;">
                    <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
                    <checker
                    v-model="demo10"
                    default-item-class="demo4-item"
                    selected-item-class="demo4-item-selected"
                    disabled-item-class="demo4-item-disabled">
                        <checker-item @on-item-click="onItemClickdemo10" :value="item" v-for="(item, index) in commonLists" :key="index"> {{item}} </checker-item>
                    </checker>
                    </div>
                </popup>
                </div>
            <div>
          </div>
          <div>
          </div>
        </div>
          <div class="">
               <x-input v-model="liuyan" label-width="5em" title='订单备注' placeholder="买家留言（非必填）"></x-input>
          </div>
          <div class="">
               <x-input v-model="taitou" label-width="5em" title='发票抬头' placeholder="填写抬头信息"></x-input>
          </div>
          <div style="background:#F4F8FB;height:10px"></div>
           
            <div style="background:#F4F8FB;height:10px"></div>
            
            <div class="payInfos">
                <div class="paygetbug">首单免运费,满20包邮</div>
                <div>
                    <p style="color:red;">{{total_result()}}</p>
                </div>
            </div>
            <div style="background:#F4F8FB;height:10px"></div>
               
          </div>
     
    
      <!-- 确认订单 -->
      <div class="confirms">
          <div v-show="isjifen == false || isjifen == undefined" v-tap="{methods:pay_money}">提交订单</div>
          <div v-show="isjifen == true" v-tap="{methods:pay_money}">{{user_jifen_fn()}}</div>
      </div>
     
</div>

</template>

<script>
import {
  Scroller,
  Checklist,
  CheckIcon,
  XSwitch,
  Checker,
  CheckerItem,
  Group,
  XInput,
  XHeader,
  Divider,
  Popup,
  Spinner,
  XButton,
  Cell,
  LoadMore,
  XDialog,
  TransferDomDirective as TransferDom
} from 'vux'
import shopCell3 from '../../components/toolComponent/shopCell3.vue'
import ticketPage from '../../components/toolComponent/ticketPage'
import {homeUrl, myTools, jsonParamsToStr} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'order_confirm',
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
    Checker,
    CheckerItem,
    XSwitch,
    CheckIcon,
    Checklist,
    XDialog,
    shopCell3,
    Popup,
    ticketPage
  },
  data () {
    return {
      isjifen: this.$route.params.isjifen,
      checkers: [{ key: '1', value: '门店自取' }],
      values1: [{ key: '1', value: '明细' }],
      values2: [{ key: '1', value: '普通发票' }],
      sendType: '申通',
      taitou: '',
      liuyan: '',
      items1: [
        {
          key: '1',
          value: '中通'
        },
        {
          key: '2',
          value: '申通'
        },
        {
          key: '3',
          value: '韵达'
        },
        {
          key: '4',
          value: '百世快递'
        },
        {
          key: '5',
          value: '菜鸟驿站'
        },
        {
          key: '6',
          value: '邮政'
        },
        {
          key: '7',
          value: '圆通'
        }
      ],
      stringValue: '0',
      demo2: false,
      wxpayment: true,
      commonList: ['仅工作日送货', '仅周末送货', '工作日/周末/假日均可'],
      radioValue: ['仅工作日送货'],
      isShow: false,
      commonLists: ['等待所有商品备齐后再发', '取消订单', '与店主协商'],
      radioValues: ['等待所有商品备齐后再发'],
      lostgoodsShow: false,
      demo5: '工作日/周末/假日均可',
      demo10: '等待所有商品备齐后再发',
      demo10Popup: false,
      timeshow: false,
      showPopup: false,
      sendTypePopup: false,
      demo5Popup: false,
      ishasAddress: true,
      addressList: [],
      demo4: '无',
      youhui: '无',
      commontype: [
        {
          key: '1',
          value: '普通发票'
        },
        {
          key: '2',
          value: '增值税发票'
        }
      ],
      commoncontent: [
        {
          key: '1',
          value: '明细'
        },
        {
          key: '2',
          value: '办公用品'
        },
        {
          key: '3',
          value: '电脑配件'
        },
        {
          key: '4',
          value: '耗材'
        },
        {
          key: '5',
          value: '其他'
        }
      ],
      show: false,
      list: [],
      comfirGoodsInfo: this.$route.params.comfirGoodsInfo,
      addressInfo: [],
      goodsMonery: this.$route.params.goodsMonery,
      youhuiPopup: false,
      addressData: '',
      sendsTimes: '',
      lostshops: '',
      wxOpenId: localStorage.getItem('openid')
    }
  },
  methods: {
    // json对象转化成字符串的方法
    jsonParamsToStr (jsonObj) {
      return jsonParamsToStr(jsonObj)
    },
    // 获取用户积分的方法
    user_jifen_fn () {
      var userInfo = myTools().get_local_userinfo
      var userJifen = userInfo.jifen
      return '您有' + userJifen + '积分  兑换?'
    },
    total_result () {
      var totalJifen = 0
      if (this.isjifen === false || this.isjifen === undefined) {
        for (var i = 0; i < this.comfirGoodsInfo.length; i++) {
          totalJifen = totalJifen + parseFloat(this.comfirGoodsInfo[i].goodsprice) * this.comfirGoodsInfo[i].number
        }
        return '总金额: ￥' + totalJifen
      } else {
        for (var j = 0; j < this.comfirGoodsInfo.length; j++) {
          totalJifen = totalJifen + parseFloat(this.comfirGoodsInfo[j].jifenprice) * this.comfirGoodsInfo[j].number
        }
        return '总积分: ' + totalJifen
      }
    },
    canshu_fn (paramsArr) {
      if (typeof paramsArr === 'string') {
        paramsArr = JSON.parse(paramsArr)
      }
      var resultStr = ''
      for (var i = 0; i < paramsArr.length; i++) {
        resultStr = resultStr + paramsArr[i].name + ':' + paramsArr[i].value + ' '
      }
      return resultStr
    },
    demo5Popup_fn () {
      this.$data.demo5Popup = true
    },
    address_list () {
      this.$router.push({ name: 'goods_address', params: {} })
    },
    onItemClickdemo5 (value, disabled) {
      if (!this.disabled) {
        this.demo5Popup = false
      }
    },
    onItemClickdemo10 (value, disabled) {
      if (!this.disabled) {
        this.demo10Popup = false
      }
    },
    onItemClicktick (value, disabled) {
      if (!this.disabled) {
        this.showPopup = false
      }
    },
    onItemClicks (value, disabled) {
      if (!this.disabled) {
        this.sendTypePopup = false
      }
    },
    onItemClick () {

    },
    onClick (currentValue) {
      if (currentValue === 1) {
        this.show = true
      } else if (currentValue === 0) {
        this.show = false
      }
    },
    // 送货时间
    sendTimes (val, label) {
      this.sendsTimes = val
    },
    showTime: function () {
      this.timeshow = !this.timeshow
    },
    // lostGoods: function () {
    //   this.lostgoodsShow = !this.lostgoodsShow
    // },
    openPay: function () {
      this.$router.push({ name: 'myInvoice', params: {} })
    },
    isOk () {
      this.show = false
    },
    goodsInfo () {
      var datasList = this.comfirGoodsInfo
      var listdata = []
      for (var i = 0; i < datasList.length; i++) {
        var obj = {}
        obj.src = 'static/cart/redpack.png'
        obj.title = '<p><span>' + datasList[i].title + '</span><span style="float:right;color:#cc0010;font-size:18px">￥' + datasList[i].money + '</span></p>'
        obj.desc = '<p style="line-height:20px">' + datasList[i].description + '</p><p>' + datasList[i].starttime + '-' + datasList[i].endtime + '</p>'
        listdata.push(obj)
      }
      this.list = listdata
    },
     // 提交订单
    pay_money (params) {
      var that = this
      var userInfo = myTools().get_local_userinfo
      var totalJifen = 0
      if (this.isjifen === true) {
        for (var i = 0; i < this.comfirGoodsInfo.length; i++) {
          totalJifen = totalJifen + parseFloat(this.comfirGoodsInfo[i].jifenprice) * this.comfirGoodsInfo[i].number
        }
        if (userInfo.jifen < totalJifen) {
          that.$vux.toast.text('积分不够 , 兑换失败....', 'center')
          return
        }
        this.zhifu('积分兑换', totalJifen)
      } else {
        this.zhifu('微信支付', 0)
      }
    },
    // 消费用户积分
    useUerJifen (totalJifen) {
      var that = this
      var userInfo = myTools().get_local_userinfo
      myTools().my_post('useUserNumber', {
        'wxid': myTools().get_local_wxid,
        'optionNumber': '["' + totalJifen + '"]',
        'optionName': '["jifen"]'
      },
      function (result) {
        if (result.data.status === 'ok') {
          userInfo.jifen = userInfo.jifen - totalJifen
          myTools().set_local_userinfo(userInfo)
          that.$router.push({name: 'my_order', params: {index: 0}})
        } else {
          that.$vux.toast.text('兑换失败....', 'bottom')
        }
      })
    },
    // 支付方法
    zhifu (zhifuMethod, totalJifen) {
      var that = this
      var goodsOrder = []
      for (var i in this.comfirGoodsInfo) {
        var goodsEachOrder = {}
        goodsEachOrder.goodsId = this.comfirGoodsInfo[i].goodsid
        goodsEachOrder.goodsNum = this.comfirGoodsInfo[i].number
        goodsEachOrder.goodsMonery = this.goodsMonery
        goodsEachOrder.goodsParams = this.canshu_fn(this.comfirGoodsInfo[i].params)
        goodsEachOrder.freightPrice = this.comfirGoodsInfo[i].freightPrice
        goodsEachOrder.freightRiskPrice = this.comfirGoodsInfo[i].freightRiskPrice
        goodsOrder.push(goodsEachOrder)
      }
      var status = 0
      if (zhifuMethod === '积分兑换') {
        status = 1
      }
      if (this.addressData.addid === undefined) {
        alert('请选择收货地址')
        return
      }
      this.$vux.loading.show({
        text: 'loaing...'
      })
      myTools().my_post('ordertableManageJsonAdd', {
        wxid: JSON.parse(localStorage.getItem('personalInfo')).wxid,
        status: status,
        goodsIdArr: JSON.stringify(goodsOrder),
        transportMethod: zhifuMethod,
        invoiceType: this.demo4,
        invoiceContent: '',
        deliveryTime: this.demo5,
        noGoodsMethod: this.demo10,
        sendCompany: this.$data.sendType,
        addressId: this.addressData.addid,
        taidou: this.$data.taidou,
        liuyan: this.$data.liuyan
      }, function (result) {
        that.$vux.loading.hide()
        // alert("提交订单结果")
        // alert(JSON.stringify(result))
        if (result.data.status === 'ok') {
          if (zhifuMethod === '微信支付') {
            that.$router.push({ name: 'pay_money', params: {orderInfo: result.data.data} })
          }
          if (zhifuMethod === '积分兑换') {
            that.useUerJifen(totalJifen)
          }
        }
      }, function (error) {
        alert('提交订单失败')
        alert(JSON.stringify(error))
        that.$vux.loading.hide()
      })
    },
    isHasAddress_fn () {
      var that = this
      var datas = qs.stringify({
        wxid: JSON.parse(localStorage.getItem('personalInfo')).wxid
      })
      axios.post(homeUrl() + 'findAddress/', datas, { emulateJSON: true }).then(
        result => {
          if (result.status === 200) {
            if (result.data.length <= 0) {
              that.$data.ishasAddress = false
            } else {
              that.$data.addressList = result.data
              for (var i = 0; i < result.data.length; i++) {
                that.$data.ishasAddress = true
                if (result.data[i].flag === 'true') {
                  that.$data.addressData = result.data[i]
                  break
                }
              }
            }
          }
        }
      )
    }
  },
  // activated created
  created () {
    this.isHasAddress_fn()
    this.$data.comfirGoodsInfo = this.$route.params.comfirGoodsInfo
    this.$data.goodsMonery = this.$route.params.goodsMonery
    if (this.$data.comfirGoodsInfo === undefined || this.$data.comfirGoodsInfo === '') {
      this.$data.comfirGoodsInfo = JSON.parse(localStorage.getItem('comfirGoodsInfo'))
      this.$data.goodsMonery = localStorage.getItem('goodsMonery')
    } else {
      localStorage.setItem('comfirGoodsInfo', JSON.stringify(this.$data.comfirGoodsInfo))
      localStorage.setItem('goodsMonery', this.$data.goodsMonery)
    }
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>
<style>
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .shopsName {
    height: 2.8125rem;
    line-height: 2.8125rem;
    background: #ffffff;
    border-bottom: 1px solid #ebebeb;
    padding-left: 0.625rem;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
  .choose_address {
    margin-top: 2.875rem;
    background: #ffffff;
    height: 3.75rem;
    margin-bottom: 0.625rem;
    text-align: center;
    line-height: 3.75rem;
    position: relative;
    font-size: 0.875rem;
  }
  .wraps_ {
    width: 100%;
    background: #ffffff;
  }

  .user_address {
    margin-top: 3.75rem;
    display: flex;
    margin-bottom: 0.625rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    font-size: 0.875rem;
  }
  .position {
    width: 3.125rem;
    padding-top: 1.25rem;
  }
  .position img {
    width: 1.875rem;
    /*height: 1.875rem;*/
  }
  .more_list {
    width: 3.125rem;
    text-align: right;
    padding-top: 1.35rem;
  }
  .more_list img {
    width: 0.9375rem;
    height: 1.25rem;
  }
  .orderClass {
    width: 100%;
    background: #ffffff;
    /* margin-bottom: 70px */
  }
  .order_info {
    display: flex;
    height: 5.625rem;
    border-bottom: 1px solid #ebebeb;
    padding-top: 0.625rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    color: #333333;
    font-size: 14px;
  }
  .order_img img {
    width: 6.625rem;
    height: 4.75rem;
    padding-right: 0.3125rem;
  }
  .imgds {
    width: 0.9375rem;
    height: 1.25rem;
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
  }
  .order_cost {
    width: 5rem;
    text-align: right;
  }
  .order_text {
    flex: 1;
  }
  .color {
    color: #e60012;
    padding-right: 0.5rem;
  }
  .order_text p:nth-child(2) {
    font-size: 0.75rem;
    color: #666666;
  }
  .order_cost p:nth-child(1) {
    font-size: 0.875rem;
  }
  .order_cost p:nth-child(2) {
    font-size: 0.75rem;
    color: #666666;
  }
  .order_cost p:nth-child(3) {
    font-size: 0.75rem;
    color: #666666;
  }
  .shop_total {
    height: 3.0625rem;
    line-height: 2.8125rem;
    font-size: 0.875rem;
    color: #333333;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
  .marginDiv {
    margin-left: 1rem;
  }
  .shop_total span:nth-child(2) {
    float: right;
  }
  .confirms {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: #ffffff;
    border-top: 1px solid #ebebeb;
  }
  .confirms div {
    width: 100%;
    height: 2.875rem;
    background: #e60012;
    color: #ffffff;
    font-size: 0.9375rem;
    line-height: 2.875rem;
  }
  .change {
    color: #e60012;
  }
  .infoItem {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ececec;
  }
  .infoItemexpress {
    display: flex;
    height: 50px;
    /* border-bottom: 1px solid #ececec; */
  }
  .infoIcons {
    width: 30px;
    padding-right: 8px;
    /* padding-left: 10px; */
    text-align: center;
    padding-top: 10px;
  }
  .informations {
    background: #ffffff;
    margin-bottom: 100px;
  }
  .infoIcon {
    width: 60px;
    padding-right: 8px;
    /* padding-left: 10px; */
    text-align: center;
    /* padding-top: 10px */
  }
  .infoIcons img {
    width: 40px;
    /* height: 40px; */
  }
  .infoTitles {
    line-height: 50px;
    flex: 1;
  }
  .infosmore {
    flex: 1;
    text-align: right;
    line-height: 3.75rem;
    padding-right: 0.625rem;
  }
  .infosmore img {
    width: 0.9375rem;
    height: 1.25rem;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    margin: 0.3125rem 0.625rem;
  }
  .demo1-item {
    width: 4.875rem;
    height: 1.875rem;
  }
  .demo1-item-selected {
    border: 1px solid #e60012;
  }
  .faType {
    display: flex;
    font-size: 12px;
  }
  .sendType p {
    color: #666666;
    font-size: 12px;
    padding-left: 10px;
    line-height: 20px;
  }
  .isOk {
    width: 70px;
    height: 40px;
    text-align: center;
    background: #e60012;
    color: #ffffff;
    line-height: 40px;
    margin-bottom: 20px;
    margin-left: 40%;
    margin-top: 20px;
  }
  .faTypea {
    margin-top: 20px;
  }
  .demo4-item {
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    padding: 5px 10px;
    margin-right: 10px;
    line-height: 18px;
    border-radius: 15px;
    margin-top: 8px;
  }
  .demo4-item-selected {
    background-color: #ff3b3b;
    color: #fff;
  }
  .payInfos {
    color: #666;
    text-align: right;
    padding: 0.625rem;
  }
  .payInfos span {
    font-size: 1.25rem;
    color: #ff3b3b;
  }
  .paygetbug {
    height: 2.5rem;
    border-bottom: 1px solid #ebebeb;
  }
  .aboutWx {
    padding-left: 0.625rem;
  }
  .mustchoose {
    width: 60px;
    height: 30px;
    background: #ff3b3b;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
  }
  .goods_name{
    color: red;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .goods_params{
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    padding-top: 0.6em;
  }
  /* .confirmWrap{
      margin-bottom: .625rem
  } */
</style>










