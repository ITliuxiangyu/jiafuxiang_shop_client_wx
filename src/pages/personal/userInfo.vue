<template>
  <div>
    <x-header title="我的" style="position:fixed;left:0px;top:0px;z-index:1000;width:100%" :left-options="{showBack: false}" @on-click-more="show = false"></x-header> 
    <div class="imgBox">
      <img class="headImg" :src="userInfo.headimg" alt="">
      <span class="settingSpan">设置</span>
    </div>
    <!-- 我的订单 -->
    <div id="UserInfo">

      <!--资产-->
      <div class="_item" style="margin-top:;">
        <group-title class="_title">
          资产
        </group-title>
        <grid class="grids">
          <grid-item v-for="(item,i) in myZiChan" :key="i"  v-tap="{methods:myOrder , item:item}" style="">
            <img slot="icon" v-bind:src="item.iconUrl">
            <p>{{item.title}}</p>
          </grid-item>
        </grid>
      </div>

      <!--我的团队-->
      <div class="_item" style="margin-top:;">
        <group-title class="_title">
          我的团队
        </group-title>
        <grid class="grids">
          <grid-item v-for="(item,i) in myTeam" :key="i"  v-tap="{methods:myOrder , item:item}" style="">
            <img slot="icon" v-bind:src="item.iconUrl">
            <p>{{item.title}}</p>
          </grid-item>
        </grid>
      </div>

      <!--更多服务-->
      <div class="_item" style="margin-top:;">
        <group-title class="_title">
          更多服务
        </group-title>
        <grid class="grids">
          <grid-item v-for="(item,i) in myMoreService" :key="i"  v-tap="{methods:myOrder , item:item}" style="">
            <img slot="icon" v-bind:src="item.iconUrl">
            <p>{{item.title}}</p>
          </grid-item>
        </grid>
      </div>
      

      

      <!--<group >
        <cell style="background:#ffffff;" v-tap="{methods:goJifen}">
          <span slot="title" style=""><span style="vertical-align:middle;">积分商城</span></span>
        </cell>  
      </group>
  
      <div class="_item" style="">
        <grid class="grids" :cols="4">
          <grid-item v-for="(item,i) in myitems" :key="i"  v-tap="{methods:myEval , item:item}">
            <img slot="icon" v-bind:src="item.iconUrl">
            <p>{{item.title}}</p>
          </grid-item>
        </grid>
      </div>-->

    </div>
    <!-- 红包弹框 -->
     <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '40%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
          <div class="lingqu" v-tap="{methods:go_ling}">立即领取</div>
          <span>
          <img src="static/cart/hongbao.png" style="max-width:60%">            
          </span>
          <br>
          <br>

          <span class="vux-close"><img v-tap="{methods:close_red_bao}" src="static/cart/i_ico_del.png" alt=""></span>
        </p>
      </x-dialog>
    </div>
    </div>
</template>

