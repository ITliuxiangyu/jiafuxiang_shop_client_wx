<template>
    <!-- 图文列表 -->
    <div class="tou_wrap">
        <div class="tou_content">
          <div class="tou_item tou_left">
            <img src="static/detail/图层4@2x.png" alt="">
          </div>
          <div class="tou_item tou_center">
            <div>商品</div>
            <div>评价</div>
            <div>详情</div>
          </div>
          <div class="tou_item tou_right">
            <img src="static/detail/图层5@2x.png" alt="">
          </div>
        </div>
    </div>
</template>

<script>

export default {
  props: ['list'],
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>


  .tou_wrap{
    padding-top: 25px;
  }

  .tou_content .tou_item img{
    width: 20px;
    height: 20px;
  }
  .tou_content{
    display: flex;
  }

  .tou_left{
    flex: 1;
    text-align: left;
    vertical-align: middle;
  }
  .tou_center{
    flex: 6;
    text-align: center;
    display: flex;
  }
  .tou_center>div{
    flex: 1;
    font-size: 15px;
  }
  .tou_right{
    flex: 1;
  }

  .tou_center input{
    width: 100%;
    border-radius: 99px;
  }
  .tou_left , .tou_right{
    position: relative;
  }
  .tou_left img{
    position: absolute;
    top: 50%;
    transform: translate(0 , -50%);
  }
  .tou_right img{
    position: absolute;
    top: 50%;
    transform: translate(0% , -50%);
  }

</style>