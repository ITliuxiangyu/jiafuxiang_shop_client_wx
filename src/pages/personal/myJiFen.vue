<template>
  <div id="myJifen">
     <x-header title="我的积分" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 
       <div class="jiFen_top">
        <p>{{user_info.jifen}}</p>
        <divider>{{('我的积分') }}</divider>
        <div class="jifen_banner">
          <flexbox :gutter="0" align="center" justify="center">
            <flexbox-item v-for="(item , i) in headList" :key="i" @click.native="goHeader(i)">
                <div class="flex-demo1">
                <img width="25" :src="item.iconUrl" alt="">
                <p style="color:#666">{{item.title}}</p>
                </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="jifen_bottom">
          <div class="jifenReg">积分规则</div>
          <div style="text-align: left;font-size:12px">
            <div>1.首次登录奖励积分50分；</div> 
            <div>2.每天签到奖励积分5分，连续七天以上签到可获得10积分，连续签到30天送20积分。如果中端领取，又会从1积分开始；</div>
            <div>3.浏览、分享送积分20分/次（浏览奖励积分标准:1天3次  1次2分钟）；</div>
            <div> 4.积分可兑换现金或商品。200积分兑换一元现金。</div>
          </div>
        </div>
       </div>
        <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '80%', height: '30%', 'background-color': '#ffffff'}">
          <div class="jifenClass">
          可兑换 <span style="color:#E76855">{{this.jifnMoney}}</span>元现金
          </div>
          <div class="jifenBtn">
              <button @click="jifen_to_goods_btn">兑换商品</button>
              <button @click="jifen_to_money_btn">兑换现金</button>
          </div>
          
        </x-dialog>
    <alert v-model="tankuang" :title="('提示')" @on-show="onShow" @on-hide="onHide"> {{messages}}</alert>
    <!--<div v-transfer-dom>-->
      <confirm v-model="confirmShow"
        show-input
        ref="confirm5"
        title="积分兑换余额"
        :input-attrs="{type: 'number'}"
        @on-cancel="onCancel"
        @on-confirm="onConfirm5"
        @on-show="onShow5"
        @on-hide="onHide">
      </confirm>
    <!--</div>-->

  </div>
</template>

<script>
import {XHeader, InlineLoading, Flow, FlowState, FlowLine, Divider, Flexbox, FlexboxItem, XDialog, Alert, Confirm, TransferDomDirective as TransferDom} from 'vux'
import OrderPage from '../../components/toolComponent/myOrderPage.vue'
import evaluatePage from '../../components/toolComponent/myEvaluate'
import {homeUrl, myTools} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    XHeader,
    OrderPage,
    evaluatePage,
    InlineLoading,
    Flow,
    FlowState,
    FlowLine,
    Divider,
    Flexbox,
    FlexboxItem,
    XDialog,
    Alert,
    Confirm,
    TransferDom
  },
  data () {
    return {
      evalDatas: [],
      showDialogStyle: false,
      user_info: myTools().get_local_userinfo,
      tankuang: false,
      messages: '',
      jifnMoney: parseInt(parseInt(myTools().get_local_userinfo.jifen) / 200),
      confirmShow: false,
      headList: [
        {
          title: '赚取积分',
          routePath: 'redPackets',
          iconUrl: 'static/bottom/youhaodu@2x.png'
        },
        {
          title: '积分兑换',
          routePath: 'myHistory',
          iconUrl: 'static/bottom/zuji.png'
        }
      ]
    }
  },
  methods: {
    onConfirm5 () {
      var that = this
      var datas = qs.stringify({
        wxid: this.user_info.wxid,
        jifen: this.$refs.confirm5.msg
      })
      axios
        .post(homeUrl() + 'jifenToAccount/', datas, { emulateJSON: false })
        .then(
          result => {
            that.$vux.toast.text(result.data.message, 'bottom')
            if (result.data.status === 'ok') {
              var currentJifen = that.$refs.confirm5.msg - 0
              currentJifen = parseInt(currentJifen / 200)
              if (currentJifen === 0) {
              } else {
                var currentUser = JSON.parse(localStorage.getItem('personalInfo'))
                currentUser.acountmoney = currentUser.acountmoney - 0 + currentJifen
                that.$data.user_info.jifen = that.$data.user_info.jifen - 0 - currentJifen * 200
                that.$data.jifnMoney = parseInt(parseInt(that.$data.user_info.jifen) / 200)
                currentUser.jifen = currentUser.jifen - 0 - currentJifen * 200
                localStorage.setItem('personalInfo', JSON.stringify(currentUser))
              }
            }
          },
          error => {
            that.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    },
    onShow5 () {
      this.$refs.confirm5.setInputValue(200)
    },
    onShow () {
    },
    onHide () {
    },
    onCancel () {
    },
    // 跳转
    goHeader (index) {
      if (index === 0) {
        this.$router.push({ path: '/' })
      }
      if (index === 1) {
        // 可兑换 <span style='color:#E76855'>{{this.jifnMoney}}</span>元现金
        this.showDialogStyle = true
      }
    },
    jifen_to_goods_btn () {
      this.$router.push({path: 'jifenExchange'})
    },
    jifen_to_money_btn () {
      if (this.$data.user_info.jifen < 200) {
        this.tankuang = true
        this.messages = '对不起，您的积分不足200，不能兑换现金'
      } else {
        this.$data.confirmShow = true
      }
    }
  },
  created () {
  }
}
</script>

<style>
  .jiFen_top{
      text-align: center;
      height: 17rem;
      /* width: 100%; */
      background: linear-gradient(to right, #FBB34F, #E76855); /* 标准的语法（必须放在最后） */
      color: #ffffff;
      padding: 15px
  }
  .jiFen_top p:nth-child(1){
      font-size: 6rem;
      color: #ffffff;
      padding-top: 30px;
      
  }
  .jiFen_top p:nth-child(2){
  color: #ffffff
  }
  .jifen_banner{
      width: 100%;
      height: 70px;
      background: #ffffff;
      margin-top: 20px;
      border-radius: 3px;
      color: #666;
      text-align: center;
      font-size: 14px
  }
  .jifen_bottom{
      background: #ffffff;
      margin-top: 20px;
      /* height: 80%; */
      width: 95%;
      border-radius: 3px;
      color: #666;
      padding: 10px
      /* z-index:100; */
  }
  .jifen_bottom {}
  .jifen_banner .vux-flexbox{
      text-align: center;
  }
  .jifen_banner .flex-demo1{
  line-height: 30px;
  margin-top: 15px
  }
  .jifenReg{
    color: #E76855;
    /* line-height: 100px; */
  }
  .jifenClass{
    text-align: center;
    padding: 20px;
    line-height: 80px;
  }
  .jifenBtn button{
    background: #E76855;
    margin-right: 20px;
    color: #ffffff;
    padding: 5px;
    border: none
  }


</style>
