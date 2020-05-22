<template>
  <div class="tempCell_wrap">
    <div class="left">
      <div class="img_wrap">
        <img src="static/bottom/2.jpg" alt="">
      </div>
    </div>
    <div class="right">
      <p>就来看待尽量快撒地方讲课了大富科技了阿斯蒂芬了阿斯蒂芬讲课了asdf</p>
      <p>就离开静安寺的脸孔了的时间里爱上对方即可拉斯柯达积分考虑到房间里卡萨丁发了就阿斯蒂芬讲课了是打飞机了asd</p>
    </div>
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
  },
  methods: {
  }
}
</script>

<style scoped>
  .tempCell_wrap{
    display: flex;
  }
  .tempCell_wrap>div{
  }
  .tempCell_wrap>div:nth-child(1){
    flex: 1;
    /*background-color: black;*/
  }
  .tempCell_wrap>div:nth-child(2){
    margin-left: 10px;
    flex: 4;
    /*background-color: greenyellow;*/
  }
  .left .img_wrap{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }
  .left img{
    width: 100%;
  }
  .right>p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }
  .right>p:nth-child(1){
    color: black;
    font-size: 13px;
  }
  .right>p:nth-child(2){
    color: gray;
    font-size: 12px;
  }

</style>