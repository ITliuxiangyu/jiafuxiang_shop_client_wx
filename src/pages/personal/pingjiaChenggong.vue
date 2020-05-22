<template>
  <div>
    <x-header title="评价成功" @on-click-more="show = true">
      <span v-tap="{methods: backFn}" slot="right" type="navicon" size="35">我的</span>
    </x-header> 
    
    <div class="tupian_wrap">
      <img src="static/home/shangcheng.jpg" alt="">
    </div>

    <div class="fuli_wrap">
      <div class="fuli_tou">
        以下福利奉上~
      </div>
      <div class="fuli_content">
        <div class="ling_wrap">
          <p><img src="static/home/lipin.png" alt=""></p>
          <p><span v-tap="{methods: lingGouWuQuanFn}">领购物券</span></p>
        </div>
      </div>
    </div>

    <div class="fenge_wrap">
      <divider>接着评下去吧~</divider>
    </div>

    <div class="googs_wrap">
      <shop-cell2 v-for="(item , index) in otherPingjiaList" :key="index" v-on:goPingjiaEv = "gongPingjiaFn" :goods="item"></shop-cell2>
    </div>
    
  </div>
</template>

<script>
import {XHeader, Divider} from 'vux'
import shopCell2 from '../../components/toolComponent/shopCell2'
import {myTools} from '../../components/utils/utils.js'
export default {
  components: {
    XHeader,
    Divider,
    shopCell2
  },
  data () {
    return {
      orderAndGoods: this.$route.params.orderInfo,
      otherPingjiaList: [],
      orderList: []
    }
  },
  methods: {
    backFn () {
      this.$router.push({name: 'userInfo'})
    },
    lingGouWuQuanFn () {
      this.$vux.toast.text('该商品暂无领券', 'center')
    },
    gongPingjiaFn (goodsid) {
      var tempDic = {}
      for (var i = 0; i < this.orderList.length; i++) {
        for (var j = 0; j < this.orderList[i].goodsInfo.length; j++) {
          if (this.orderList[i].goodsInfo[j].goods.goodsid === goodsid) {
            tempDic.goods = this.orderList[i].goodsInfo[j]
            tempDic.order = this.orderList[i]
            break
          }
        }
      }

      this.$router.push({name: 'pingjia', params: {info: tempDic}})
    },
    // 创建其他商品的订单列表
    createOtherPingjiaList (data) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].goodsInfo.length; j++) {
          if (data[i].goodsInfo[j].is_pingjia === 'false') {
            this.otherPingjiaList.push(data[i].goodsInfo[j].goods)
          }
        }
      }
    },
    // 订单列表
    orderListReq () {
      var that = this
      that.$vux.loading.show({
        text: 'loading...'
      })
      myTools().my_post('ordertableListJson', {
        wxid: myTools().get_local_wxid
      }, function (result) {
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.orderList = result.data.data
          that.createOtherPingjiaList(result.data.data)
        }
      }, function () {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        that.$vux.loading.hide()
      })
    }
  },
  created () {
    if (!this.orderAndGoods || this.orderAndGoods === '' || this.orderAndGoods === undefined) {
      this.orderAndGoods = JSON.parse(localStorage.getItem('pingjia_chenggong_order_and_goods'))
    } else {
      localStorage.setItem('pingjia_chenggong_order_and_goods', JSON.stringify(this.orderAndGoods))
    }
    this.orderListReq()
    this.$nextTick(function () {
    })
  }
}
</script>
<style scoped>
  .tupian_wrap{
    /*height: 100px;*/
    /*background-color: yellow;*/
  }
  .tupian_wrap img{
    width: 100%;
  }
  .fuli_wrap{
    background-color: white;
    margin-top: 10px;
  }
  .fuli_tou{
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
    color: #858585;
  }
  /*
  <div class="fuli_content">
        <div class="ling_wrap">
          <p><img src="static/bottom/2.jpg" alt=""></p>
          <p><span>领购物券</span></p>
        </div>
      </div>
  */
  .fuli_content .ling_wrap{
    text-align: center;
  }
  .fuli_content .ling_wrap img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .fuli_content .ling_wrap span{
    border: 1px solid black;
    border-radius: 99px;
    padding: 5px 14px;
  }
  .fuli_content .ling_wrap>p:nth-child(2){
    padding-bottom: 40px;
    padding-top: 20px;
  }
</style>
