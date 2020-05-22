<template>
    <!-- 首页 特卖区 -->
    <div class="temai_wrap">
      <moFangTitle title="嘉福祥官方直营"></moFangTitle>
      <div class="content" v-if="goodsList.length == 2 || goodsList.length == 3">
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(0)' :rightGoods='getOneGoods(1)'></zutu1>
        </div>
      </div>

      <div class="content" v-if="goodsList.length >= 4 && goodsList.length <= 7">
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(0)' :rightGoods='getOneGoods(1)'></zutu1>
        </div>
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(2)' :rightGoods='getOneGoods(3)'></zutu1>
        </div>
      </div>

      <div class="content" v-if="goodsList.length >= 8">
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(0)' :rightGoods='getOneGoods(1)'></zutu1>
        </div>
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(2)' :rightGoods='getOneGoods(3)'></zutu1>
        </div>
      </div>

      <div class="content content2" v-if="goodsList.length >= 8">
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(4)' :rightGoods='getOneGoods(5)'></zutu1>
        </div>
        <div>
          <zutu1 desc="嘉福祥直营商品" title="官方直营" :leftGoods='getOneGoods(6)' :rightGoods='getOneGoods(7)'></zutu1>
        </div>
      </div>
    </div>
</template>

<script>
  import zutu1 from './zutu1.vue'
  import moFangTitle from './home/mo_fang_module/mo_fang_title.vue'
  export default {
    props: ['goodsList'],
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
  .content2{
    margin-top: 10px;
  }
</style>