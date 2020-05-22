<template>
  <div class="card_wrap">
    <my-cell-one 
      left_img="static/home/yunfeixian.png"
      right_img="static/home/xiangyou.png"
      title1="运费险"
      title2="确认收货前退货可理赔"
    >
    </my-cell-one>

    <div class="xianshi_wrap">
      <div>
        <span>商品总价</span>
        <span>￥{{orderInfo.totalMoney}}</span>
      </div>
      <div>
        <span>运费(快递)</span>
        <span>￥{{orderInfo.totalFreightMoney}}</span>
      </div>
      <div>
        <span>运费险(卖家赠送)</span>
        <span>￥{{orderInfo.freightRiskPrice}}</span>
      </div>
      <div>
        <span>店铺优惠</span>
        <span>￥0.0</span>
      </div>
      <div class="dingdan_zongjia">
        <span>订单总价</span>
        <span>￥{{orderInfo.totalMoney}}</span>
      </div>
    </div>
    <div class="shifukuang_wrap">
      <div>实付款</div>
      <div>￥{{realTotalMoney()}}</div>
    </div>
  </div>
</template>



<script>
// import {Tab, TabItem, Swiper, SwiperItem, XHeader, Flexbox, FlexboxItem} from 'vux'
// import {getGoodsImg} from '../../components/utils/utils.js'
import myCellOne from '../../components/toolComponent/myCellOne.vue'
export default {
  props: ['orderInfo'],
  components: {
    myCellOne
  },
  data () {
    return {
    }
  },
  created: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    realTotalMoney () {
      if (this.orderInfo.status === 0) {
        return 0
      }
      return this.orderInfo.totalMoney
    }
  }
}
</script>

<style lang="less" scoped>
  .jiao_wrap{
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    border-top: 1px solid #d7d7d7;
    text-align: right;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .jiao_wrap span{
    border: 1px solid #acacac;
    border-radius: 99px;
    padding: 6px 5px;
    margin-left: 8px;
    position: relative;
  }
  .jiao_wrap .gaoliang{
    color: #fb3808;
    border: 1px solid #fb3808;
    margin-right: 15px;
  }
  .xianshi_wrap{
    background-color: white;
    padding: 10px 15px;
  }
  .xianshi_wrap>div{
    display: flex;
    font-size: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    color: #666;
  }
  .xianshi_wrap>div span{
    display: block;
    flex: 1;
  }
  .xianshi_wrap>div span:nth-child(2){
    text-align: right;
  }
  .xianshi_wrap .dingdan_zongjia{
    font-size: 17px;
    color: black;
  }
  .shifukuang_wrap{
    display: flex;
    background-color: white;
    padding: 10px 15px;
    border-top: 1px solid #d7d7d7;
  }
  .shifukuang_wrap>div{
    flex: 1;
    font-size: 17px;
  }
  .shifukuang_wrap>div:nth-child(2){
    text-align: right;
    color: #fb3808;
  }
</style>