<template>
  <div>
    <x-header title="订单详情" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 

    <div class="order_detail_wrap">

      <div class="tu_wrap">
        <div>
          <p>{{tou_first_text}}</p>
          <p>{{tou_second_text}}</p>
        </div>
        <div>
          <img src="static/home/kuaidiche.png" alt="">
        </div>
      </div>

      <my-cell-one 
        left_img="static/home/kuaidiyunshu.png"
        right_img="static/home/xiangyou.png"
        title1="快件有洛阳分拨发往郑州分拨中心"
        title2="2018-07-20 03:22:15"
        v-tap = "{methods: wuliuFn}"
      >
      </my-cell-one>

      <my-cell-two
        left_img="static/home/dizhi.png"
        :right_text="orderInfo.userAddress.tel"
        :title1="getUserName()"
        :title2="getUserAddress()"
      >
      </my-cell-two>

      <orderListCell 
        :orderInfoList="orderListInfos"
        isHaveJiao='false'
        isHaveAnniu='false'
      >
      </orderListCell>

      <jiao1
        v-on:wuliuE = "wuliuFn"
        v-on:querenE = "querenFn"
        :isHaveQueren = "isHaveQuerenFn()"
      ></jiao1>
      <!--<yunfeixian-card
        :totalMoney = "orderInfo.totalMoney"
        :totalFreightMoney = "orderInfo.totalFreightMoney"
        :freightRiskPrice = "orderInfo.freightRiskPrice"
      >
      </yunfeixian-card>-->
      <yunfeixian-card
        :orderInfo = "orderInfo"
      >
      </yunfeixian-card>
      <!--:fahuoTime = "orderListInfos[0].fahuoTime"-->
      <ding-dan-bian-hao-card
        :orderId = "orderInfo.orderId"
        :wxOrderId = "orderInfo.wxOrderId"
        :createTime = "orderInfo.createTime"
        :payTime = "orderInfo.payTime"
        fahuoTime = "发货时间"
      >
      </ding-dan-bian-hao-card>

    </div>
  </div>
</template>



<script>
import {
  XHeader
} from 'vux'
import myCellOne from '../../components/toolComponent/myCellOne.vue'
import myCellTwo from '../../components/toolComponent/myCellTwo.vue'
import orderListCell from '../../components/toolComponent/orderListCell.vue'
import jiao1 from '../../components/toolComponent/jiao1.vue'
import yunfeixianCard from '../../components/toolComponent/yunfeixianCard.vue'
import dingDanBianHaoCard from '../../components/toolComponent/dingDanBianHaoCard.vue'
import {myTools} from '../../components/utils/utils.js'
export default {
  components: {
    XHeader,
    myCellOne,
    myCellTwo,
    orderListCell,
    jiao1,
    yunfeixianCard,
    dingDanBianHaoCard
  },
  // orderListInfos: [this.$route.params.order]
  data () {
    return {
      tou_first_text: '',
      tou_second_text: '',
      orderListInfos: this.$route.params.order.goodsInfo,
      orderInfo: this.$route.params.order
    }
  },
  methods: {
    go_to_pay (orderInfo) {
      this.$router.push({name: 'pay_money', params: {orderInfo: orderInfo}})
    },
    isHaveQuerenFn () {
      if (this.orderListInfos[0].status === '待收货') {
        return true
      } else {
        return false
      }
    },
    // 确认收货
    querenFn (item) {
      var that = this
      that.$vux.loading.show({
        text: 'loading...'
      })
      myTools().my_post('querenshouhuoApi', {
        goodsid: item.goods.goods.goodsid,
        orderid: item.order.orderId
      }, function (result) {
        that.$vux.loading.hide()
        that.$vux.toast.text(result.data.message, 'center')
        if (result.data.status === 'ok') {
          that.$router.push({name: 'querenShouhuo', params: {item: item}})
        }
      }, function () {
        that.$vux.loading.hide()
        that.$vux.toast.text('网络请求失败....', 'bottom')
      })
    },
    wuliuFn () {
      this.$router.push({name: 'logisticsQuery', params: {orderInfo: this.orderListInfos[0]}})
    },
    getOrderStatus () {
      if (this.orderListInfos[0].status === 0) {
        this.tou_first_text = '等待买家付款'
        this.tou_second_text = '请您付款'
      }
      if (this.orderListInfos[0].status === 1) {
        if (this.orderListInfos[0].goodsInfo[0].status === 1) {
          this.tou_first_text = '卖家还未发货'
          this.tou_second_text = '速速配货中....'
        }
        if (this.orderListInfos[0].goodsInfo[0].status === 2) {
          this.tou_first_text = '卖家已发货'
          this.tou_second_text = '还剩12天10小时自动确认'
        }
        if (this.orderListInfos[0].goodsInfo[0].status === 3 || this.orderListInfos[0].goodsInfo[0].status === 4) {
          this.tou_first_text = '交易完成'
          this.tou_second_text = '^_^'
        }
      }
      if (this.orderListInfos[0].status === 2) {
        this.tou_first_text = '订单已取消'
        this.tou_second_text = '额 ....'
      }
      if (this.orderListInfos[0].status === 3) {
        this.tou_first_text = '交易完成'
        this.tou_second_text = '祝您购物愉快...'
      }
    },
    getUserName () {
      return '收货人: ' + this.orderInfo.userAddress.username
    },
    getUserAddress () {
      return '收货地址: ' + this.orderInfo.userAddress.address
    }
  },
  created () {
    var that = this
    if (this.$route.params.order === undefined) {
      this.orderListInfos = JSON.parse(localStorage.getItem('orderListInfos'))
      this.orderInfo = JSON.parse(localStorage.getItem('orderInfo'))
    } else {
      localStorage.setItem('orderListInfos', JSON.stringify(this.orderListInfos))
      localStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
    }
    this.getOrderStatus()
    setTimeout(function () {
      var windowHeight = that.$(window).height()
      var headerHeight = that.$('.vux-header').outerHeight()
      var tabHeight = that.$('.jiao_wrap').outerHeight()
      var tempHeight = windowHeight - headerHeight - tabHeight + 'px'
      that.$('.order_detail_wrap').css({
        height: tempHeight,
        overflow: 'scroll'
      })
    }, 100)
  }
}
</script>

<style lang='less' scoped>
  .tu_wrap{
    height: 100px;
    background: linear-gradient(to right , #fd7c07 , #f83709);
    display: flex;
  }
  .tu_wrap div{
    flex: 1;
  }
  .tu_wrap>div:nth-child(1){
    color: #ffffce;
    text-align: center;
  }
  .tu_wrap>div:nth-child(1) p:nth-child(1){
    position: relative;
    top: 25%;
    transform: translate(0, -25%);
  }
  .tu_wrap>div:nth-child(1) p:nth-child(2){
    position: relative;
    top: 25%;
    transform: translate(0, -25%);
  }
  .tu_wrap>div:nth-child(2){
    text-align: center;
  }
  .tu_wrap>div:nth-child(2) img{
    width: 100px;
  }
</style>