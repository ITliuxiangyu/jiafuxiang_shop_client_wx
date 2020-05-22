<template>
  <div id="Home" >
    <div class="all_wrap">
      <!--<div><img style="width:100%;" src="../../static/home/矩形28.png" alt=""></div>-->
      <div class="tou">
        <div class="tou_left" v-tap='{methods:er_wei_ma_btn, item1:"er_wei_ma"}'>
          <img src="../../static/home/3.1-扫码@2x.png" alt="">
        </div>
        <div class="tou_zhong">
          <img src="../../static/home/3.1-扫码@2x.png" alt=""><span>嘉福祥</span>
        </div>
        <div class="tou_right" v-tap="{methods: goPage, luyou:'/personal/kefuMsg'}">
          <img src="../../static/home/3.1-消息@2x.png" alt="">
          <badge v-show="unreadNum != 0" class="my_badge" :text="unreadNum"></badge>
        </div>
      </div>


      <!--搜索区-->
      <div class="search_wrap">
        <form action="input-kw-form">
          <input type="search" v-model="value" class="input-kw" @focus="getFocus">
        </form>
      </div>

      <!--模块区-->
      <div class="mokuai_wrap">
        <div v-tap="{methods: goPage, luyou:'/personal/jifenExchange'}">
          <img src="../../static/home/积分商城.png" alt="">
          <br />
          <span>积分商城</span>
          <!--routePath: '/personal/jifenExchange'-->
        </div>
        <div v-tap="{methods: goPage, luyou:'/personal/myBuyHistory'}">
          <img src="../../static/home/购买记录.png" alt="">
          <br />
          <span>购买记录</span>
          <!--routePath: '/personal/myBuyHistory'-->
        </div>
        <div v-tap="{methods: goPage, luyou:'/personal/vip_manage'}">
          <img src="../../static/home/团队.png" alt="">
          <br />
          <span>团队</span>
          <!--routePath: '/personal/vip_manage'-->
        </div>
        <div v-tap="{methods: goPage, luyou:'/personal/mySigned'}">
          <img src="../../static/home/签到.png" alt="">
          <br />
          <span>签到</span>
          <!--routePath: '/personal/mySigned'-->
        </div>
      </div>

      <!--轮播区-->
      <div class="lunbo_wrap" v-if="demo06_list.length >= 1">
        <swiper :show-dots="false" :show-desc-mask="false" :interval="4000" :aspect-ratio="0.4" auto loop :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
      </div>

      

      <!--广告区-->
      <div class="guanggao_wrap" v-if="guanggao_arr.length >= 1">
        <swiper :list="guanggao_arr" :show-desc-mask="false" :show-dots="false" :aspect-ratio="0.24" auto loop></swiper>
      </div>
      

      <!-- 好货特卖 -->
      <div class="temai" v-if="secondkillshopone.length >= 2">
        <temai :goodsList="temaiList" :miaoshaList='secondkillshopone' :allSecondKill="allSecondKill">
        
        </temai>
      </div>
      <div v-else>
        <temai :goodsList="temaiList" :miaoshaList="[]" :allSecondKill='[]'>
        
        </temai>
      </div>

      <!-- 推荐品牌区 -->
      <div class="pinpai" v-if="pinpaiList.length > 1">
        <pinpai :goodsList="pinpaiList"></pinpai>
      </div>

      <!-- 嘉福祥官方直营 -->
      <div class="zhiying">
        <zhiying :goodsList="zhiyingList"></zhiying>
      </div>

      <!--商品列表-->
      <div class="shangpin_list">
        <shoplist-page :shoplistData="shoplistData"></shoplist-page>
      </div>
    </div>

    <div v-if="isSearch == false" style="">
    </div>
      
    <div v-else>
      <classify-page :classifyData="classifyData"></classify-page>
    </div>
    <alert v-model="tankuang" :title="('提示')">暂无数据</alert>

    

   

    
  </div>
  
</template>

