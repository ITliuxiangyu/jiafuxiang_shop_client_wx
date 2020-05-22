<template>
    <div class="pingjia_cell_wrap">
      <div>
        <img :src="getUrl(goods.goods)" alt="">
      </div>
      <div>
        <p>{{goods.goods.goodsname}}</p>
        <p>{{goods.params}}</p>
      </div>
      <div>
        <p>￥{{goods.goods.shop_price}}</p>
        <p>x {{goods.buyNumber}}</p>
      </div>
    </div>
    
  
</template>


<script>
import {Panel} from 'vux'
import {getGoodsImg} from '../utils/utils.js'
export default {
  props: ['goods'],
  components: {
    Panel
  },
  data () {
    return {
    }
  },
  methods: {
    getUrl (goods) {
      return getGoodsImg(goods)
    }
  }
}
</script>

<style scoped>
  .pingjia_cell_wrap{
    /*margin-top: 10px;*/
    padding: 8px 15px;
    display: flex;
    background-color: white;
  }
  .pingjia_cell_wrap>div:nth-child(1) img{
    width: 70px;
    height: 70px;
  }
  .pingjia_cell_wrap>div:nth-child(2){
    flex: 1;
    margin: 0 8px;
  }
  .pingjia_cell_wrap>div:nth-child(2) p:nth-child(1){
    color: #1f1f1f;
  }
  .pingjia_cell_wrap>div:nth-child(2) p:nth-child(2){
    color: #a4a4a4;
    font-size: 10px;
  }
  .pingjia_cell_wrap>div:nth-child(3){
    width: 50px;
    text-align: right;
  }
  .pingjia_cell_wrap>div:nth-child(3) p:nth-child(2){
    color: #a4a4a4;
    font-size: 10px;
  }
</style>

