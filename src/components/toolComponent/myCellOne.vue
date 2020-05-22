<template>
  <div class="wuliu_wrap">
    <!--图片  文字  图片-->
    <div>
      <img :src="left_img" alt="">
    </div>
    <div>
      <p>{{title1}}</p>
      <p>{{title2}}</p>
    </div>
    <div>
      <img :src="right_img" alt="">
    </div>
  </div>
</template>



<script>
// import {Tab, TabItem, Swiper, SwiperItem, XHeader, Flexbox, FlexboxItem} from 'vux'
export default {
  props: ['left_img', 'right_img', 'title1', 'title2'],
  components: {
  },
  data () {
    return {
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .wuliu_wrap{
    height: 50px;
    background-color: white;
    display: flex;
    padding: 10px 15px;
    border-bottom: 1px solid #d4d4d4;
  }
  .wuliu_wrap>div:nth-child(1){
    flex: 1;
  }
  .wuliu_wrap>div:nth-child(1) img{
    width: 40px;
    position: relative;
    top: 50%;
    transform: translate(0 , -50%);
  }
  .wuliu_wrap>div:nth-child(2){
    flex: 5;
  }
  .wuliu_wrap>div:nth-child(2) p{
    font-size: 8px;
    position: relative;
    top: 25%;
    transform: translate(0 , -25%);
  }
  .wuliu_wrap>div:nth-child(2) p:nth-child(1){
    color: #277c1c;
  }
  .wuliu_wrap>div:nth-child(2) p:nth-child(2){
    color: #767676;
  }
  .wuliu_wrap>div:nth-child(3){
    flex: 1;
  }
  .wuliu_wrap>div:nth-child(3) img{
    width: 20px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(0 , -50%);
    text-align: right;
  }
</style>