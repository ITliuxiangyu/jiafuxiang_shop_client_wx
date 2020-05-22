<template>
<!-- 列表形式 -->
    <div>
      <div class="news_recommend">
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="48.5/100" v-for="(item , i) in shoplistData" :key="i" @click.native="goGoodsDetail(item.goodsid)">
            <div class="newGoods">
              <div class="new_photos"><img :src="url_list(item)" alt=""></div>
              <div class="newTitles">{{item.goodsname}}</div>
              <div class="newInfo">库存：{{item.counts}} &nbsp;销量：{{item.sellcount}}</div>
              <div class="newPrices">￥{{item.shop_price}} <span>{{item.rebate}}</span></div>  
              <div class="huadiaoPrice"> ￥{{item.market_price}}</div> 
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
</template>

<script>
import {Panel, Flexbox, FlexboxItem} from 'vux'
import {getGoodsImg} from '../utils/utils.js'

export default {
  components: {
    Panel,
    Flexbox,
    FlexboxItem
  },
  props: ['shoplistData'],
  methods: {
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
  computed: {}
}
</script>
<style lang="less">
.newGoods{
  background: white;
  border: 1px solid #f2f2f2;
}
.new_photos{
  background: #f6f6f6;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
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
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding-left: 1rem;
  line-height: 21px;
}
.newInfo {
  color: #999999;
  font-size: .4em;
}
.newTitles {
  font-size: 13px;
  height: 18px;
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

.vux-flexbox-item {
  // padding-left:0.3em;
  // padding-right:0.3em;
  margin-bottom:10px;
}
.vux-flexbox-item:nth-child(2n){
  padding-left:0.3em;
}
.vux-flexbox-item:nth-child(2n + 1){
  padding-right:0.3em;
}
</style>
