<template>
    <!-- 首页 特卖区 -->
    <div class="temai_wrap">
      <moFangTitle title="推荐品牌"></moFangTitle>
      <div class="content" v-if="goodsList.length == 2 || goodsList.length == 3">
        <div>
          <zutu1 :pinpai="true" desc="新品好货 新品驾到" title="超值品牌" :leftGoods='getOneGoods(0)' :rightGoods='getOneGoods(1)'></zutu1>
        </div>
      </div>

      <div class="content" v-if="goodsList.length >= 4 && goodsList.length <= 7">
        <div>
          <zutu1 :pinpai="true"  desc="新品好货 新品驾到" title="超值品牌" :leftGoods='getOneGoods(0)' :rightGoods='getOneGoods(1)'></zutu1>
        </div>
        <div>
          <zutu1 :pinpai="true"  desc="新品好货 新品驾到" title="超值品牌" :leftGoods='getOneGoods(2)' :rightGoods='getOneGoods(3)'></zutu1>
        </div>
      </div>

      <div class="jiao">
        <div class="jiao_content">
          <div v-for="(item , i) in jiaoList" :key="i">
            <div class="tupian">
              <div class="tupian_img_wrap" v-tap="{methods: goGoodsDetail , goodsid:item.goodsid}">
                <img :src="getImgUrl(item)" alt="">
              </div>
              <p>{{item.product_brand}}</p>
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
    props: ['goodsList'],
    components: {
      zutu1,
      moFangTitle
    },
    data () {
      return {
        jiaoList: []
      }
    },
    created () {
      this.jiaoList = []
      if (this.goodsList.length > 4) {
        for (var i = 0; i < 4; i++) {
          this.jiaoList.push(this.goodsList[i])
        }
      } else {
        this.jiaoList = this.goodsList
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
      getImgUrl (item) {
        return homeUrl() + item.product_thumb_image
      },
      btnFn () {
        this.$emit('btnTap')
      }
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

  
  .jiao .jiao_content{
    display: flex;
    // padding-left: 15px;
    // padding-right: 15px;
    // padding-top: 10px;
  }
  .jiao .jiao_content>div{
    flex: 1;
    background-color: #f6f6f6;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
    margin-top: 10px;
    border-radius: 10px;
  }
  .jiao .jiao_content>div:nth-child(1){
    margin-right: 5px;
  }
  .jiao .jiao_content>div:nth-child(2){
    margin-right: 5px;
    margin-left: 5px;
  }
  .jiao .jiao_content>div:nth-child(3){
    margin-right: 5px;
    margin-left: 5px;
  }
  .jiao .jiao_content>div:nth-child(4){
    margin-left: 5px;
  }

  .tupian{
    font-size: 8px;
    text-align: center;
    color: #fb003d;
    // margin-left: 4px;
    // margin-right: 4px;
  }
  .tupian_img_wrap {
    overflow: hidden;
    height: 0;
    padding-bottom: 100%;
  }
  .tupian img{
    width: 100%;
  }
  .tupian p{
    color: black;
  }
</style>