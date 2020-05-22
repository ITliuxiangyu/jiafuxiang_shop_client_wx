<template>
  <div class="dian_dan_bian_hao_wrap">
    <p><span>订单编号: </span><span>{{orderId}}</span></p>
    <p><span>微信交易单号: </span><span>{{wxOrderId}}</span></p>
    <p><span>创建时间: </span><span>{{createTime}}</span></p>
    <p><span>交易时间: </span><span>{{payTime}}</span></p>
    <!--<p><span>发货时间: </span><span>{{fahuoTime}}</span></p>-->
  </div>
</template>



<script>
// import {Tab, TabItem, Swiper, SwiperItem, XHeader, Flexbox, FlexboxItem} from 'vux'
// import {getGoodsImg} from '../../components/utils/utils.js'
// import myCellOne from '../../components/toolComponent/myCellOne.vue'
export default {
  props: ['orderId', 'wxOrderId', 'createTime', 'payTime', 'fahuoTime'],
  components: {
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
  }
}
</script>

<style lang="less" scoped>
  .dian_dan_bian_hao_wrap{
    background-color: white;
    padding: 15px;
    margin-top: 10px;
  }
  .dian_dan_bian_hao_wrap p{
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 8px;
    color: #666;
  }
</style>