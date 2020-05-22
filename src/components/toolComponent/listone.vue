<template>
  <div class="page_wrap">
    <div class="one_row" v-for="(item , i) in shoplistData" :key="i" v-tap="{methods:go_to_goods_detail , goodsid:item.goodsid}">
      <div class="row_left">
        <img :src="getGoodsImg(item)" alt="">
      </div>
      <div class="row_space">

      </div>
      <div class="row_right">
        <div class="right_up">
          {{item.goodsname}}
        </div>
        <div class="right_zhong"></div>
        <div class="right_down">
          <p><span>￥{{item.shop_price}}</span><span>返{{item.rebate}}</span></p>
          <p>好评率30%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {homeUrl, linyueru} from '../utils/utils.js'
  export default {
    components: {
    },
    props: ['shoplistData'],
    data () {
      return {
      }
    },
    computed: {},
    methods: {
      go_to_goods_detail (params) {
        this.$router.push({
          name: 'goods_detail',
          params: {
            goodsId: params.goodsid
          }
        })
      },
      getGoodsImg (goods) {
        if (goods === undefined || goods === '') {
          return linyueru()
        }
        var shopImgs = homeUrl() + goods.product_thumb_image
        return shopImgs
      }
    }
  }
</script>
<style lang="less" scoped>
  .page_wrap .one_row{
    padding-top: 8px;
    display: flex;
    border-bottom: 1px solid #eee;
  }
  .page_wrap .one_row .row_left{
    flex: 38.840%;
  }
  .page_wrap .one_row .row_space{
    flex: 3.47826%;
  }
  .page_wrap .one_row .row_right{
    flex: 57.68174%;
  }
  .page_wrap .one_row .row_left img{
    width: 100%;
    display: block;
    border-radius: 5px;
  }
  .row_right .right_up{
    height: 30%;
    color: rgb(51, 51, 51);
    font: 14px;
    padding-top: 5px;
  }
  .row_right .right_zhong{
    height: 32%;
  }
  .row_right .right_down{
    height: 30%;
    padding-bottom: 5px;
  }
  .row_right p:nth-child(1) span:nth-child(1){
    color: red;
    font-size: 15px;
  }
  .row_right p:nth-child(1) span:nth-child(2){
    color: rgb(51, 51, 51);
    font-size: 10px;
    margin-left: 6px;
  }
  .row_right p:nth-child(2){
    color: rgb(51, 51, 51);
    font-size: 10px;
  }
</style>
