<template>
  <div>
     <x-header title="我的二维码" :right-options="{showMore: true}" @on-click-more="show = true"></x-header> 

    <div class="codeWrap">
      <div class="heads">
        <img :src="userInfo.headimg" alt="">
        <span>{{userInfo.nickName}}</span>
      </div>
      <div class="scode">
        <div>
          <img :src="userCode(userInfo.qrcode)"alt="">
        </div>

      </div>

      <p>{{xxx}}</p>
      
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import OrderPage from '../../components/toolComponent/myOrderPage.vue'
import {homeUrl} from '../../components/utils/utils.js'
//   import Top from '../components/layouts/top.vue'
//   import Bottom from '../components/layouts/bottom.vue'
export default {
  components: {XHeader, OrderPage},
  data () {
    return {
      userInfo: this.$route.params.userInfos,
      xxx: '开始'
    }
  },
  created () {
    // var that = this
    if (this.userInfo === undefined) {
      this.userInfo = JSON.parse(localStorage.getItem('myCode_userInfo'))
    } else {
      localStorage.setItem('myCode_userInfo', JSON.stringify(this.userInfo))
    }
  },
  methods: {
    onPress () {
    },
    onPressup () {
    },
    // 二维码
    userCode (code) {
      return homeUrl() + code
    }
  }
}
</script>

<style>
 .codeWrap{
   padding: 15px;
 }
 .heads img{
   width: 50px;
   height: 50px;
   border-radius: 50%
 }
 .scode{
   margin-top: 15px;
   border-top: 1px solid#cecaca;
   color: #666;
   font-size: 14px;
   padding-top: 10px;
   width: 80%;
   height: 0;
   padding-bottom: 80%;
   text-align: center;
   margin: 0 auto;
 }
 .scode>div{
   width: 100%;
 }
 .scode img{
   width: 100%;
 }
</style>
