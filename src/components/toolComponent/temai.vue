<template>
    <!-- 首页 特卖区 -->
    <div class="temai_wrap">
      <moFangTitle title="好货特卖"></moFangTitle>
      <div class="content">
        <div v-if="miaoshaList.length >= 2">
          <zutu1 :secondKillList="miaoshaList" desc="速度来抢购吧~" title="精品秒杀" :isMiaosha="true" :leftGoods='miaoshaList[0].goods  ' :rightGoods='miaoshaList[1].goods'></zutu1>
        </div>
        <div v-else>
          <zutu1 :leftGoods='getOneGoods(0)' :rightGoods='getOneGoods(1)'></zutu1>
        </div>
        <div>
          <zutu1 :leftGoods='getOneGoods(1)' :rightGoods='getOneGoods(0)'></zutu1>
        </div>
      </div>

      <div class="jiao">
        <p>好货推荐</p>
        <div class="jiao_content">
          <div v-for="(item , i) in goodsList" :key="i">
            <div class="tupian">
              <div class="tupian_img_wrap" v-tap="{methods: goGoodsDetail , goodsid:item.goodsid}">
                <img :src="getTuijianImg(item)" alt="" >
              </div>
              <p class="qiang"><span>{{item.shopname}}</span></p>
              <p class="qian"><span>￥{{item.shop_price}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import zutu1 from './zutu1.vue'
  import moFangTitle from './home/mo_fang_module/mo_fang_title.vue'
  import {homeUrl} from '../../components/utils/utils.js'
  export default {
    props: ['goodsList', 'miaoshaList', 'allSecondKill'],
    components: {
      zutu1,
      moFangTitle
    },
    data () {
      return {
      }
    },
    methods: {
      getOneGoods (number) {
        if (this.goodsList.length >= number + 1) {
          return this.goodsList[number]
        } else {
          return {}
        }
      },
      goGoodsDetail (params) {
        this.$router.push({
          name: 'goods_detail',
          params: {
            goodsId: params.goodsid
          }
        })
      },
      getTuijianImg (item) {
        if (item.recommendImg) {
          return homeUrl() + item.recommendImg
        } else {
          return homeUrl() + item.product_thumb_image
        }
      },
      btnFn () {
        this.$emit('btnTap')
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(function () {
      })
    }
  }
</script>
<style lang="less" scoped>
  .temai_wrap .content{
    display: flex;
  }
  .temai_wrap .content>div{
    flex: 1; 
  }
  .content>div:nth-child(1){
    margin-right: 5px;
  }
  .content>div:nth-child(2){
    margin-left: 5px;
  }

  // jiao
  .jiao{
    background-color: #f6f6f6;
    margin-top: 10px;
    border-radius: 10px;
  }
  .jiao>p{
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
    font-weight: bold;
  }
  .jiao .jiao_content{
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 20px;
  }
  .jiao .jiao_content>div{
    flex: 1;
  }

  .tupian{
    font-size: 8px;
    text-align: center;
    color: #fb003d;
    margin-left: 4px;
    margin-right: 4px;
  }
  .tupian_img_wrap {
    overflow: hidden;
    height: 0;
    padding-bottom: 100%;
  }
  .tupian img{
    width: 100%;
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
</style>