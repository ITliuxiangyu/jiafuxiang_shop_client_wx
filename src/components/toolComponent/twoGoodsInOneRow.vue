<template>
  <div class="two_goods_in_one_row_wrap">
    <div class="left">
      <img src="static/bottom/1.png" alt="">
      <div class="goods_name">
        哺乳衣套装尽快拉倒金坷垃几万哦女新材料款阿拉丁甲壳虫夏洛克技术点2018昆仑决阿萨德啊速度快
      </div>
      <div class="money">
        <p><span>￥45.0</span><span>220人已购买</span></p>
      </div>
    </div>
    <div class="right">
      <img src="static/bottom/2.jpg" alt="">
      <div class="goods_name">
        哺乳衣套装尽快拉倒金坷垃几万哦女新材料款阿拉丁甲壳虫夏洛克技术点2018昆仑决阿萨德啊速度快
      </div>
      <div class="money">
        <p><span>￥45.0</span><span>220人已购买</span></p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
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
  }
}
</script>

<style lang="less" scoped>
  .two_goods_in_one_row_wrap{
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 8px;
  }
  .two_goods_in_one_row_wrap>div{
    flex: 1;
    border-radius: 10px;
    background-color: white;
  }
  .left{
    margin-right: 6px;
  }
  .right{
    margin-left: 6px;
  }
  .two_goods_in_one_row_wrap>div>img{
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .goods_name{
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    padding-top: 10px; 

    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .money{
    padding: 15px 10px;
  }
  .money>p>span:nth-child(1){
    color: #fb3808;
    margin-right: 10px;
  }
  .money>p>span:nth-child(2){
    color:  #858585;
  }
</style>