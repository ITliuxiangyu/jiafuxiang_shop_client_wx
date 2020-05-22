<template>
  <div class="order_list_cell_page">
    <div class="order_list_cell_wrap" v-for="(item, i) in orderInfoList" :key="i">
      <div class="cell_tou">
        <div>
          <img src="static/home/tianmaobao.png" alt="">
          <span>{{item.goodsInfo[0].goods.shopname}}</span>
        </div>
        <div>
          <span>{{getStatus(item)}}</span>
        </div>
      </div>
      <div class="cell_content1" v-for="(goodsItem , j) in item.goodsInfo" :key='j'>
        <shop-cell3 
          :goods="goodsItem.goods"
          :params='goodsItem.params'
          :buyNumber='goodsItem.buyNumber'
        ></shop-cell3>
        <div v-show="isHaveAnniuFn()" class="cell_bottom">
          <span v-show="item.status == 0 && goodsItem.status == 0" v-tap="{methods:go_to_pay , order:item}" class="pingjia_btn">去付款</span>
          <span v-show="item.status == 1 && goodsItem.status == 3" v-tap="{methods:qupingjia , order:item , goods:goodsItem}" class="pingjia_btn">去评价</span>
          <span v-show="item.status == 1 && (goodsItem.status == 1 || item.status == 2)" v-tap="{methods:chakanwuliu , order:item , goods:goodsItem.goods}" class="pingjia_btn">查看物流</span>
          <span v-show="item.status == 1 && goodsItem.status == 2" v-tap="{methods:querenshouhuo , order:item , goods:goodsItem}" class="pingjia_btn">确认收货</span>
          <span v-show="item.status == 1 && goodsItem.status == 4" class="">评价完成</span>
          <span v-tap="{methods:shanchudingdan , item:item.orderId}" v-show="item.status == 2" class="pingjia_btn">删除订单</span>
        </div>
        <div class="zongji">
          <!--(含运费:￥{{item.totalFreightMoney}})-->
          <p>
            <span class="zongjia_left">{{fahuotimeFn(goodsItem)}}</span><span class="zongjia_right">共{{goodsItem.buyNumber}}件商品 合计:￥{{getTotalMoney(item)}}</span>
          </p>
        </div>
      </div>
      <div class="cell_btns">
        <div class="zongji">
          <!--(含运费:￥{{item.totalFreightMoney}})-->
          <!--<p>
            <span class="zongjia_left">{{fahuotimeFn(goodsItem)}}</span><span class="zongjia_right">共{{goodsItem.buyNumber}}件商品 合计:￥{{getTotalMoney(item)}}</span>
          </p>-->
        </div>
        <!--<div class="btns">
          <span v-tap="{methods:chakanwuliu , item:item}" v-show="item.status == '待收货'">查看物流</span>
          <span v-tap="{methods:querenshouhuo , item:item}" class="gaoliang" v-show="item.status == '待收货'">确认收货</span>
          <span v-tap="{methods:go_to_pay , item:item}" v-show="item.status == 0">去付款</span>
          <span v-tap="{methods:cuimaijiafahuo , item:item}" v-show="item.status == '已付款' || item.status == '待发货'">催卖家发货</span>
          <span v-tap="{methods:quxiaodingdan , item:item.orderId}" v-show="item.status == 0">取消订单</span>
          <span v-tap="{methods:shanchudingdan , item:item.orderId}" v-show="item.status == 2">删除订单</span>
          <span v-tap="{methods:goto_dingdan_detail , goods: item , order: item.orderInfo}" >查看详情</span>
        </div>-->
        <!--<div class="btns" v-show="isShowJiao()">
          <span v-tap="{methods:goto_dingdan_detail , goods: item , order: item.orderInfo}" >查看详情</span>
        </div>-->
      </div>
    </div>
  </div>
</template>



