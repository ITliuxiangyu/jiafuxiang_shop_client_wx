<template>
    <!-- 图文列表 -->
    <div class="tou_wrap">
        <div class="tou_content">
          <div class="tou_item tou_left" @click="cancelbackBtns">
            <img src="static/tou/图层1@2x.png" alt="">
          </div>
          <div class="tou_item tou_center">
            <input type="search" v-model="value" v-on:input="changes">
            <!--<x-icon v-tap="{methods:search_fn}" type="ios-mic" class="icon-red"></x-icon>-->
          </div>
          <div class="tou_item tou_right">
            <img src="static/tou/图层2@2x.png" alt="">
          </div>
        </div>
    </div>
</template>

<script>
import {myTools} from '../utils/utils.js'
export default {
  data () {
    return {
      value: '',
      currentPostData: {title: '宝贝', value: 'goodsname'},
      isRequest: false,
      search_time: ''
    }
  },
  methods: {
    changes () {
      var that = this
      if (this.search_time !== '') {
        clearTimeout(this.search_time)
      }
      this.search_time = setTimeout(function () {
        that.search_fn()
      }, 1000)
    },
    search_fn () {
      var that = this
      if (this.value === '' || this.value === undefined) {
        return
      }
      this.$vux.loading.show({
        text: 'loading'
      })
      var currUrl = 'getGoodsBySomething/'
      if (that.$data.currentPostData.value === 'goodsname') {
        currUrl = 'getGoodsListByQueryString/'
      }
      currUrl = 'getGoodsListByQueryString/'
      myTools().my_post(currUrl, {
        queryStr: this.value,
        fieldName: that.$data.currentPostData.value
      }, function (result) {
        that.$vux.toast.text('网络请求成功....', 'bottom')
        that.$vux.loading.hide()
        that.$emit('onSearchResult', result)
      }, function () {
        that.$vux.loading.hide()
        that.$vux.toast.text('网络请求失败....', 'bottom')
      })
    },
    cancelbackBtns () {
      this.$router.go(-1)
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
    left: 100%;
    top: 50%;
    transform: translate(-100% , -50%);
  }

</style>