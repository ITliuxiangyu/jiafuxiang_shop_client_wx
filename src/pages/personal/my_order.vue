<template>
  <div id="myFocusPage">
    <x-header title="全部订单" :right-options="{showMore: false}" @on-click-more="show = true">
      <span v-tap="{methods: backFn}" slot="right" type="navicon" size="35">我的</span>
    </x-header> 
    <tab v-model="index" :line-width=2 active-color='#fc378c' prevent-default>
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" v-tap="{methods:switchTabItem , cur_index:index}" :key="index">{{item}}</tab-item>
    </tab>
    <swiper id="mySwiper" v-model="index" :show-dots="false" ref="mySwiper">
      <orderListCell v-show="orderListInfos.length > 0" 
        :orderInfoList="orderListInfos"
        v-on:qufukuan="go_to_pay"
        v-on:chakanwuliu="wuliuFn"
        v-on:querenshouhuo="qurenshouhuo"
        v-on:qupingjia="pingjia_fn"
        v-on:quxiaodingdan="cancelOrder"
        v-on:shanchudingdan="deleteOrder"
      >
      </orderListCell>
      <div class="noList" v-show="orderListInfos.length <= 0">
        {{noListFn()}}
      </div>
    </swiper>
  </div>
</template>



<script>
import {
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  XHeader,
  Flexbox,
  FlexboxItem,
  Toast
} from 'vux'
import ShopCell from '../../components/toolComponent/shopCell.vue'
import orderListCell from '../../components/toolComponent/orderListCell.vue'
import {myTools, getGoodsImg} from '../../components/utils/utils.js'
export default {
  components: {
    ShopCell,
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Toast,
    orderListCell
  },
  data () {
    return {
      list: [],
      list2: ['全部', '待付款', '待发货', '待收货', '待评价', '已完成', '已取消'],
      demo2: '商品',
      index: this.$route.params.index ? this.$route.params.index : 0,
      all_order_list: [],
      orderListInfos: [],
      user_info: myTools().get_local_userinfo
    }
  },
  methods: {
    backFn () {
      this.$router.push({name: 'userInfo'})
    },
    noListFn () {
      switch (this.index) {
        case 0:
          return '还没有订单'
        case 1:
          return '没有未付款的订单'
        case 2:
          return '没有待发货的商品'
        case 3:
          return '没有待收货的商品'
        case 4:
          return '没有待评价的商品'
        case 5:
          return '没有已完成的商品'
        case 6:
          return '没有已取消的订单'
      }
    },
    pingjia_fn (item) {
      this.$router.push({name: 'pingjia', params: {info: item}})
    },
    switchTabItem (params, isScroll = true) {
      var index = params.cur_index
      var that = this
      that.$vux.loading.hide()
      that.$data.index = index

      that.selectOrderByStatus(that, index)
      if (isScroll === true) {
        that.$('.vux-swiper').scrollTop(0)
      }
      setTimeout(function () {
        var windowHeight = that.$(window).height()
        var headerHeight = that.$('.vux-header').outerHeight()
        var tabHeight = that.$('.vux-tab').outerHeight()
        that.$refs.mySwiper.xheight = windowHeight - headerHeight - tabHeight + 20 + 'px'
        that.$('.vux-swiper').css({ overflow: 'scroll' })
      }, 100)
    },
    // 订单列表
    orderListReq () {
      var that = this
      that.$vux.loading.show({
        text: 'loading...'
      })
      myTools().my_post('ordertableListJson', {
        wxid: that.user_info.wxid
      }, function (result) {
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.all_order_list = []
          that.all_order_list = result.data.data
          that.orderListInfos = that.all_order_list
          that.switchTabItem({cur_index: that.$data.index})
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        that.$vux.loading.hide()
        console.log(error)
      })
    },
    // 购买数量
    buyNum (type) {
      var nums = 0
      var prices = 0
      for (var i = 0; i < this.orderListInfos.length; i++) {
        var orderInfoArr = this.orderListInfos[i].goodsInfo
        for (var j = 0; j < orderInfoArr.length; j++) {
          nums += parseInt(orderInfoArr[j].buyNumber)
          prices += parseInt(orderInfoArr[j].goods.price)
        }
      }
      if (type === 'num') {
        return nums
      }
      if (type === 'price') {
        return prices
      }
    },
    // 去付款
    go_to_pay (orderInfo) {
      // that.$router.push({ name: 'pay_money', params: {orderInfo: result.data.data} })
      this.$router.push({name: 'pay_money', params: {orderInfo: orderInfo}})
    },
    // 确认收货
    qurenshouhuo (item) {
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
    // 取消订单
    cancelOrder (orderId) {
      var that = this
      that.$vux.loading.show({
        text: 'loading...'
      })
      myTools().my_post('modify_order_status', {
        orderTableId: orderId,
        status: 2
      }, function (result) {
        that.$vux.loading.hide()
        that.$vux.toast.text(result.data.message, 'center')
        if (result.data.status === 'ok') {
          for (var i = 0; i < that.$data.all_order_list.length; i++) {
            if (that.$data.all_order_list[i].orderId === orderId) {
              that.$data.all_order_list[i].status = '已取消'
              break
            }
          }
          // that.selectOrderByStatus(that, 0, 'order')
          that.selectOrderByStatus(that, 0)
        }
      }, function () {
        that.$vux.loading.hide()
        that.$vux.toast.text('网络请求失败....', 'bottom')
      })
    },
    getUrl (goodsObj) {
      return getGoodsImg(goodsObj)
    },
    zuzhuangTempOrder (perOrder) {
      var oneOrder = {
        'createTime': perOrder.createTime,
        'deliveryTime': perOrder.deliveryTime,
        'freightPrice': perOrder.freightPrice,
        'freightRiskPrice': perOrder.freightRiskPrice,
        'goodsInfo': [],
        'invoiceContent': perOrder.invoiceContent,
        'invoiceType': perOrder.invoiceType,
        'noGoodsMethod': perOrder.noGoodsMethod,
        'orderId': perOrder.orderId,
        'payTime': perOrder.payTime,
        'sendCompany': perOrder.sendCompany,
        'status': perOrder.status,
        'totalFreightMoney': perOrder.totalFreightMoney,
        'totalMoney': perOrder.totalMoney,
        'totalNum': perOrder.totalNum,
        'transportMethod': perOrder.transportMethod,
        'userAddress': perOrder.userAddress,
        'userInfo': perOrder.userInfo,
        'wxOrderId': perOrder.wxOrderId
      }
      return oneOrder
    },
    // 根据状态 筛选订单
    selectOrderByStatus (that, index) {
      that.orderListInfos = []
      if (index === 0) {
        that.orderListInfos = that.all_order_list
      }
      if (index === 1) {
        for (var i = 0; i < that.all_order_list.length; i++) {
          if (that.all_order_list[i].status === 0) {
            that.orderListInfos.push(that.$data.all_order_list[i])
          }
        }
      }
      if (index === 6) {
        for (var n = 0; n < that.all_order_list.length; n++) {
          if (that.all_order_list[n].status === 2) {
            that.orderListInfos.push(that.$data.all_order_list[n])
          }
        }
      }
      // '全部', '待付款', '待发货', '待收货', '待评价', '已完成', '已取消'
      if (index === 2 || index === 3 || index === 4) {
        for (var j = 0; j < that.all_order_list.length; j++) {
          if (that.all_order_list[j].status === 1) {
            var oneOrder1 = that.zuzhuangTempOrder(that.all_order_list[j])
            for (var k = 0; k < that.all_order_list[j].goodsInfo.length; k++) {
              if (that.all_order_list[j].goodsInfo[k].status === index - 1) {
                oneOrder1.goodsInfo.push(that.all_order_list[j].goodsInfo[k])
              }
            }
            if (oneOrder1.goodsInfo.length > 0) {
              that.orderListInfos.push(oneOrder1)
            }
          }
        }
      }
      if (index === 5) {
        for (var l = 0; l < that.all_order_list.length; l++) {
          if (that.all_order_list[l].status === 1) {
            var oneOrder = that.zuzhuangTempOrder(that.all_order_list[l])
            for (var m = 0; m < that.all_order_list[l].goodsInfo.length; m++) {
              if (that.all_order_list[l].goodsInfo[m].status === 3 || that.all_order_list[l].goodsInfo[m].status === 4) {
                oneOrder.goodsInfo.push(that.all_order_list[l].goodsInfo[m])
              }
            }
            if (oneOrder.goodsInfo.length > 0) {
              that.orderListInfos.push(oneOrder)
            }
          }
        }
      }
    },
    // 删除订单
    deleteOrder (orderId) {
      var that = this
      this.$vux.loading.show({
        text: 'loading'
      })
      myTools().my_post('ordertableDelete', {
        orderId: orderId
      }, function (result) {
        if (result.data.status === 'ok') {
          that.delete_localArr_by_orderId(orderId)
          that.$vux.toast.text('订单删除成功...', 'center')
        }
        that.$vux.loading.hide()
      }, function () {
        that.$vux.loading.hide()
        that.$vux.toast.text('删除失败...')
      })
    },
    // 根据订单id删除数组中的订单
    delete_localArr_by_orderId (orderId) {
      for (var i = 0; i < this.all_order_list.length; i++) {
        if (orderId === this.all_order_list[i].orderId) {
          this.all_order_list.splice(i, 1)
          break
        }
      }
      this.switchTabItem({
        cur_index: this.index
      }, false)
    },
    wuliuFn (item) {
      this.$router.push({name: 'logisticsQuery', params: {orderInfo: item}})
    }
  },
  created () {
    console.log('订单created....')
    this.orderListReq()
  }
}
</script>

<style lang='less' scoped>
  // @import "~vux/src/styles/1px.less";
  // @import "~vux/src/styles/center.less";

  #myFocusPage .vux-slider {
    overflow: unset;
  }

  #myFocusPage #mySwiper .vux-swiper {
    overflow: unset;
  }
  .wrap—order {
    padding: 0.375rem;
    background: #ffffff;
    margin-bottom: 10px;
  }
  .item—title {
    height: 2.8125rem;
    line-height: 2.8125rem;
    border-bottom: 1px solid #ebebeb;
    font-size: .4em;
  }
  .font-right {
    text-align: right;
    font-size: 12px;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
  .bottom-order {
    margin-top: 0.375rem;
  }
  .flex-demo {
    text-align: center;
    border-radius: 20px;
    background-clip: padding-box;
    height: 1.875rem;
    border: 1px solid #666;
    line-height: 1.875rem;
    
  }
  .first_order {
    display: none;
  }
  .orserListWrap {
    display: flex;
    // padding: 5px;
    border-bottom: 1px solid #ebebeb;
    padding-top: 10px;
    font-size: 14px;
  }
  .orderListImg {
    flex: 1;
    padding-right: 5px;
  }
  .orderListImg img {
    width: 100px;
    height: 100px;
  }
  .orderListDetail {
    flex: 3;
  }
  .detailInfo {
    margin-bottom: 15px;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .shopsColor {
    color: #f74c31;
  }
  .goods_name{
    color: lightseagreen;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: .6em;
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
  }
  .goods_order_number{
    color: blueviolet;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-align: right;
    font-size: .6em;
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
  }
  
  .goods_params{
    padding-top: 1em;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: .2em;
    color: lightslategray;
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
  }

  .noList{
    padding-top: 100px;
    text-align: center;
  }
</style>