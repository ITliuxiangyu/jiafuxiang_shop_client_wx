<template>
<!-- 列表形式 -->
    <div>
      <div class="news_recommend" v-for="(item , i) in shoplistData" :key="i">
        <shop-cell3 :zidingyi="true"  :goods="item" :params="getParams(item)" buyNumber="12"></shop-cell3>
      </div>
    </div>
</template>

<script>
import {Panel, Flexbox, FlexboxItem} from 'vux'
import {getGoodsImg} from '../utils/utils.js'
import shopCell3 from './shopCell3'
export default {
  components: {
    Panel,
    Flexbox,
    FlexboxItem,
    shopCell3
  },
  props: ['shoplistData'],
  methods: {
    getParams (item) {
      return '库存:' + item.counts + ' 销量:' + item.sellcount
    },
    url_list (item) {
      return getGoodsImg(item)
    },
    goGoodsDetail (goodsId) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: goodsId
        }
      })
    }
  },
  data () {
    return {
      type: '1'
    }
  },
  created () {
  },
  computed: {}
}
</script>
<style lang="less">
.newGoods{
    background: #ffffff;
    border-radius: 5px;
    padding: 8px;
    // height: 300px;
    margin:0.25rem 0.25rem; 
}
.news_recommend {
  // width: 100%;
  // margin:0 0.25rem;
  border-bottom: 1px solid lightgray;
}
.new_photos img {
  width: 100%;
}
.good_tip {
  text-align: center;
  line-height: 35px;
  color: #ed393d;
}
.newTitles,
.newInfo,
.newPrices {
  text-align: left;
  display: -webkit-box;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /* font-size: 12px; */
  padding-left: 1rem;
  line-height: 21px;
}
.newInfo {
  color: #999999;
}
.newTitles {
  font-size: 13px;
}
.newPrices {
  color: #ed393d;
}
.newPrices span{
  display: inline-block;
  background: #ed393d;
    margin: 1px;
    border-radius: 10px;
    padding:0px 0.5rem; 
    font-size: 8px;
    color: #ffffff
}
.huadiaoPrice{
  color: #cccccc;
  padding-left: 15px;
  text-decoration: line-through;
  font-size: 10px
}
</style>
