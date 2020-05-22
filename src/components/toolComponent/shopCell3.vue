<template>
    <!--图片 商品名 价钱运费等-->
    <div class="cell_content">
      <div class="left">
        <div class="left_img_wrap">
          <img :src="getImgUrl(goods)" alt="">
        </div>
      </div>
      <div class="center">
        <p>{{goods.goodsname}}</p>
        <p>{{params}}</p>
        <p v-if="zidingyi==true">
          <span>赠{{goods.rebate}}</span>
        </p>
        <p v-else><span>7天退换</span></p>
      </div>
      <div class="right">
        <p>￥{{goods.shop_price}}</p>
        <p>￥{{goods.market_price}}</p>
        <p v-if="zidingyi=true"></p>
        <p v-else><span>x{{buyNumber}}</span></p>
      </div>
    </div>
</template>



<script>
import {getGoodsImg} from '../../components/utils/utils.js'
export default {
  props: ['goods', 'params', 'buyNumber', 'zidingyi'],
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
    getImgUrl (goods) {
      return getGoodsImg(goods)
    }
  }
}
</script>

<style lang="less" scoped>

  .cell_content{
    background-color: #f9f9f9;
    display: flex;
    padding: 10px 15px;
    
  }
  .cell_content .left{
    flex: 30%;
  }
  .left_img_wrap {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
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
</style>