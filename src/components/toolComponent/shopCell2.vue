<template>
    <!-- 图片 文字 按钮 -->
    <div class="shop_cell2_page">
      <div class="shop_cell2_wrap">
        <div class="img_wrap"><img :src="getImgUrl(goods)" alt=""></div>
        <div class="text_wrap">
          <p>{{goods.goodsname}}</p>
        </div>
        <div class="btn_wrap">
          <span v-tap="{methods:goPingjia}">去评价</span>
        </div>
      </div>
    </div>
</template>

<script>
import {getGoodsImg} from '../../components/utils/utils.js'
export default {
  props: ['goods'],
  components: {
  },
  methods: {
    goPingjia () {
      this.$emit('goPingjiaEv', this.goods.goodsid)
    },
    getImgUrl (goods) {
      return getGoodsImg(goods)
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>
<style lang="less" scoped>
  .shop_cell2_page{
    background-color: white;
    padding-left: 15px;
    padding-right: 15px;
  }
  .shop_cell2_wrap{
    border-bottom: 0.5px solid #a4a4a4;
    display: flex;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .img_wrap{
    flex: 27.672%;
  }
  .img_wrap img{
    width: 100%;
    vertical-align: middle;
  }
  .text_wrap{
    flex: 49.735%;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .text_wrap p{
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .btn_wrap{
    flex: 23.51%;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
  }
  .btn_wrap span{
    color: #fb3808;
    border: 1px solid #fb3808;
    border-radius: 99px;
    padding: 6px 9px;
  }
  
</style>