<script>
  import {
    Scroller,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    Divider,
    Search,
    Checker,
    CheckerItem,
    Calendar,
    Badge,
    CellBox,
    XButton,
    Clocker,
    Swiper,
    Alert,
    Tab,
    TabItem
  } from 'vux'
  // import Swiper from 'vux/src/components/swiper/swiper'
  import searchPage from '../components/toolComponent/searchPage'
  import temai from '../components/toolComponent/temai'
  import pinpai from '../components/toolComponent/pinpai'
  import zhiying from '../components/toolComponent/zhiying'
  import {homeUrl, myTools, getGoodsImg} from '../components/utils/utils.js'
  import shoplistPage from '../components/toolComponent/shoplistPage'
  import classifyPage from '../components/toolComponent/classifyPage'
  export default {
    components: {
      Scroller,
      searchPage,
      SwiperItem,
      Swiper,
      Grid,
      GridItem,
      GroupTitle,
      Flexbox,
      FlexboxItem,
      Divider,
      Search,
      Checker,
      CheckerItem,
      XButton,
      shoplistPage,
      Calendar,
      Badge,
      CellBox,
      classifyPage,
      Clocker,
      Alert,
      temai,
      pinpai,
      zhiying,
      Tab,
      TabItem
    },
    data () {
      return {
        isGuding: false,
        percent: 0,
        demo06_list: [],
        guanggaoHeight: '80px',
        guanggao_arr: [],
        adList_index: 0,
        isSearch: false,
        daojiTime: '2018-01-01',
        value: '',
        demo06_index: 0,
        swiperItemIndex: 1,
        results: [],
        shoplistData: [],
        titleClassifyData: [],
        detailClassify: [],
        secondkillshopone: [],
        allSecondKill: [],
        demo6: [],
        tankuang: false,
        items: '',
        gudongHeight: 0,
        wx: '',
        classifyData: [
          {
            imgUrl: '../../static/bottom/团队.png',
            title: '团队',
            routePath: '/personal/vip_manage'
          },
          {
            imgUrl: '../../static/bottom/返利.png',
            title: '返利',
            routePath: '/personal/backMoney'
          },
          {
            imgUrl: '../../static/bottom/推荐.png',
            title: '推荐',
            routePath: '/personal/myRecommend'
          },
          {
            imgUrl: '../../static/bottom/zuji.png',
            title: '购买记录',
            routePath: '/personal/myBuyHistory'
          },
          {
            imgUrl: '../../static/bottom/chongzhi@2x.png',
            title: '积分商城',
            routePath: '/personal/jifenExchange'
          },
          {
            imgUrl: '../../static/bottom/地址.png',
            title: '收货地址',
            routePath: '/goods/goods_address'
          },
          {
            imgUrl: '../../static/bottom/youhaodu@2x.png',
            title: '签到',
            routePath: '/personal/mySigned'
          },
          {
            imgUrl: '../../static/bottom/tuijian@2x.png',
            title: '分享记录',
            routePath: '/personal/myShare'
          }
        ],
        new_gooods: [],
        temaiList: [],
        zhiyingList: [],
        pinpaiList: [],
        msgList: [],
        unreadNum: 0
      }
    },
    methods: {
      getUreadNum () {
        this.unreadNum = 0
        for (var i = 0; i < this.msgList.length; i++) {
          if (this.msgList[i].status - 0 === 1) {
            this.unreadNum++
          }
        }
      },
      getMsgList () {
        var that = this
        myTools().my_post('get_message_by_wxid', {
          wxid: myTools().get_local_wxid
        }, function (success) {
          that.msgList = success.data.data ? success.data.data : []
          that.getUreadNum()
          that.$vux.loading.hide()
        }, function (err) {
          console.log('获取用户聊天记录失败')
          console.log(err)
          that.$vux.loading.hide()
        })
      },
      goPage (canshu) {
        if (canshu.luyou === '/personal/kefuMsg') {
          this.$router.push({name: 'kefuMsg', params: {'msgList': this.msgList, 'unreadNum': this.unreadNum}})
        } else {
          this.$router.push({path: canshu.luyou, params: {'name': 'this.userInfo'}})
        }
      },
      // 左上角 二维码 点击事件
      er_wei_ma_btn (params) {
        window.wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: function (res) {
            alert(JSON.stringify(res))
          },
          fail: function (res) {
            alert(JSON.stringify(res))
          }
        })
      },
      onChange (val) {
      },
      // 关闭广告的方法
      close_guanggao_btn (params) {
        this.$data.guanggao_arr = []
      },
      urlList (imgObj) {
        return getGoodsImg(imgObj)
      },
      // 商品列表点击
      goGoodsDetail (params) {
        var goodsId = params.goodsid
        this.$router.push({
          name: 'goods_detail',
          params: {
            goodsId: goodsId
          }
        })
      },
      /*
      moreKill () {
        this.$router.push({
          name: 'secondKillList',
          params: {
            secondKillList: this.$data.allSecondKill
          }
        })
      },
      */
      goHeader: function (item) {
        this.$router.push({path: item.routePath, params: {userInfo: this.userInfo}})
      },
      // 分类点击
      classifyClick (classifyId, classifyName) {
        this.$router.push({ name: 'goSearch', params: {'classifyId': classifyId, 'classifyName': classifyName, 'is_auto_search': 'true'} })
      },
      getSanJiImg (images) {
        var shopImgs = homeUrl() + images
        return shopImgs
      },
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
      },
      onCancel () {
        this.$data.isSearch = false
      },
      // 秒杀
      miaokill () {
        var currentTime = myTools().getServerDate()
        for (var i = 0; i < this.allSecondKill.length; i++) {
          var item = this.allSecondKill[i]
          var start = new Date(Date.parse(item.startTime))
          var stop = new Date(Date.parse(item.stopTime))
          if (myTools().getStatusByTimes(currentTime, start, stop) === '进行中') {
            this.secondkillshopone.push(item)
          }
        }
        if (this.secondkillshopone.length > 0) {
          this.daojiTime = this.secondkillshopone[0].stopTime
        }
      },
      killShops (imgUrl) {
        return homeUrl() + 'static/myfile/' + imgUrl
      },
      secondDetail () {},
      onCellClick (clickIndex) {
        var allGroup = this.$refs.myGroup
        var toTop = 0
        for (var i = 0; i < clickIndex; i++) {
          toTop += allGroup[i].$el.getBoundingClientRect().height
        }
        this.$refs.rightScroller.reset({ top: toTop, duration: 1000 })
        this.$data.currentLeftIndex = clickIndex
      },
      onItemClick () {
      },
      demo06_onIndexChange (index) {
        this.demo06_index = index
      },
      // 搜索框获取焦点事件
      getFocus () {
        this.$router.push({ name: 'goSearch', params: {} })
      },
      // 获取分类
      classifyDataFn () {
        var that = this
        myTools().fenlei_list_fn(function (result) {
          that.$data.titleClassifyData = result.slice(0, 6)
          if (that.$data.titleClassifyData.length > 0) {
            that.onItemClicks(that.$data.titleClassifyData[0].id, '')
          }
          that.$vux.loading.hide()
        })
      },
      onItemClicks (itemid, itemName) {
        var that = this
        myTools().my_post('getAllFenleiByDafenleiId', {
          dafenleiId: itemid
        }, function (result) {
          if (result.data.status === 'ok') {
            if (result.data.data.length > 0) {
              that.$data.detailClassify = result.data.data[0].data
            } else {
              that.$data.detailClassify = []
            }
          }
        }, function (error) {
          this.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        })
      },
      getQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      get_detail_user_info (openid) {
        var that = this
        // 新来的测试
        // localStorage.getItem('openid')
        // var openid = 'oCBm3v5KVJKJ15MwYoMbEJsxCOdY'
        myTools().my_post('get_detail_user_info', {'openid': openid}, function (result) {
          if (result.data.status === 'ok') {
            myTools().remove_local_userinfo()
            localStorage.setItem('openid', openid)
            myTools().set_local_userinfo(result.data.data)
          } else {
            that.$vux.toast.text('用户信息获取失败,请关闭页面重新获取.', 'center')
            alert('获取用户信息状态失败')
            alert(JSON.stringify(result))
          }
        }, function (error) {
          alert('获取用户信息出错')
          alert(error)
        })
      },
      parseAdData (data) {
        for (var i = 0; i < data.length; i++) {
          var tempDic = {
          }
          if (data[i].position === '首页') {
            tempDic = {
              img: homeUrl() + data[i].imgPath,
              url: data[i].address,
              title: data[i].introduce
            }
            this.guanggao_arr.push(tempDic)
          } else if (data[i].position === '轮播图') {
            tempDic = {
              img: homeUrl() + data[i].imgPath,
              url: data[i].address,
              title: data[i].introduce
            }
            this.demo06_list.push(tempDic)
          }
        }
      },
      parseGoodsDate (data) {
        this.zhiyingList = []
        this.pinpaiList = []
        this.temaiList = []
        this.allSecondKill = []
        // 直营
        for (var i = 0; i < data.length; i++) {
          // 直营
          if (data[i].is_zhiying === 1) {
            this.zhiyingList.push(data[i])
          }
          // 精品
          if (data[i].is_jingpin === 1) {
            this.pinpaiList.push(data[i])
          }
          // 特卖
          if (data[i].is_temai === 1) {
            this.temaiList.push(data[i])
          }
          // 秒杀
          if (data[i].miaosha_info && data[i].miaosha_info !== '') {
            this.allSecondKill.push(data[i].miaosha_info)
          }
        }
        if (this.temaiList.length > 4) {
          this.temaiList = this.temaiList.slice(0, 4)
        }
        this.miaokill()
      },
      listenMsg () {
        var that = this
        window.addEventListener('home_page_event', function (event) {
          that.unreadNum++
          var message = event.detail.info
          that.msgList.push({
            'content': message.data,
            'receiveId': myTools().get_local_wxid,
            'senderId': myTools().socket_info.serverId,
            'status': 1,
            'time': myTools().date_format(new Date(), 'yyyy-MM-dd hh:mm:ss')
          })
        })
      }
    },
    mounted: function () {
    },
    created: function () {
      var that = this
      that.$vux.loading.show({
        text: 'loading...'
      })
      myTools().my_post('appHomePageData', {
      }, function (result) {
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.parseAdData(result.data.data.adData)
          that.shoplistData = result.data.data.goodsData
          that.parseGoodsDate(result.data.data.goodsData)
        } else {
          that.$vux.toast.text('网络请求失败....', 'bottom')
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        that.$vux.loading.hide()
        console.log(error)
      })
      that.$nextTick(function () {
        that.$('#Home').css({
          'margin-bottom': that.$('.weui-tabbar').outerHeight() + 'px',
          'overflow': 'scroll',
          'height': that.$(window).height() - that.$('.weui-tabbar').outerHeight() + 'px'
        })
      })
      this.getMsgList()
      this.listenMsg()
    },
    beforeDestroy: function () {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (from.name === 'kefuMsg' && to.name === 'home') {
          vm.$data.unreadNum = 0
        }
      })
    }
  }