<script>
import shopCell3 from '../../components/toolComponent/shopCell3'
export default {
  props: ['orderInfoList', 'isHaveJiao', 'isHaveAnniu'],
  components: {
    shopCell3
  },
  data () {
    return {
    }
  },
  created: function () {
    var that = this
    this.$nextTick(function () {
      this.$('.cell_tou>div:nth-child(2)>span').css({
        'line-height': that.$('.cell_tou').height() + 'px'
      })
    })
  },
  methods: {
    isHaveAnniuFn () {
      if (this.isHaveAnniu === 'false') {
        return false
      }
      return true
    },
    fahuotimeFn (item) {
      if (item.fahuotime === null || item.fahuotime === '' || item.fahuotime === undefined) {
        return ''
      } else {
        return '发货时间: ' + item.fahuotime
      }
    },
    isShowJiao () {
      if (this.isHaveJiao === 'false') {
        return false
      } else {
        return true
      }
    },
    getTotalMoney (item) {
      // return parseInt(item.buyNumber) * parseFloat(item.goods.shop_price)
      return parseInt(item.totalMoney)
    },
    chakanwuliu (params) {
      this.$emit('chakanwuliu', params.item)
    },
    querenshouhuo (params) {
      this.$emit('querenshouhuo', {order: params.order, goods: params.goods})
    },
    qupingjia (params) {
      this.$emit('qupingjia', {order: params.order, goods: params.goods})
    },
    quxiaodingdan (params) {
      this.$emit('quxiaodingdan', params.item)
    },
    shanchudingdan (params) {
      this.$emit('shanchudingdan', params.item)
    },
    go_to_pay (params) {
      this.$emit('qufukuan', params.order)
    },
    cuimaijiafahuo () {
    },
    goto_dingdan_detail (params) {
      var goods = params.goods
      var orderInfo = this.orderJsonCircle(params.order)
      this.$router.push({name: 'orderDetailComp', params: {order: orderInfo, goods: goods}})
    },
    getStatus (item) {
      var result = ''
      if (item.status === 0) {
        result = '等待买家付款'
      }
      if (item.status === 1) {
        result = '买家已经付款'
      }
      if (item.status === 2) {
        result = '订单已取消'
      }
      if (item.status === 3) {
        result = '交易完成'
      }
      return result
    },
    orderJsonCircle (orderObj) {
      for (var i = 0; i < orderObj.goodsInfo.length; i++) {
        delete orderObj.goodsInfo[i].orderInfo
      }
      return orderObj
    }
  }
}
</script>

<style lang="less" scoped>
  .order_list_cell_wrap{
    // background-color: yellow;
    margin-top: 10px;
    font-size: 12px;
  }
  .cell_tou{
    display: flex;
    padding: 0 15px;
    
  }
  .cell_tou>div{
    flex: 1;
  }
  .order_list_cell_wrap img{
    width: 20px;
    vertical-align: middle;
    
  }
  .cell_tou {
    background-color: white;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .order_list_cell_wrap span{
    vertical-align: middle;
  }
  .cell_tou>div:nth-child(2){
    text-align: right;
  }
  .cell_tou>div:nth-child(2) span{
    color: #fb3808;
  }

  .cell_content{
    background-color: #f9f9f9;
    display: flex;
    padding: 10px 15px;
    
  }
  .cell_content .left{
    flex: 30%;
  }
  .cell_content .left img{
    width: 100%;
  }
  .cell_content .center{
    flex: 53%;
    margin-left: 10px;
    margin-right: 10px;
  }
  .cell_content .center p:nth-child(1){
    color: black;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .cell_content .center p:nth-child(2){
    color: #858585;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 3px;
  }
  .cell_content .center p:nth-child(3){
    margin-top: 3px;
  }
  .cell_content .center p:nth-child(3) span{
    color: #d10018;
    border: 1px solid #d10018;
    border-radius: 3px;
    padding: 0 2px;
  }
  .cell_content .right{
    flex: 15%;

    text-align: right;
  }
  .cell_content .right p:nth-child(2){
    color: #858585;
    text-decoration: line-through;
  }
  .cell_btns{
    // background-color: white;
  }
  .zongji{
    border-bottom: 0.5px solid #d7d7d7;
    padding: 10px 15px;
    text-align: right;
  }
  .zongjia_left{
    float: left;
  }
  .cell_btns .btns{
    border-bottom: 0.5px solid #d7d7d7;
    padding: 13px 15px;
    text-align: right;
  }
  .cell_btns .btns span{
    border: 1px solid #acacac;
    border-radius: 99px;
    padding: 6px 5px;
    margin-left: 8px;
  }
  .order_list_cell_wrap .cell_btns .gaoliang{
    color: #fb3808;
    border: 1px solid #fb3808;
  }

  .cell_bottom {
    text-align: right;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #f9f9f9;

  }
  .pingjia_btn{
    color: #fb3808;
    border: 1px solid #fb3808;
    border-radius: 99px;
    padding: 6px 5px;
    margin-left: 10px;
  }

  .cell_content1{
    border-bottom: 1px solid white;
  }

</style>