<script>
import {
  Grid,
  Cell,
  Group,
  GridItem,
  GroupTitle,
  XHeader,
  XDialog,
  Flexbox,
  FlexboxItem,
  Badge,
  TransferDomDirective as TransferDom
} from 'vux'
import {homeUrl, myTools} from '../../components/utils/utils.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Grid,
    Cell,
    GridItem,
    GroupTitle,
    XHeader,
    XDialog,
    Flexbox,
    FlexboxItem,
    Group,
    Badge
  },
  methods: {
    // 关闭红包弹框的方法
    close_red_bao: function () {
      this.showDialogStyle = false
    },
    goHeader: function (params) {
      var item = params.item
      this.$router.push({path: item.routePath, params: {userInfo: this.userInfo}})
    },
    // 订单列表跳转界面
    myOrder (params) {
      if (params.item.title === '账户余额') {
        this.$vux.alert.show({
          title: '账户余额',
          content: this.userInfo.acountmoney
        })
      } else if (params.item.title === '抽奖余额') {
        this.$vux.alert.show({
          title: '抽奖余额',
          content: this.userInfo.rewardmoney
        })
      } else if (params.item.title === '我的二维码') {
        this.$router.push({
          name: params.item.routePath,
          params: {
            userInfos: this.userInfo
          }
        })
      } else if (params.item.title === '我的订单') {
        this.$router.push({name: 'my_order', params: {index: 0}})
      } else {
        var item = params.item
        this.$router.push({
          name: item.routePath,
          params: {
            index: item.index
          }
        })
      }
    },
    myEval (params) {
      var item = params.item
      if (item.title === '扫一扫') {
        // 扫一扫
        this.scanCode()
      } else {
        this.$router.push({
          name: item.routePath,
          params: {
            userInfos: this.userInfo
          }
        })
      }
    },
    // 二维码
    userCode (code) {
      return homeUrl() + code
    },
    // 我的二维码
    myCoders (userInfo) {
      this.$router.push({
        name: 'myCoder',
        params: {
          users: userInfo
        }
      })
    },
    // 积分商城
    goJifen (params) {
      this.$router.push({path: 'jifenExchange'})
    },
    // 扫一扫
    scanCode () {
      window.wx.scanQRCode({
        needResult: 1,
        scanType: [ 'qrCode', 'barCode' ],
        success: function (res) {
          alert(JSON.stringify(res))
        },
        fail: function (res) {
          alert(JSON.stringify(res))
        }
      })
    },
    // 用户第一次进来
    isFirstReg () {
      var isFirst = this.userInfo.is_first_register
      if (isFirst === true) {
        this.showDialogStyle = true
      }
    },
    // 领取红包
    go_ling () {
      this.showDialogStyle = false
      this.addJiFen()
      this.addRedPackets()
    },
    addJiFen () {
      var that = this
      myTools().my_post('addUserSomeNumber', {
        wxid: that.userInfo.wxid,
        optionName: JSON.stringify(['acountmoney', 'jifen']),
        optionNumber: '[50,50]'
      }, function (result) {
        if (result.data.status === 'ok') {
          that.userInfo = result.data.data
          myTools().set_local_userinfo(result.data.data)
        }
      }, function (error) {
        console.log(error)
      })
    },
    // 添加红包
    addRedPackets () {
      var that = this
      myTools().my_post('redpackAdd', {
        wxid: that.userInfo.wxid,
        getpath: '注册送红包',
        money: '50',
        title: '首次登录送红包',
        description: '用户首次登录送50元红包',
        starttime: '',
        endtime: this.getNowFormatDate(),
        detail: '用户首次登录送50元红包'
      }, function () {
      }, function (error) {
        console.log(error)
      })
    },
    // 获取日期
    getNowFormatDate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    goHui: function (item) {
      this.$router.push({path: item.routePath, params: { userInfo: this.userInfo }})
    }
  },
  created () {
    this.userInfo = myTools().get_local_userinfo
    console.log(this.userInfo)
    console.log(this.userInfo.headimg)
    if (this.userInfo === '' || this.userInfo === undefined || this.userInfo === null || this.userInfo === 'null') {
      localStorage.setItem('personalInfo', '')
      alert('获取用户信息失败,请关闭界面,重新进入')
    }
  },
  data () {
    return {
      userInfo: myTools().get_local_userinfo,
      showDialogStyle: false,
      headList: [
        {
          title: '红包',
          routePath: 'redPackets',
          iconUrl: 'static/bottom/youhaodu@2x.png'
        }, {
          title: '收藏',
          routePath: 'myCollection',
          iconUrl: 'static/bottom/shoucang1.png'
        }, {
          title: '足迹',
          routePath: 'myHistory',
          iconUrl: 'static/bottom/zuji.png'
        }
      ],
      myZiChan: [
        {
          title: '账户余额',
          routePath: 'my_order',
          iconUrl: 'static/bottom/daifu.png'
        },
        {
          title: '抽奖余额',
          routePath: 'my_order',
          iconUrl: 'static/bottom/daifa.png'
        },
        {
          title: '积分',
          routePath: 'myJiFen',
          iconUrl: 'static/bottom/积分.png'
        },
        {
          title: '红包',
          routePath: 'redPackets',
          iconUrl: 'static/bottom/youhaodu@2x.png'
        },
        {
          title: '钱包',
          routePath: 'qianbao',
          iconUrl: 'static/bottom/钱包.png'
        }
      ],
      myTeam: [
        {
          title: '我的团队',
          routePath: 'vip_manage',
          iconUrl: 'static/bottom/团队.png'
        },
        {
          title: '我的返利',
          routePath: 'backMoney',
          iconUrl: 'static/bottom/返利.png'
        },
        {
          title: '我的推荐',
          routePath: 'myRecommend',
          iconUrl: 'static/bottom/推荐.png'
        },
        {
          title: '我的二维码',
          routePath: 'myCoder',
          iconUrl: 'static/bottom/二维码.png'
        }
      ],
      myMoreService: [
        {
          title: '评价晒单',
          routePath: 'myeval',
          iconUrl: 'static/bottom/评价.png'
        },
        {
          title: '我的收藏',
          routePath: 'myCollection',
          iconUrl: 'static/bottom/zuji.png'
        },
        {
          title: '我的订单',
          routePath: 'liuyan',
          iconUrl: 'static/bottom/shoucang1.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .userIdiv{
    float: left;
    margin-top: 1rem;
    margin-left: 1.5rem;
  }
  .imgBox {
    width: 100%;
    height: 4rem;
    margin-top: 46px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    /* background: rgb(153, 51, 73); */
    background: linear-gradient(
      to right,
      rgb(241, 238, 231),
      rgb(236, 130, 174)
    ); /* 标准的语法（必须放在最后） */
    color: #ffffff;
    text-align: left;
  }
  .imgBox .headImg {
    width: 4rem;
    border-radius: .4em;
  }
  .imgBox .settingSpan{
    color: black;
    /*background-color: yellow;*/
    background-color: rgba(111, 111, 111, 0);
    float: right;
    margin-right: 1em;
    border: 1px solid black;
    font-size: .6em;
    padding: .1em;
    border-radius: .3em;
  }
  .usernameSpan{
    font-size: 18px;
    color: #333333
  }
  .userjifendiv{
    border-radius: 10px;
    /* width: 5rem; */
    text-align: center;
    display: block;
    background: gold;
    margin-left: 1rem;
    padding: 1px;
    float: left;
  }
  .userjifendiv span{
    display: inline-block;
    margin: 0px 0.5rem;
  }
  .userCoderImg{
    text-align: center;
    display: block;
    margin-left: 2rem;
    float: left;
    margin-top: -20px
  }
  .userCoderImg img{
  width: 50px;
  height: 50px;
  }
  .useracountmoneyDiv{
    float: left;

  }
  #UserInfo {
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 4.375rem;
  }
  #UserInfo ._title {
    color: #000000;
  }
  .images {
    width: 1.25rem;
    height: 1.125rem;
    vertical-align: middle;
    margin-right: 0.3125rem;
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #000000;
  }
  ._item {
    margin-top: 0.9375rem;
    background: #fff;
    border-radius: 5px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 0.75rem;
  }
  ._title {
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 12px;
    color: #333333;
    padding-top: 0.3125rem;
  }
  ._title p {
    float: right;
    font-size: 12px;
    color: #666666;
  }
  .grids {
    text-align: center;
    padding: 0 0.625rem;
  }
  .grids p {
    color: #666666;
    line-height: 1.875rem;
    margin-top: 0.625rem;
  }
  .weui-grid:before {
    border-right: 0px;
  }
  */ .weui-cell {
    padding: 5px 15px !important;
  }
  .weui-cells__title {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .weui-grid:before {
    border-right: 0px solid #ffffff !important;
  }
  .weui-grid:after {
    border-bottom: 0px solid #ffffff !important;
  }
  .weui-grids:after {
    border-left: 0px solid #ffffff !important;
  }
  .weui-grid{
    padding: .6em !important;
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .lingqu {
    position: absolute;
    color: #666;
    line-height: 25px;
    font-size: 12px;
    width: 80px;
    height: 1.875rem;
    background: #f5c82a;
    border-radius: 20px;
    left: 43%;
    top: 38%;
  }
  .flex-demo1 {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 1rem;
    color: #fff;
    background-clip: padding-box;
  }
  .flex-demo1 img {
    vertical-align: middle;
  }



</style>
