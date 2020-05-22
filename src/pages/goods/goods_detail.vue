<template>
  <div id="Home">
    <!--      分享按钮 -->
    <x-header title="slot:overwrite-title" style="background:#ffffff; position:fixed; width:100%; z-index:1000;" >
      <!--:right-options="{showMore: true}"-->
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab  v-model="index">
          <button-tab-item :selected="demo2 === item" v-for="(item, index) in lists"  :key="index" @on-item-click="consoleIndex(index)">{{item}}</button-tab-item>        
        </button-tab>
      </div>
      <span v-tap="{methods: backFn}" slot="right" type="navicon" size="35">我的</span>
    </x-header>
    <div class="wrapsDetail">
      <swiper :show-dots="false" :show-desc-mask="false" :aspect-ratio="1" loop auto :list="itemImgUrl" :index="itemImgIndex"></swiper>
      <div class="goods_wrap">
        <div class="isinMiaosha" v-if="ismiaosha">
          <div class="ismiaoFirst">￥{{goodsData.shop_price}} 
            <span id="texthua">￥{{goodsData.market_price}}</span>
          </div>
          <div class="ismiaoSecnd">
            <p class="huodongTime">距离结束还剩：</p>
            <clocker :time="daoji_time">
              <span class="day">%_D1</span>
              <span class="day">%_D2</span>天
              <span class="day">%_H1</span>
              <span class="day">%_H2</span>时
              <span class="day">%_M1</span>
              <span class="day">%_M2</span>分
              <span class="day">%_S1</span>
              <span class="day">%_S2</span>秒
            </clocker>
          </div>
        </div>
        <div class="goods_info">
          <div class="goods_left">
            <p>{{goodsData.goodsname}}</p>
            <p>{{goodsData.standard}}</p>
          </div>
        </div>
        <div class="good_price">
          <b v-show="ismiaosha==false && isJifen == false"><span id="price"><span style="color:#E64340">￥{{goodsData.market_price}}</span></span></b>
          <b v-show="isJifen == true"><span id="price"><span style="color:#E64340">{{goodsData.jifenprice}}积分</span></span></b>
          <span id="free">运费:{{goodsData.transportmoney}}</span>
          <div class="backMoney" style="border-radius:7.8px;">奖励{{goodsData.rebate}}</div>
          <br>
          <div class="allshops">
            <div class="shop—item">库存:{{goodsData.counts}}</div>
            <div class="shop-ping">0人评价</div>
            <div class="shop-person">{{goodsData.sellcount}}人已购</div>
          </div>
        </div>
      </div>
      <!-- 口味，规格 -->
      <div class="goods_format">
        <div class="chooseType" @click="chooseColor">规格<img src="static/cart/yjt@2x.png" alt=""></div>
        <div class="chooseType" @click="chooseType">参数<img src="static/cart/yjt@2x.png" alt=""> </div>
        
        <!-- 弹框 -->
        <!--规格 弹框-->
        <div v-transfer-dom>
          <popup style="border-radius:1em;" v-model="show13" position="bottom" max-height="85%">
            <div class="dialog-box">
              <div class="dialog-top" >
                <div class="dialog-img"><img :src="isUndefined(goodsData.lunbo)" alt=""></div>
                <div class="dialog-text"> 
                  <p><span id="color">{{goodsData.shopname}}</span>{{goodsData.goodsname}}</p>
                  <p class="day">{{goodsData.uptime}}</p>
                  <p v-show="isJifen == false" style="color:#cc0010">￥{{goodsData.shop_price}}</p>
                  <p v-show="isJifen == true"><span id="price"><span style="color:#E64340">{{goodsData.jifenprice}}积分</span></span></p>
                </div>
                <div class="dialog-close" @click="closePu">
                    <span id="vux-close"><img src="static/cart/closed.png" width="20" alt=""></span>      
                </div>
              </div>
              <!-- 口味 -->
              <div class="goods_format_ goods_format_111" v-for="(item , index) in guige" :key="index" :value="item">
                <p class="_format" >{{item.title}}</p>
                <div class="_checker">
                  <checker radio-required default-item-class="demo6-item" selected-item-class="demo6-item-selected">
                      <checker-item v-for="(minItem,index) in item.data" :key="index" :value="minItem">{{minItem}}</checker-item>
                  </checker>
                </div>
              </div>
              <!-- 购买数量 -->
              <div class="buyNum">
                
                <group >
                  <x-number title="购买数量" v-model="nums" button-style="round"></x-number>
                </group>
              </div>
              <!-- 底部 -->
              <div class="botsWrap" >
                <div class="bottom_">
                      <div class="addCart" v-tap="{methods:go_buy , type:'加入购物车'}">加入购物车</div>
                      <div class="buyIt" v-tap="{methods:go_buy , type:'立即购买'}">立即购买</div>
                </div>
              </div>
            </div>
          </popup>
        </div>

        <!--参数 弹框-->
        <div v-transfer-dom>
          <popup style="border-radius:1em;" v-model="show14" position="bottom" max-height="85%">
            <div class="dialog-box">
              <div class="dialog-top" >
                <div class="dialog-text" style="text-align:center;"> 
                  产品参数
                </div>
              </div>
              <!-- 参数 -->
              <div class="goods_format_" v-for="(item , index) in canshu" :key="index" :value="item">
                <div style="overflow:hidden; padding-top:0.7em;">
                  <div style="float:left; width:20%; color:#333; font-size:1.01em;">{{item.title}}</div>
                  <div style="float:right; width:66%; color:#999; font-size:0.9em;">
                    <span class="" v-for="(minItem,index) in item.data" :key="index" :value="minItem">{{minItem}}     </span>
                  </div>
                </div>
              </div>
                
              <!-- 底部 -->
              <div class="botsWrap" >
                <div class="bottom_">
                  <div style="border-radius:10px;" class="addCart" @click="canshuFinish">完成</div>
                </div>
              </div>
            </div>
          </popup>
        </div>
      </div>
      <alert v-model="tankuang" :title="('提示')"> 请先选择商品规格</alert>

      <div class="details" v-html="goodsDetail">

      </div>

      <evaluate-page :evalDatas="evalDatas"></evaluate-page>
      <divider>亲 , 到底部了</divider>
      <div class="foot_kong"></div>
        

    </div>
    <!-- 底部固定 -->
    <div class="bottom_bar">
      <div class="bottom_item" v-tap="{methods:myHistory}"><img src="static/bottom/hos.png" alt=""><p>浏览记录</p></div>
      <div class="bottom_item" v-tap="{methods:myFavourites}"><img :src="srcData" alt=""><p>收藏</p></div>
      
      <div class="bottom_item" @click="go_cart"><img src="static/bottom/car.png" alt=""><p>购物车</p></div>
      <div class="bottom_item" @click="chooseColor">加入购物车</div>
      <div class="bottom_item" @click="chooseColor">立即购买</div>
      <div class="badge">
      </div>
    </div>
    <!-- 浏览记录 -->
    <div v-transfer-dom>
      <popup v-model="show8" position="left" width="40%">
        <div class="position-horizontal-demo myView">
          <p>浏览记录</p>
          <div class="myViews" v-for="(item,index) in myViewData" :key="index" :value="index" @click="lookRecord(item.goods.goodsid)">
            <div><img :src="urlList(item.goods)" alt="" ></div>
            <div class="fonts">{{item.goods.goodsname}}</div>
            <div>￥{{item.goods.shop_price}}</div>
          </div>
          <span class="vux-close" @click="show8 == false"></span>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  Swiper,
  XNumber,
  Popup,
  XButton,
  SwiperItem,
  Group,
  ButtonTab,
  ButtonTabItem,
  Toast,
  XSwitch,
  XDialog,
  Grid,
  GridItem,
  GroupTitle,
  XHeader,
  Checker,
  CheckerItem,
  TransferDomDirective as TransferDom,
  Badge,
  Clocker,
  Alert,
  Divider,
  Confirm,
  XImg
} from 'vux'
import evaluatePage from '../../components/toolComponent/myEvaluate'
import {homeUrl, myTools, homeUrlMin, getGoodsImg} from '../../components/utils/utils.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    CheckerItem,
    XHeader,
    Checker,
    Toast,
    XDialog,
    XButton,
    Group,
    XNumber,
    Badge,
    Popup,
    XSwitch,
    ButtonTab,
    ButtonTabItem,
    evaluatePage,
    Clocker,
    Alert,
    Divider,
    Confirm,
    XImg
  },
  data () {
    return {
      isJifen: this.$route.params.isjifen,
      guige: [],
      canshu: [],
      daoji_time: '',
      demo6: 1,
      nums: 1,
      show: false,
      lists: ['商品', '详情', '评价'],
      demo2: '商品',
      index: 0,
      message: '',
      tankuang: false,
      show13: false,
      show14: false,
      show8: false,
      goodsId: this.$route.params.goodsId,
      goodsDetail: '',
      goodsData: {},
      evalDatas: [],
      itemImgUrl: [],
      itemImgIndex: 0,
      srcData: 'static/bottom/favorite.png',
      myViewData: [],
      ismiaosha: null,
      history_time: '',
      quxiao_sc_id: ''
    }
  },
  methods: {
    backFn () {
      this.$router.push({name: 'userInfo'})
    },
    compareTime (startTime, endTime) {
      var startTimes = startTime.substring(0, 10).split('-')
      var endTimes = endTime.substring(0, 10).split('-')
      startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19)
      endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19)
      var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000
      return thisResult
    },
    canshuFinish () {
      this.show14 = !this.show14
    },
    closePu () {
      this.show13 = !this.show13
    },
    // 收藏商品判断
    myFavourites (params) {
      if (this.srcData === 'static/cart/ysc.png') {
        this.delFav(this.quxiao_sc_id)
      } else {
        this.beginShou('favorite')
      }
    },
    // 开始收藏
    beginShou (type) {
      var that = this
      myTools().my_post('favoriteAndLookTableManageJsonAdd', {
        wxid: myTools().get_local_wxid,
        goodsid: this.goodsData.goodsid,
        tablename: type
      }, function (result) {
        if (result.data.status === 'ok' && type === 'favorite') {
          that.$data.srcData = 'static/cart/ysc.png'
          that.messShow = true
          that.message = '收藏成功'
          that.quxiao_sc_id = result.data.id
        } else if (result.data.status === 'ok' && type === 'lookhistory') {
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    // 图片是否为空
    isUndefined (datas) {
      if (datas === undefined || datas.length <= 0) {
        return
      }
      return homeUrl() + datas[0].image
    },
    // 取消收藏
    delFav (canceld) {
      var that = this
      var arr = canceld.split(',')
      myTools().my_post('cartstableManageJsonDelete', {
        ids: JSON.stringify(arr),
        tablename: 'favorite'
      }, function (result) {
        if (result.data.status === 'ok') {
          that.$vux.toast.text('取消收藏成功', 'bottom')
          that.srcData = 'static/bottom/favorite.png'
          that.quxiao_sc_id = ''
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    // 选择颜色
    chooseColor () {
      this.show13 = !this.show13
    },
    urlList (imgObj) {
      return getGoodsImg(imgObj)
    },
    // 浏览记录点击
    lookRecord (goodsids) {
      localStorage.setItem('goodsid', goodsids)
      window.location.reload()
    },
    // 产品参数
    chooseType () {
      this.show14 = !this.show14
    },
    // 加入购物车
    add_cart (parmamsArr) {
      var that = this
      var goods = parmamsArr[0]
      myTools().my_post('cartstableManageJsonAdd', {
        wxid: myTools().get_local_wxid,
        goodsid: goods.goodsid,
        goodsparams: JSON.stringify(goods.params),
        number: that.nums
      }, function (result) {
        if (result.data.status === 'ok') {
          that.$vux.toast.text(result.data.message, 'bottom')
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
      this.show13 = !this.show13
    },
    go_cart (params) {
      this.$router.push({name: 'cart', params: {}})
    },
    go_buy (params) {
      var parmamsObj = {}
      var parmamsArr = []
      var canshuArr = []
      var isAllSelect = true
      var noSelectType = ''
      var that = this
      that.$('.goods_format_111').each(function (index, item) {
        if (that.$(item).find('.demo6-item-selected').length > 0) {
          var tempDic = {}
          tempDic.name = that.$(item).find('p').text()
          tempDic.value = that.$(item).find('.demo6-item-selected').text()
          canshuArr.push(tempDic)
        } else {
          isAllSelect = false
          noSelectType = that.$(item).find('p').text()
        }
      })
      if (isAllSelect === false) {
        this.$vux.alert.show({
          title: '提示',
          content: '请选择' + noSelectType
        })
        return
      }
      parmamsObj.number = this.nums
      parmamsObj.params = canshuArr
      parmamsObj.goodsimage = homeUrl() + this.goodsData.product_thumb_image
      parmamsObj.shopname = this.goodsData.shopname
      parmamsObj.goodsprice = this.goodsData.shop_price
      parmamsObj.freightPrice = this.goodsData.transportmoney
      parmamsObj.freightRiskPrice = '0'
      parmamsObj.keywords = this.goodsData.keywords
      parmamsObj.goodsname = this.goodsData.goodsname
      parmamsObj.goodsid = this.goodsData.goodsid
      parmamsObj.jifenprice = this.goodsData.jifenprice
      parmamsObj.goods = {goods: this.goodsData}
      parmamsArr.push(parmamsObj)
      if (params.type === '立即购买') {
        this.$router.push({
          name: 'order_confirm',
          params: {
            goodsMonery: this.goodsData.shop_price * this.nums,
            comfirGoodsInfo: parmamsArr,
            isjifen: that.isJifen
          }
        })
      } else if (params.type === '加入购物车') {
        this.add_cart(parmamsArr)
      }
    },
    removeTimeInterval () {
      if (this.$data.history_time === '') {
      } else {
        clearTimeout(this.$data.history_time)
        this.$data.history_time = ''
      }
    },
    // 浏览记录添加
    myLookHository () {
      var that = this
      myTools().my_post('favoriteAndLookTableManageJsonAdd', {
        wxid: myTools().get_local_wxid,
        goodsid: this.goodsData.goodsid,
        tablename: 'lookhistory'
      }, function () {
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    // 浏览记录
    myHistory (params) {
      var that = this
      this.show8 = true
      myTools().my_post('favoriteAndLookTableManageJsonSelect', {
        wxid: myTools().get_local_wxid,
        tablename: 'lookhistory'
      }, function (result) {
        if (result.data.status === 'ok') {
          that.$data.myViewData = result.data.data
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    // 添加用户积分
    addUserJiFen (scores) {
      var that = this
      myTools().my_post('addUserSomeNumber', {
        wxid: myTools().get_local_wxid,
        optionName: JSON.stringify(['jifen']),
        optionNumber: scores
      }, function () {
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    consoleIndex (index) {
      var that = this
      if (index === 0) {
        that.$('.wrapsDetail').animate({
          scrollTop: 0
        }, 500)
      }
      if (index === 1) {
        that.$('.wrapsDetail').animate({
          scrollTop: that.$('.vux-slider').outerHeight() + that.$('.goods_wrap').outerHeight() + that.$('.goods_format').outerHeight()
        }, 500)
      }
      if (index === 2) {
        that.$('.wrapsDetail').animate({
          scrollTop: that.$('.vux-slider').outerHeight() + that.$('.details').outerHeight() + that.$('.goods_wrap').outerHeight() + that.$('.goods_format').outerHeight()
        }, 500)
      }
    },
    parseGoodsDetail () {
      if (this.goodsData.isinmiaosha === 'true') {
        var currentTime = myTools().date_format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        if (this.compareTime(currentTime, this.goodsData.miaosha_info.stoptime) > 0) {
          this.ismiaosha = true
          this.daoji_time = this.goodsData.miaosha_info.stoptime
        }
      }
      this.guige = this.createGuigeJson(this.goodsData.goodsparams1)
      this.canshu = this.createGuigeJson(this.goodsData.goodsparams2)
      this.goodsDetail = myTools().replaceAllStr(decodeURIComponent(this.goodsData.details), 'www.dangsh.top', this.myDomain)
      var swiperImg = this.goodsData.lunbo
      const swiperItem = swiperImg.map((item, index) => ({
        url: '',
        img: homeUrlMin() + item.image
      }))
      this.itemImgUrl = swiperItem
    },
    parseShouchangList (result) {
      for (var i = 0; i < result.data.data.shoucang_list.length; i++) {
        if (result.data.data.shoucang_list[i].goods.goodsid === this.goodsId) {
          this.srcData = 'static/cart/ysc.png'
          this.quxiao_sc_id = result.data.data.shoucang_list[i].id
        }
      }
    },
    // 商品详情
    requestDetail () {
      var that = this
      if (this.goodsId === undefined) {
        this.goodsId = localStorage.getItem('goodsid')
      } else {
        localStorage.setItem('goodsid', this.goodsId)
      }
      myTools().my_post('goodsSelectByidNew', {
        goodsid: this.goodsId,
        wxid: myTools().get_local_wxid,
        tablename: 'lookhistory'
      }, function (result) {
        if (result.data.status === 'ok') {
          that.goodsData = result.data.data.goods
          that.parseGoodsDetail()
          that.parseShouchangList(result)
          that.evalDatas = result.data.data.pinglun_list
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    // 添加分享记录
    addShareData (type) {
      var that = this
      myTools().my_post('addShare', {
        goodsid: this.goodsId,
        wxid: myTools().get_local_wxid,
        sharepath: type
      }, function (result) {
        if (result.data.status === 'ok') {
          alert('微信好友分享成功，并赠送您20积分')
        }
      }, function (error) {
        that.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    },
    createGuigeJson (guige) {
      var guigeArr = []
      var bigArr = []
      if (guige !== null) {
        bigArr = guige.split('/')
      }
      for (var i = 0; i < bigArr.length; i++) {
        var tempDic = {}
        var minTitle = bigArr[i].split(':')[0]
        var minArr = bigArr[i].split(':')[1] === undefined ? [] : bigArr[i].split(':')[1].split(',')
        if (minTitle !== '' && minArr.length > 0) {
          tempDic.title = minTitle
          tempDic.data = minArr
          guigeArr.push(tempDic)
        }
      }
      return guigeArr
    }
  },
  created () {
    var that = this
    this.goodsId = this.$route.params.goodsId
    if (this.$route.params.isjifen === true) {
      this.isJifen = true
    } else {
      this.isJifen = false
    }
    this.srcData = 'static/bottom/favorite.png'
    // 商品详情 收藏 评论
    this.requestDetail()
    // 浏览记录定时器
    this.$data.history_time = setTimeout(() => {
      that.myLookHository()
      that.addUserJiFen('100')
      that.removeTimeInterval()
    }, 120000)
    this.$nextTick(function () {
      // 视频滚动区域高度
      that.$('.wrapsDetail').css({
        overflow: 'scroll',
        top: that.$('.vux-header').outerHeight() + 'px',
        height: document.documentElement.clientHeight - that.$('.vux-header').outerHeight() - that.$('.bottom_bar').outerHeight() + 'px'
      })
    })
  },
  deactivate: function () {
    this.$destroy()
  },
  beforeDestroy: function () {
    if (this.$data.history_time === '') {
    } else {
      clearTimeout(this.$data.history_time)
      this.$data.history_time = ''
    }
  }
}
</script>
<style>
  .details {
    margin-top: 10px;
    background: #ffffff;
  }
  .details p {
    font-size: 12px;
    line-height: 20px;
    padding: 20px;
  }
  .details img {
    width: 100%;
  }
  .dialog-box {
    background: #ffffff;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
  .dialog-top {
    display: flex;
    padding-bottom: 1em;
    width: 100%;
    padding-top: 0.9375rem;
    border-bottom: 1px solid #ebebeb;
  }
  .bottom_ {
    bottom: 0;
    height: 2.875rem;
    line-height: 2.875rem;
    display: flex;
  }


  .addCart {
    flex: 1;
    background: #ffbf01;
    color: #ffffff;
    text-align: center;
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
    height: 2.4em;
    line-height: 2.4em;
    font-size:0.9em;
  }
  .buyIt {
    flex: 1;
    background: #ff6a00;
    color: #fff;
    text-align: center;
    border-top-right-radius:10px;
    border-bottom-right-radius:10px;
    height: 2.4em;
    line-height: 2.4em;
    font-size:0.9em;
  }
  .circle {
    position: absolute;
    top: 0.3125rem;
  }
  .dialog-img img {
    width: 5.9375rem;
    height: 5.9375rem;
  }
  .dialog-img {
    width: 7.5rem;
  }
  .dialog-text {
    flex: 1;
    text-align: left;
    line-height: 25px;
  }
  .dialog-close {
    float: right;
    width: 3.125rem;
  }
  .dialog-close span {
    font-size: 1.25rem;
  }
  #color {
    color: #cc0010;
    margin-right: 0.3125rem;
  }
  .buyNum {
    display: flex;
    border-bottom: 1px solid #ebebeb;
  }
  .allshops {
    display: flex;
  }
  .shop—item {
    flex: 1;
  }
  .shop-ping {
    flex: 1;
    text-align: center;
  }
  .shop-person {
    flex: 1;
    text-align: right;
  }
  .buyNum .num {
    width: 100px;
    margin-top: 10px;
    line-height: 1.875rem;
  }
  .backMoney {
    height: 1.25rem;
    background: #ed393d;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    line-height: 1.25rem;
    padding-left: 6px;
    padding-right: 6px;
  }
  .buyNum .xnum {
    flex: 1;
    margin-top: -15px;
  }
  .bottom_ {
    display: flex;
    margin-top: 0.9375rem;
  }
  .carts {
    width: 6.25rem;
    height: 2.5625rem;
    margin-right: 0.625rem;
  }
  .carts button {
    background: #ebebeb;
  }
  .carts img {
    width: 1.9375rem;
    height: 1.5625rem;
    padding-top: 0.3125rem;
  }
  .accounts {
    flex: 1;
    color: #ffffff !important;
  }
  .accounts button {
    background: #333333;
    color: #ffffff !important;
    height: 2.625rem;
  }
  .go_buy {
    width: 100%;
  }
  .go_buy button {
    width: 100%;
    background: #cc0010;
    color: #ffffff;
    font-size: 14px;
  }
  .goods_format_ {
    border-bottom: 1px solid #ebebeb;
    text-align: left;
    padding-bottom: 0.625rem;
  }
  .goods_format_ ._format {
    line-height: 1.875rem;
    width: 95%;
    padding-left: 15px;
    margin-top: 0.3125rem;
  }
  .wrapsDetail{
    position: relative;
    -webkit-transition: all 2s;
    -moz-transition: all 2s;
    transition: all 2s;
  }
  .day {
    color: #666666;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .fadeInUp {
    animation-name: fadeInUp;
  }
  .swiper-demo-img img {
    width: 16px;
  }
  .goods_right img {
    height: 16px;
  }
  .goods_wrap {
    width: 100%;
    background: #ffffff;
    margin-bottom: 10px;
  }
  .goods_info {
    display: flex;
    width: 95%;
    padding-left: 0.5rem;
  }
  .goods_left {
    flex: 1;
    line-height: 20px;
  }
  .goods_left p:nth-child(2) {
    color: #666666;
  }
  .goods_right {
    width: 50px;
    text-align: center;
  }
  .goods_right p {
    color: #553737;
  }
  .good_price {
    width: 95%;
    padding-left: 0.5rem;
    margin-top: 0.5rem;
  }
  #free {
    float: right;
    color: #666666;
  }
  .goods_format {
    width: 100%;
    background: #ffffff;
    margin-bottom: 10px;
  }
  .chooseType {
    padding: 0.625rem;
    font-size: 12px;
    border-bottom: 1px solid #ebebeb;
  }
  .chooseType img {
    width: 0.625rem;
    float: right;
    margin-top: 2px;
    vertical-align: middle;
  }
  #xiaImg {
    height: 0.625rem;
    width: 1.25rem;
    margin-top: 4px;
    float: right;
    vertical-align: middle;
  }
  ._format {
    line-height: 35px;
    width: 95%;
    padding-left: 15px;
    margin-top: 10px;
  }
  ._checker {
    width: 95%;
    padding-left: 10px;
  }
  .demo6-item {
    padding: 0 1em;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 15px;
    margin-top: 10px;
  }
  .demo6-item-selected {
    background: #ffffff url(../../../src/assets/demo/active.png) no-repeat right
      bottom;
    border-color: #ff4a00 !important;
  }
  .format_info {
    background: #ffffff;
    margin-bottom: 10px;
  }
  .guige {
    line-height: 40px;
    width: 95%;
    padding-left: 15px;
    margin-top: 10px;
  }
  .format_more {
    margin-top: 10px;
    display: flex;
  }
  .guigename {
    flex: 1;
    text-align: left;
  }
  .guiges {
    flex: 3;
  }
  .p_p {
    color: #999999;
  }
  .pp_name {
    margin-left: 40px;
    color: #666666;
  }
  .bottom_bar {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
    display: flex;
    background: #ffffff;
  }
  .badge {
    position: absolute;
    left: 37%;
  }
  .bottom_item:nth-child(1) {
    flex: 1;
    text-align: center;
    padding-top: 0.2rem;
  }
  .bottom_item:nth-child(1) img {
    width: 24px;
    height: 22px;
  }
  .bottom_item:nth-child(2) img {
    width: 24px;
    padding-top: 0.2rem;
    height: 22px;
  }
  .bottom_item:nth-child(2) {
    flex: 1;
    text-align: center;
  }
  .bottom_item:nth-child(3) img {
    width: 24px;
    padding-top: 0.2rem;
    height: 22px;
  }
  .bottom_item:nth-child(3) {
    flex: 1;
    text-align: center;
  }

  .bottom_item:nth-child(4) {
    flex: 2;
    background: rgb(237, 204, 57);
    color: #ffffff;
    text-align: center;
    line-height: 50px;
  }
  .bottom_item:nth-child(5) {
    flex: 2;
    background: #ed393d;
    color: #ffffff;
    text-align: center;
    line-height: 50px;
  }
  .weui-cells:before {
    border-top: 0px !important;
  }
  .weui-cells:after {
    border-bottom: 0px !important;
  }
  .myView {
    padding-left: 20px;
    background: #ffffff;
  }
  .myViews {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
  }
  .myView p {
    text-align: center;
    line-height: 30px;
    margin-bottom: 10px;
    color: #cccccc;
  }
  .myView img {
    width: 110px;
    height: 110px;
  }
  .myView .fonts {
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    line-height: 30px;
    color: #666;
  }
  #vux-close {
    float: right;
  }
  .overwrite-title-demo {
    margin-top: 0.4rem;
  }
  .isinMiaosha{
    height: 50px;
    display: flex;
    color: #ffffff;
    }
  .ismiaoFirst{
    flex: 2;
    background: #F32C78;
    font-size: 16px;
    padding-left: 20px;
    line-height: 50px;
    
  }
  .ismiaoFirst #texthua{
    text-decoration: line-through
  }
  .ismiaoSecnd{
    flex: 3;
    background: #FDEAE8;
    text-align: center;
    font-size: 10px;
    color:#666
  }
  .ismiaoSecnd .huodongTime{
    color: #F32C78;
    font-size: 10px
    
  }
  .ismiaoSecnd .day {
    background-color:#F32C78;
    color:#fff;
    text-align:center;
    display:inline-block;
    padding:0 2px;
    border-radius:3px;
  }
</style>