</script>
<style scoped>
  
  #Home {
    margin-bottom: 60px;
  }
  #Home #myselfWrap{
    background: #ffffff;
    padding: 15px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .my_badge{
    position: absolute;
    top: -20%;
    right: -8%;
  }
  #Home #myselfWrap .flex-demo12 {
    text-align: center;
    margin-top: 0.6rem;
    color: #666;
    background-clip: padding-box;
  }
  #logoDiv {
    position: absolute;
    top: 0.9375rem;
    left: 0.9rem;
    z-index: 99999999;
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .fadeInUp {
    animation-name: fadeInUp;
  }
  /*.swiper-demo-img img {
    width: 100%;
  }*/
  .flex-demo {
    text-align: center;
    color: #fff;
    /* background-color: #20b907; */
    border-radius: 4px;
    background-clip: padding-box;
    height: 5rem;
    margin: 0.625rem;
  }
  .photos img {
    /* width: 70%; */
    height: 3.125rem;
    /* border-radius: 50% */
  }
  .titles {
    line-height: 1.875rem;
    font-size: 12px;
    color: #666;
  }
  .titles_span1 {
    color: #ed393d;
  }
  .titles_span2 {
    font-size: 0.9rem;
    text-decoration: line-through;
    /* position: absolute */
  }
  .wraps {
    width: 100%;
    background: #ffffff;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
  }
  /*.swiper-demo-img img {
    width: 100%;
  }*/
  .box1 {
    width: 100%;
    height: 11.375rem;
    overflow-x: scroll;
    /* 内容会被裁剪，会以滚动条显示 */
    overflow-y: hidden;
    /* 超出内容不可见 */
    white-space: nowrap;
    /* 不换行 */
    /* 文本不会换行，会在同一行上继续，直到遇到<br>为止 */
  }
  .secondKillMore {
    width: 10px;
    background: red;
    height: 8rem;
  }
  .hotGoods {
    display: inline-block;
    width: 7.25rem;
    text-align: center;
    /* background-color: #20b907; */
    border-radius: 4px;
    background-clip: padding-box;
    /* height: 10rem; */
    margin-top: 0.625rem;
    margin-right: 0.625rem;
  }
  .hot_photos img {
    width: 80%;
    height: 6.25rem;
  }
  .hot_wraps {
    width: 100%;
    margin-top: 0.625rem;
    padding: 0.6rem 0px;
    background: #ffffff;
  }
  .hot_wraps .hot_wraps_div {
    padding-left: 1.25rem;
  }
  .hot_wraps_div1 {
    padding-bottom: 0.5rem;
  }
  .hot_wraps_remen_span {
    font-size: 1.1rem;
    color: #000000;
  }
  .hot_wraps_ms_span {
    font-size: 1.3rem;
    color: gold;
  }
  .hot_wraps_ms_p {
    font-size: 0.75rem;
    line-height: 1.25rem;
  }
  .getyoudiv {
    float: right;
    font-size: 0.8rem;
    color: rgb(131, 131, 131);
    margin-right: 1rem;
    vertical-align: top;
  }
  .getyoudiv img {
    width: 0.5rem;
  }
  .newGoods {
    text-align: center;
    border-radius: 5px;
    background: #ffffff;
    background-clip: padding-box;
    padding: 0.3rem 0.3rem;
  }
  .news_recommend {
    width: 100%;
  }
  .new_photos img {
    width: 100%;
  }
  .good_tip {
    text-align: center;
    line-height: 30px;
    color: #ed393d;
    font-weight: 700;
  }
  .newTitles,
  .newInfo,
  .newPrices {
    text-align: left;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    /* font-size: 12px; */
    padding-left: 1rem;
    line-height: 21px;
  }
  .newInfo {
    color: #999999;
  }
  .newTitles {
    font-size: 13px;
  }
  .newPrices {
    color: #ed393d;
  }
  #sets {
    width: 100%;
    position: absolute;
    top: 0px;
    z-index: 1000000;
    /* left: 8%; */
    /* background: #000000 */
  }

  .tabBox1 {
    margin-top: 1rem;
    padding: 0.5rem 0rem;
    background: #ffffff;
    border-bottom: 1px solid rgba(231, 231, 231, 0.5);
  }
  .tabDiv1 {
    width: 20%;
    height: 2rem;
    float: left;
    background: #ffffff;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .tabDiv_li1 {
    background-color: #f4f8fb;
    color: #222;
    font-size: 14px;
    padding: 5px 10px;
    margin-right: 10px;
    line-height: 18px;
    text-align: center;
    border-radius: 15px;
  }
  .tabDiv_li1-selected {
    height: 2rem;
    display: inline-block;
    margin-left: 0.5rem;
    border-radius: 25px;
    text-align: center;
    line-height: 2rem;
    padding: 0px 1rem;
    background: #881b1b;
  }
  .tabDiv2 {
    width: 100%;
    height: 2rem;
    float: left;
    background: #ffffff;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .tabDiv_li {
    height: 2rem;
    display: inline-block;
    border-radius: 25px;
    text-align: center;
    line-height: 2rem;
    padding: 0px 1rem;
    margin-left: 1rem;
    background: #f4f8fb;
  }
  .tabBox2 {
    margin-bottom: 0rem;

    padding: 0.5rem 0.5rem;
    background: #ffffff;
  }
  .tabBox2 img {
    width: 100%;
    height: 180px;
    border-radius: 5px;
  }
  .tabBox3 {
    height: 8rem;
    width: 100%;
    background: #ffffff;
    /* padding: 0.5rem; */
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .tabBox3_imgdiv {
    width: 6rem;
    height: 6rem;
    margin-left: 1rem;
    display: inline-block;
    background: #ffffff;
  }
  .tabBox3_imgdiv img {
    width: 6rem;
    height: 6rem;
    border-radius: 5px;
  }
  .tabBox3_imgdiv p {
    text-align: center;
  }
  #shopsAd {
    position: fixed;
    bottom: 0px;
    height: 300px;
  }

  #shopsAd img {
    height: 100%;
  }

  .tabDiv_li-item {
    background-color: #f4f8fb;
    color: #222;
    font-size: 14px;
    padding: 5px 10px;
    margin-right: 10px;
    line-height: 18px;
    border-radius: 15px;
  }
  .tabDiv_li-item-selected {
    background-color: #ed393d;
    color: #fff;
  }
  .tabDiv_li-item-disabled {
    color: #999;
  }
  /*#shopsAd .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {
    height: 30px !important;
  }*/
  
  .jianbianDiv {
    height: 46px;
    background: rgb(131, 201, 191);
    /* display: flex; */
    /* padding: 6px; */
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1;
  }
  
  .mySearch_inputs {
    flex: 2;
    width: 100%;
  }
  .mySearch_inputs input {
    /* width: 100%;
    height: 35px;
    border: none;
    border-radius: 5px;
    background: #ffffff;
    border-radius: 20% */
  }
  .mySearch_cancel {
    width: 40px;
    text-align: center;
    /* background: red; */
    line-height: 35px;
  }
  .mySearch_cancel img {
    width: 18px;
  }
  .hot_search {
    height: 160px;
    background: #ffffff;
  }
  .search_hository {
    margin-top: 10px;
    background: #ffffff;
    height: 300px;
  }
  .mySearch_inputs input[type='search'] {
    border-radius: 30px;
    border: 1px solid #ebebeb;
    width: 98%;
    height: 30px;
    outline: none;
    text-align: center;
    background: rgba(255, 255, 255, 0.6);
    color: #666;
  }
  .mySearch_inputs input[type="search"]::-webkit-input-placeholder {
    text-align: center;
    color: #666;
  }
  .mySearch_inputs input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  .mySearch_inputs input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;

    position: relative;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #ebebeb;
  }

  .mySearch_inputs input[type="search"]::-webkit-search-cancel-button:after {
    position: absolute;
    content: "x";
    left: 25%;
    top: -12%;
    font-size: 20px;
    color: #666;
  }
  .second_left {
    width: 100%;
    height: 260px;
    background: #ffffff;
    border: 1px solid #f4f4f4;
  }
  .second_rightItem {
    height: 128px;
    background: #ffffff;
    border: 1px solid #f4f4f4;
    /* padding: 5px 5px */
    text-align: center;
  }
  .second_rightItem div:nth-child(1) img {
    width: 80px;
    height: 80px;
    margin-top: 5px;
  }
  .second_rightItem div:nth-child(2) {
    color: #ed393d;
    font-size: 10px;
  }
  .second_rightItem div:nth-child(3) {
    color: #666;
    font-size: 10px;
    text-decoration: line-through;
  }
  .secondTitles {
    color: #ed393d;
    padding-left: 10px;
    font-weight: 700;
    padding-top: 5px;
  }
  .killsecondTime {
    padding-left: 10px;
  }
  .killsecondTime span {
    display: inline-block;
    background: #666;
    color: #ffffff;
    border-radius: 10px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
  }
  .moresinfo {
    padding-left: 10px;
    padding-top: 5px;
  }
  .secondkillImg {
    text-align: center;
  }
  .secondkillImg img {
    width: 165px;
    height: 165px;
    margin-top: 5px;
  }
  .day {
    background-color: #000;
    color: #fff;
    text-align: center;
    display: inline-block;
    padding: 0 2px;
    border-radius: 3px;
    font-size: 12px;
  }
  .miaoshaTimes {
    padding-left: 5px;
  }





  /*.mySearch_heads {
    background: rgb(131, 201, 191); 
    display: flex;
    padding-top: 0.6rem;
    position: fixed;
    width: 100%;
    z-index: 999999999999999999;

    padding-left: 15px;
    padding-right: 15px;
  }*/
  /*.mySearch_lefts {
    text-align: center;
    background-color: #444;
    float: left;
  }*/
  /*.mySearch_lefts img {
    width: 20px;
  }
  .mySearch_rights{
    background-color: black;
    float: right;
  }
  .mySearch_rights img{
    width: 20px;
  }*/

  /*打包裹*/
  .all_wrap{
    padding-left: 15px;
    padding-right: 15px;
    background-image: url("../../static/home/矩形28.png");
    
    background-size: 100% 280px;
    background-repeat: no-repeat;
    background-color: white;
    background-attachment: fixed;
  }

  /* .all_wrap{
    padding-left: 15px;
    padding-right: 15px;
    background: linear-gradient(top,rgb(0 , 255 , 0) 10%,white 400px)
  } */

  /*头部*/
  .tou{
    display: flex;
    padding-top: 13px;
  }
  .tou_left{
    height: 100%;
    flex: 1;
  }
  .tou_zhong{
    height: 100%;
    flex: 2;
    text-align: center;
    color: white;
    font-size: 20px;
  }
  .tou_zhong img {
    width: 0px;
    height: 25px;
    vertical-align: middle;
  }
  .tou_right{
    position: relative;
    height: 100%;
    flex: 1;
    text-align: right;
  }
  .tou_left img,.tou_right img{
    width: 25px;
    height: 25px;
  }

  /*搜索框*/
  .search_wrap{
    /*padding-top: 24.5px;*/
  }
  .search_wrap input{
    /*background-color: white;*/
    width: 100%;
    height: 32.5px;
    border-radius: 999px;
    border: 0px;
  }

  /*模块区*/
  .mokuai_wrap{
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .mokuai_wrap div{
    flex: 1;
    height: 60px;
    text-align: center;
    color: white;
  }

  .mokuai_wrap div img{
    width: 30px;
    height: 30px;
    border-radius: 100px;
    font-size: 24px;
  }

  /*轮播区*/
  .lunbo_wrap{
    margin-top: 20px;
    height: 130px;
    border-radius: 10px;
    box-shadow: 0px 10px 8px #d9d9d9;
  }

  /*轮播和广告内图片圆角*/
  .lunbo_wrap .vux-slider, .lunbo_wrap .vux-swiper-item, .guanggao_wrap .vux-slider, .guanggao_wrap .vux-swiper-item{
    border-radius: 10px;
  }

  /*广告区域*/
  .guanggao_wrap{
    /*height: 100px;*/
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0px 10px 8px #d9d9d9;
  }

  /*精品区域*/
  .jingpin_wrap{
    margin-top: 10px;
  }
  .jingpin_wrap .row {
    display: flex;
    padding-top: 10px;
  }
  .jingpin_wrap .row .one_jingpin{
    text-align: center;
    color: rgba(51, 51, 51, 0.64);
    font-size: 12px;
  }
  .jingpin_wrap .row .one_jingpin img{
    width: 60px;
    height: 60px;
  }
  .jingpin_wrap .row .one_jingpin:nth-child(1){
    background-color: yellow;
    flex: 1;
  }
  .jingpin_wrap .row .one_jingpin:nth-child(2){
    background-color: red;
    flex: 1;
  }
  .jingpin_wrap .row .one_jingpin:nth-child(3){
    background-color: gray;
    flex: 1;
  }
  .jingpin_wrap .row .one_jingpin:nth-child(4){
    background-color: green;
    flex: 1;
  }

  /*好货特卖区域*/
  .temai{
    margin-top: 20px;
  }

  /*品牌区域*/
  .pinpai{
    margin-top: 20px;
  }

  /*直营区域*/
  .zhiying{
    margin-top: 20px;
  }

  /*商品列表*/
  .shangpin_list{
    margin-top: 20px;
  }

  .guding{
    color: red;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid blue;
  }
  .buguding{
    /*color: red;*/
    position: static;
    /*top: 0;
    left: 0;
    width: 100%;
    border: 1px solid blue;*/
  }

</style>
