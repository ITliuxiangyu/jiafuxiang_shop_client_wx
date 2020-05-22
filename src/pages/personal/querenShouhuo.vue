<template>
  <div>
    <x-header :title="titleFn()" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 

    <div class="queren_wrap">
      <div class="tu_wrap">
        <p class="first"><img src="static/home/chenggong.png" alt="">{{bigTextFn()}}</p>
        <p class="second">{{xiaoTextFn()}}</p>
        <p class="third"><span v-tap="{methods: backToHome}">返回首页</span><span v-tap="{methods: goToPingjia}">{{pingjiaBtnTextFn()}}</span></p>
      </div>
    </div>


    <two-goods-in-one-row class="goods_list"></two-goods-in-one-row>

  </div>
</template>



<script>
  import {
    XHeader
  } from 'vux'
  import twoGoodsInOneRow from '../../components/toolComponent/twoGoodsInOneRow.vue'
  export default {
    components: {
      XHeader,
      twoGoodsInOneRow
    },
    data () {
      return {
        querenObj: this.$route.params.item,
        currentTitle: this.$route.params.title
      }
    },
    methods: {
      pingjiaBtnTextFn () {
        if (this.currentTitle === '支付成功') {
          return '查看订单'
        }
        return '立即评价'
      },
      xiaoTextFn () {
        if (this.currentTitle === '支付成功') {
          return '等待卖家发货~'
        }
        return '去评价一下本次的购物体验吧~'
      },
      bigTextFn () {
        if (this.currentTitle === '支付成功') {
          return '支付成功'
        }
        return '交易成功'
      },
      titleFn () {
        if (this.currentTitle === '支付成功') {
          return '支付成功'
        }
        return '确认成功'
      },
      backToHome () {
        this.$router.push({name: 'home'})
      },
      goToPingjia () {
        if (this.currentTitle === '支付成功') {
          this.$router.push({name: 'my_order', params: {index: 2}})
        } else {
          this.$router.push({name: 'pingjia', params: {info: {order: this.querenObj.order, goods: this.querenObj.goods}}})
        }
      }
    },
    created () {
      if (this.querenObj === '' || this.querenObj === undefined || this.querenObj == null) {
        this.querenObj = JSON.parse(localStorage.getItem('querenShouhuo_querenObj'))
      } else {
        localStorage.setItem('querenShouhuo_querenObj', JSON.stringify(this.querenObj))
      }
      if (this.currentTitle === '提交成功') {
      }
    }
  }
</script>

<style lang='less' scoped>
  .tu_wrap{
    // height: 100px;
    background: linear-gradient(to right , #fd7c07 , #f83709);
    text-align: center;
    color: #fffae4;
    
  }
  .tu_wrap .first img{
    width: 22px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .tu_wrap .first{
    vertical-align: middle;
    font-size: 22px;
  }
  .tu_wrap .third{
    color: white;
    padding-top: 18px;
    padding-bottom: 22px;
  }
  .tu_wrap .third span{
    border: 1px solid white;
    border-radius: 99px;
    padding: 6px 18px;
  }
  .tu_wrap .third>span:nth-child(1){
    margin-right: 10px;
  }
  .tu_wrap .third>span:nth-child(2){
    margin-left: 10px;
  }

  .goods_list{
    margin-top: 20px;
  }
</style>