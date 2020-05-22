<template>
    <!-- 大文字 -->
    <!-- 小文字 -->
    <!-- 图片 图片 -->
    <div class="zutu1_wrap">
      <div class="wenzi1">
        <span>{{currentTitle}}</span>
        <span v-if="miaosha">
          <clocker :time="daojiTime">
            <span class="day">%_H1%_H2</span>:
            <span class="day">%_M1%_M2</span>:
            <span class="day">%_S1%_S2</span>
          </clocker>
        </span>
      </div>
      <div class="wenzi2">{{currentDesc}}</div>
      <div class="tupian">
        <div class="tupian_left">
          <div class="tupian_img_wrap" v-tap="{methods: goGoodsDetail , goodsid:leftGoods.goodsid}">
            <img :src="getImgUrl(leftGoods)" alt="">
          </div>
          <p v-if="!currentPinpai" class="qiang"><span>送积分{{leftGoods.songjifen}}</span></p>
          <p v-if="!currentPinpai" class="qian"><span>￥{{leftGoods.shop_price}}</span></p>
          <p v-if="currentPinpai"><span>{{leftGoods.product_brand}}</span></p>
        </div>
        <div class="tupian_right">
          <div class="tupian_img_wrap" v-tap="{methods: goGoodsDetail , goodsid:rightGoods.goodsid}">
            <img :src="getImgUrl(rightGoods)" alt="">
          </div>
          <p v-if="!currentPinpai" class="qiang"><span>送积分{{rightGoods.songjifen}}</span></p>
          <p v-if="!currentPinpai" class="qian"><span>￥{{rightGoods.shop_price}}</span></p>
          <p v-if="currentPinpai"><span>{{rightGoods.product_brand}}</span></p>
        </div>
      </div>
    </div>
</template>

<script>
  import {homeUrl} from '../../components/utils/utils.js'
  import {Clocker} from 'vux'
  export default {
    components: {
      Clocker
    },
    props: ['leftGoods', 'rightGoods', 'isMiaosha', 'title', 'desc', 'secondKillList', 'pinpai'],
    data () {
      return {
        daojiTime: '2018-09-20',
        miaosha: false,
        currentTitle: '大促销',
        currentDesc: '嘉福祥特卖商品',
        currentPinpai: false
      }
    },
    methods: {
      goGoodsDetail (params) {
        if (this.isMiaosha === true) {
          this.$router.push({
            name: 'secondKillList',
            params: {
              secondKillList: this.secondKillList
            }
          })
        } else {
          this.$router.push({
            name: 'goods_detail',
            params: {
              goodsId: params.goodsid
            }
          })
        }
      },
      getImgUrl (goods) {
        return homeUrl() + goods.product_thumb_image
      },
      btnFn () {
        this.$emit('btnTap')
      }
    },
    created () {
      if (this.isMiaosha === true) {
        this.miaosha = true
      } else {
        this.miaosha = false
      }
      if (this.title) {
        this.currentTitle = this.title
      }
      if (this.desc) {
        this.currentDesc = this.desc
      }
      if (this.pinpai) {
        this.currentPinpai = this.pinpai
      }
    }
  }
</script>
<style lang="less" scoped>
  .zutu1_wrap{
    background-color: #f6f6f6;
    padding-top: 15px;
    padding-left:15px;
    padding-right: 15px;
    padding-bottom: 8px;
    border-radius: 10px;
  }
  .tupian{
    display: flex;
    margin-top: 10px;
    font-size: 8px;
    text-align: center;
    color: #fb003d;
  }
  .tupian>div{
    flex: 1;
    
  }
  .tupian_left{
    margin-right: 4px;
    width: 100%;
    // height: 0;
    // padding-bottom: 100%;
    overflow: hidden;
  }
  .tupian_right{
    margin-left: 4px;
    width: 100%;
    // height: 0;
    // padding-bottom: 100%;
    overflow: hidden;
  }
  .tupian_img_wrap{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }
  .tupian_img_wrap img{
    width: 100%;
  }
  .wenzi1{
    font-size: 14px;
    font-weight: bold;
  }
  .wenzi2{
    font-size: 8px;
    color: #535353;
  }

  
  .tupian .qian{
    font-size: 14px;
  }
  .tupian .qiang{
    margin-top: 6px;
  }
  .tupian .qiang span{
    border: 1px solid #fb003d;
    background-color: #ffe8ed;
    border-radius: 3px;
    padding: 2px 3px;
  }

  .day {
    background-color: #000;
    color: #fff;
    text-align: center;
    display: inline-block;
    padding: 0 2px;
    border-radius: 3px;
    font-size: 12px;
  }
</style>