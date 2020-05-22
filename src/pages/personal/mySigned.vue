<template>
  <div id="mySigned">
     <x-header title="每日签到" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 
        <div class="signed_wrap">
               <img src="static/bottom/qiandaobtn.png" alt="" @click="todaySigned"> 
               <div style="margin-top:-50px">您已连续签到<span style="color:#ff3b3b">{{user_info.qiandaoDays}}</span>天</div>
               <p class="last_time">上次: {{user_info.qianDaoTime}}</p>
        </div>
        
        <div class="signedForm">
            <p>签到规则</p>
            <p>1.每天签到奖励积分5分;</p>
            <p>2.连续七天以上签到可获得10积分;</p>
            <p>3.连续签到30天送20积分。如果中断签到，又会从1积分开始</p>
        </div>
        <!-- 签到成功弹框 -->
          <div v-transfer-dom>
            <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '40%', 'background-color': 'transparent'}">
                <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
                <!-- <div class="lingqu" @click="go_ling">立即领取</div> -->
                <span>
                <img src="static/bottom/qdcg.png" style="max-width:60%">            
                </span>
                <br>
                <br>
                <!--<x-icon type="ios-close-outline" style="fill:#fff;">
                    <span class="vux-close"><img src="static/cart/i_ico_del.png" alt=""></span>
                </x-icon>-->
                </p>
            </x-dialog>
          </div>
            <alert v-model="tankuang" :title="('提示')" @on-show="onShow" @on-hide="onHide"> {{meaasge}}</alert>

  </div>
</template>

<script>
import {
  XHeader,
  InlineLoading,
  Flow,
  FlowState,
  FlowLine,
  XDialog,
  Alert,
  TransferDom
} from 'vux'
import OrderPage from '../../components/toolComponent/myOrderPage.vue'
import evaluatePage from '../../components/toolComponent/myEvaluate'
import {homeUrl, myTools} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    OrderPage,
    evaluatePage,
    InlineLoading,
    Flow,
    FlowState,
    FlowLine,
    XDialog,
    Alert
  },
  data () {
    return {
      evalDatas: [],
      showDialogStyle: false,
      wxOpenId: myTools().get_local_wxid,
      tankuang: false,
      meaasge: '',
      user_info: myTools().get_local_userinfo
    }
  },
  methods: {
    // 今日签到
    todaySigned () {
      var that = this
      var datas = qs.stringify({
        wxid: that.user_info.wxid
      })
      axios
        .post(homeUrl() + 'modifyUserQianDaoTime/', datas, {emulateJSON: false})
        .then(
          result => {
            this.$vux.toast.text(result.data.message, 'center')
            if (result.data.status === 'ok') {
              that.user_info.jifen = result.data.jifen
              that.user_info.qiandaoDays = result.data.days
              that.user_info.qianDaoTime = result.data.qiandao_time
              myTools().set_local_userinfo(that.user_info)
              this.showDialogStyle = true
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    },
    onHide () {
    },
    onShow () {
    }
  },
  created () {
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>

<style>
  #mySigned {
    /* width: 100%;
    height: 100%; */
    /* background: #ffffff; */
  }
  #mySigned .signed_wrap {
    height: 18.75rem;
    background: linear-gradient(
      to right,
      #60c3ec,
      #eed84c
    ); /* 标准的语法（必须放在最后） */
    text-align: center;
    margin-bottom: 10px
  }
  #mySigned .signed_wrap img {
    width: 260px;
    height: auto;
  }
  .signedsteap {
    background: #ffffff;
    margin-bottom: 10px;
  }
  .signedForm {
    padding: 20px 10px 20px 10px;
    background: #ffffff;
    /* height: 30%; */
  }
  .last_time{
    color: gray;
    font-size: 0.6em;
  }
</style>
