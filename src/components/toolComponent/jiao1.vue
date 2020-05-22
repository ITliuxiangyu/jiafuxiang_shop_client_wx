<template>
  <div class="jiao_wrap">
    <span v-tap="{methods:wuliuFn}">查看物流</span>
    <span v-show="isHaveQueren" v-tap="{methods:querenFn}" class="gaoliang">确认收货</span>
  </div>
</template>



<script>
// import {Tab, TabItem, Swiper, SwiperItem, XHeader, Flexbox, FlexboxItem} from 'vux'
// import {getGoodsImg} from '../../components/utils/utils.js'
export default {
  props: ['isHaveQueren'],
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
    wuliuFn () {
      this.$emit('wuliuE')
    },
    querenFn () {
      this.$emit('querenE')
    }
  }
}
</script>

<style lang="less" scoped>
  .jiao_wrap{
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    border-top: 1px solid #d7d7d7;
    text-align: right;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .jiao_wrap span{
    border: 1px solid #acacac;
    border-radius: 99px;
    padding: 6px 5px;
    margin-left: 8px;
    position: relative;
  }
  .jiao_wrap .gaoliang{
    color: #fb3808;
    border: 1px solid #fb3808;
    margin-right: 15px;
  }
</style>