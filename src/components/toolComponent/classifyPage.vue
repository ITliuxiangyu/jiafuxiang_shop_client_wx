<template>
    <div class=''>
        <x-header title="分类商品" style="position:fixed;top:0px;z-index:1000;width:100%" :left-options="{showBack:true}" @on-click-more="show = false">
          </x-header> 

          <div style="margin-top:0">
               <card>
                  <div slot="content" class="card-demo-flex card-demo-content01">
                      <div @click="cardCLick" class="vux-1px-l vux-1px-r">
                      综合
                      </div>
                      <div @click="cardCLick" class="vux-1px-r">
                      销量<icon type="download"></icon>
                      </div>
                      <div @click="cardCLickPrice" class="vux-1px-r">
                      价格<icon type="download"></icon>
                      </div>
                      <div @click="cardCLick">
                      筛选
                      <img id="imgShaixun" src="static/cart/shaixuan.png" width="20" alt="">
                      </div>
                  </div>
              </card>
          </div>
       

        <!-- 图文列表 -->
        <shop-list v-show="changesIcon==true" :shopList="shopList"></shop-list>
        <shoplist-page v-show="changesIcon==false" :shoplistData="shoplistData"></shoplist-page>
        <!-- 右侧抽屉弹出层 -->
        <div v-transfer-dom>
            <popup class="firstRightModel" v-model="isPopRight" position="right">
                <div style="width:330px; ">
                    <div class="serviceAddredd">
                        <!-- 位置 服务 -->
                        <card>
                            <div slot="content" class="card-demo-flex card-demo-content01">
                                <div class="">
                                <span style="color:black;">嘉福祥服务</span>
                                </div>
                                <div class="vux-1px-r">
                                <!-- <map-marker-icon /><span>河南省郑州市中原区</span> -->
                                </div>
                            </div>
                        </card>
                        <!-- 多选按钮 -->
                        <div class="myBtns">

                            <div class="myBtnsRow">
                                <x-button mini>submit</x-button>
                                <x-button mini>submit</x-button>
                                <x-button mini>submit</x-button>
                            </div>
                            <div class="myBtnsRow">
                                <x-button mini>submit</x-button>
                                <x-button mini>submit</x-button>
                                <x-button mini>submit</x-button>
                            </div>
                        </div>

                        <!-- 价格区间 -->
                        <div class="priceArea">
                            <div class="priceTitle">
                                价格区间
                                <div class="priceNumber">
                                    <input type="text" placeholder="最低价"> 一 <input type="text" placeholder="最高价">
                                </div>
                            </div>
                        </div>

                        <!-- 全部分类 -->
                        <group>
                            <cell @click.native="showFenleiModel" title="全部分类" :value="selectClassifyCellData" is-link></cell>
                        </group>
                        
                        <!-- 品牌 -->
                        <group>
                            <cell title="品牌" value="全部" is-link></cell>
                        </group>

                        <!-- 类型 -->
                        <group>
                            <cell title="类型" value="全部" is-link></cell>
                        </group>

                        <!-- 重置 确定按钮 -->
                        <div class="resetAndConfirmWrap">
                            <flexbox>
                                <flexbox-item>
                                    <x-button @click.native="modelResetClick" type="warn">重置</x-button>
                                </flexbox-item>
                                <flexbox-item>
                                    <x-button @click.native="modelConfirmClick" type="primary">确定</x-button>
                                </flexbox-item>
                            </flexbox>
                        </div>
                        
                    </div>
                </div>
            </popup>
        </div>

        <!-- 右侧抽屉model层上全部分类弹出层 -->
        <div v-transfer-dom>
            <popup style="background:white;" v-model="isFenleiPop" position="right">
                <div style="width:330px; ">
                    <sticky>
                        <x-header :left-options="{backText: '',preventGoBack: true }" @on-click-back="hideFenleiModel">全部分类</x-header>
                    </sticky>
                    
                    <group class="zhedie">
                        <template v-for="(item , i) in allClassifyCellData">
                            <cell 
                            :key="i"
                            :title="item.name"
                            is-link
                            :border-intent="false"
                            :arrow-direction="item.isZhankai ? 'up':'down'"
                            @click.native="allClassifyCellClick(i)">
                            </cell>
                            <div v-for="(minItem , i) in item.data" class="slide" :class='item.isZhankai?"animate":""'>
                                <p>{{minItem.name}}</p>
                            </div>
                        </template> 

                    </group>
                </div>
            </popup>
        </div>

<ul class="search_result" v-show="hiddens" >
          <li v-for="(item, i) in searchTitle" :key="i" @click="resultClicks(item)">{{item}}</li>
      </ul>
       <alert v-model="showAlert" :title="('提示')"> {{ ('暂无数据') }}</alert>
    </div>
    <!-- </div> -->
    
  
</template>


<script>
import {
  Card,
  Icon,
  Popup,
  XButton,
  Group,
  Cell,
  Flexbox,
  FlexboxItem,
  TransferDom,
  Sticky,
  XHeader,
  Checker,
  CheckerItem,
  Alert
} from 'vux'
import ShopList from './shopList.vue'
import shoplistPage from './shoplistPage'

// import MapMarkerIcon from 'vue-material-design-icons/map-marker.vue'

// import $ from 'jquery'
import { homeUrl } from '../utils/utils.js'
import axios from 'axios'
import qs from 'qs'
// 全部分类中折叠cell的数据
const allClassifyCellDataFn = () => [
  {
    name: '办公分类',
    isZhankai: false,
    data: [
      {
        name: '收银机'
      },
      {
        name: '考勤机'
      },
      {
        name: '碎纸机'
      }
    ]
  },
  {
    name: '文具/耗材',
    isZhankai: false,
    data: [
      {
        name: '铅笔'
      },
      {
        name: '课本'
      },
      {
        name: '橡皮擦'
      }
    ]
  },
  {
    name: '外设产品',
    isZhankai: false,
    data: [
      {
        name: '鼠标'
      },
      {
        name: '键盘'
      }
    ]
  },
  {
    name: '五金工具',
    isZhankai: false,
    data: [
      {
        name: '螺丝刀'
      },
      {
        name: '扳手'
      },
      {
        name: '电缆'
      },
      {
        name: '钳子'
      },
      {
        name: '铁锤'
      },
      {
        name: '斧头'
      },
      {
        name: '电流表'
      }
    ]
  }
]
export default {
  directives: {
    TransferDom
  },
  props: ['classifyData'],
  components: {
    XHeader,
    Sticky,
    Flexbox,
    FlexboxItem,
    Cell,
    Group,
    XButton,
    // MapMarkerIcon,
    Popup,
    Card,
    Icon,
    Checker,
    CheckerItem,
    Alert,
    ShopList,
    shoplistPage
  },
  data () {
    return {
      isFenleiPop: false,
      allClassifyCellData: allClassifyCellDataFn(),
      selectClassifyCellData: '全部', // 全部分类 cell中右侧的提示字
      isPopRight: false,
      shopList: [],
      objArr: '',
      boolePrice: true,
      showDiv: false,
      showDivData: ['全部', '分类', '商品名', '关键字', '店铺名'],
      imgUrl: '../../../static/cart/down.png',
      messages: '全部',
      results: [],
      value: '',
      searchTitle: '',
      isSearch: false,
      hiddens: false,
      showAlert: false,
      srcIcon: 'static/bottom/paiheng.png',
      shoplistData: [],
      changesIcon: true
    }
  },
  methods: {
    changes (val) {
      this.results = val ? getResults(this.value, this) : []
    },
    // 全部分类中折叠cell的点击事件
    allClassifyCellClick (cellIndex) {
      this.$data.allClassifyCellData[cellIndex].isZhankai = !this.$data
        .allClassifyCellData[cellIndex].isZhankai
      // cell 展开内容的样式
      this.$('.slide p').height(this.$('.zhedie .weui-cell').outerHeight())
      this.$('.slide p').css({ 'line-height': this.$('.slide p').height() + 'px' })
      var that = this
      // 展开的小cell的点击事件
      that.$('.slide p').click(function (event) {
        event.preventDefault()
        event.stopPropagation()
        that.$data.selectClassifyCellData = event.target.innerText
        that.$data.isFenleiPop = false
      })
    },
    // 显示全部分类模块
    showFenleiModel (evnet) {
      event.preventDefault()
      event.stopPropagation()
      this.$data.isFenleiPop = true
    },
    // 隐藏全部分类模块
    hideFenleiModel (evnet) {
      event.preventDefault()
      event.stopPropagation()
      this.$data.isFenleiPop = false
    },
    // 旋转标签
    rotateElement (rotateEle) {
      if (rotateEle.hasClass('rotate')) {
        // 点击箭头旋转180度
        rotateEle.removeClass('rotate')
        rotateEle.addClass('rotate1')
      } else {
        rotateEle.removeClass('rotate1') // 再次点击箭头回来
        rotateEle.addClass('rotate')
      }
    },
    // 弹出层重置按钮点击事件
    modelResetClick () {
    },
    // 弹出层确定按钮点击事件
    modelConfirmClick () {
      this.$data.isPopRight = false
    },
    // 修改多选按钮组中的样式样式
    modifyBtnsCss () {
      var that = this
      this.$('.myBtnsRow').each(function (i, item) {
        if (that.$(item).children().length >= 2) {
          that.$(item)
            .children()
            .eq(0)
            .css(
              'margin',
              that.$(item)
                .children()
                .eq(1)
                .css('margin')
            )
          that.$(item)
            .children()
            .eq(0)
            .css('margin-left', '5px')
          that.$(item)
            .children()
            .eq(0)
            .css('margin-right', '5px')
        }
      })

      // 多选按钮点击事件
      this.$('.weui-btn_mini').click(function () {
        if (that.$(this).hasClass('demo5-item-selected')) {
          that.$(this).removeClass('demo5-item-selected')
          that.$(this).css({
            color: '#232326',
            border: '1px solid white',
            'background-color': '#f0f2f5'
          })
        } else {
          that.$(this).addClass('demo5-item-selected')
          that.$(this).css({
            color: '#fb3107',
            border: '1px solid #fb3107',
            'background-color': '#ffffff'
          })
        }
      })
    },
    // 搜索。。。。。。。。。。
    // ‘全部’的div弹出
    selectDivClick () {
      this.showDivFn()
    },
    showDivFn () {
      if (this.showDiv === true) {
        this.showDiv = false
        this.imgUrl = '../../../static/cart/up.png'
      } else {
        this.showDiv = true
        this.imgUrl = '../../../static/cart/down.png'
      }
    },
    onItemClick (itemValue, itemDisabled) {
      this.messages = itemValue
      this.showDiv = false
    },
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClicks (item) {
      this.hiddens = false
      this.shopDatass(JSON.stringify(item))
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
      this.$router.go(-1)
      this.showDiv = false // 去除div
    },
    onCancel () {
      this.showDiv = false // 去除div
      this.$data.isSearch = false
    },
    // 搜索界面头部选项卡点击事件
    cardCLick (event) {
      event.preventDefault()
      event.stopPropagation()
      var currentClickIndex = this.$(event.target).index()

      // 综合按钮
      if (currentClickIndex === 0) {
        return
      }
      // 筛选按钮
      if (currentClickIndex === 3) {
        this.$data.isPopRight = true
        // 计算 重置/确定按钮 区域的宽度
        this.$('.resetAndConfirmWrap').width(this.$('.firstRightModel').outerWidth())
        return 1
      }

      // 让图标旋转180度
      if (currentClickIndex === 1 || currentClickIndex === 2) {
        var iconEle = this.$(event.target).children('i')
        this.rotateElement(iconEle)
        return 1
      }
    },
    // 子页面传来的值
    shopData () {
      var classifyArr = []
      var finalData = this.classifyData[0]
      for (var i = 0; i < finalData.length; i++) {
        var classObj = {}
        classObj.src = homeUrl() + finalData[i].product_thumb_image
        classObj.title = finalData[i].goodsname
        classObj.desc = finalData[i].standard
        classObj.goodsid = finalData[i].goodsid
        classObj.shop_price = finalData[i].shop_price
        classObj.rebate = '返利￥' + finalData[i].rebate + '元'
        classObj.keyWorlds = finalData[i].standard
        classifyArr.push(classObj)
      }
      this.shopList = classifyArr
    },
    cancelBtn () {
      this.changesIcon = !this.changesIcon
      if (this.changesIcon === true) {
        this.shopData()
      } else {
        this.shopListChange()
      }
    },
    cancelBtns () {
      this.$router.go(-1)
    },
    cardCLickPrice (event) {
      // 让图标旋转180度
      var iconEle = this.$(event.target).children('i')
      this.rotateElement(iconEle)

      if (this.boolePrice === true) {
        this.objArr.sort(function (x, y) {
          return x.price - y.price
        })
        var searchArr = []
        for (var i = 0; i < this.objArr.length; i++) {
          var searchObj = {}
          searchObj.src =
            homeUrl() +
            'static/myfile/' +
            this.objArr[i].images.split('---')[0]
          searchObj.title = this.objArr[i].goodsname
          searchObj.desc =
            '<p class="price">￥' +
            this.objArr[i].price +
            '</p><p>' +
            this.objArr[i].size +
            this.objArr[i].color +
            '</p>' +
            '</p><p>' +
            this.objArr[i].sellcount +
            '人付款</p>'
          searchObj.url = '/goods/goods_detail'
          searchArr.push(searchObj)
        }
        this.list = searchArr
        return (this.boolePrice = false)
      }
      if (this.boolePrice === false) {
        this.objArr.sort(function (x, y) {
          return x.price - y.price
        })
        var searchArr1 = []
        for (var j = 0; j < this.objArr.length; j++) {
          var searchObj1 = {}
          searchObj1.src = homeUrl() + 'static/myfile/' + this.objArr[j].images.split('---')[0]
          searchObj1.title = this.objArr[j].goodsname
          searchObj1.desc = '<p class="price">￥' + this.objArr[j].price + '</p><p>' + this.objArr[j].size + this.objArr[j].color + '</p>' + '</p><p>' + this.objArr[j].sellcount + '人付款</p>'
          searchObj1.url = {}
          searchArr1.push(searchObj1)
        }
        this.list = searchArr1
        return (this.boolePrice = true)
      }
    },

    myfilter (value) {}
  },
  created () {
    this.$nextTick(function () {
      // 列表区域高度的设置
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      var searchBoxHeight = this.$('.vux-search-box').outerHeight()
      var tabHeight = this.$('.weui-tabbar').outerHeight()
      var panelHeight = this.$('.weui-panel').outerHeight()
      this.$('#mylist').height(
        windowHeight - headerHeight - searchBoxHeight - tabHeight - panelHeight
      )
      this.$('.material-design-icon').css('vertical-align', 'top')
      this.$('.myBtnsRow button').css({
        color: '#232326',
        border: '1px solid white',
        'background-color': '#f0f2f5'
      })
      // 修改多选按钮组中的样式样式
      this.modifyBtnsCss()
      this.shopData()
    })
  },
  destroyed: function () {
    this.shopData()
  }
}
function getResults (val, that) {
  var rs = []
  var dataList = qs.stringify({
    queryStr: val,
    fieldName: 'keywords'
  })
  axios
    .post(homeUrl() + 'getGoodsBySomething/', dataList, { emulateJSON: true })
    .then(
      result => {
        var objArr = []
        if (result.data.status === 'ok') {
          objArr = result.data.data
          that.searchTitle = objArr
          if (that.value !== '') {
            that.hiddens = true
          } else {
            that.hiddens = false
          }
          for (var i = 0; i < objArr.length; i++) {
            rs.push({
              title: objArr[i],
              other: { data: objArr[i] }
            })
          }
        }
        return rs
      },
      error => {
        this.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      }
    )
}
</script>

<style>
  /*搜索界面 card样式*/
  @import '../../../static/css/1px.less';
  .searchContent {
    /* margin-top: 60px */
  }
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    /* padding: 15px; */
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }

  /* 图标上下旋转动画 */
  .rotate {
    transform-origin: center center;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transition: transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -o-transition: -o-transform 0.2s;
    -ms-transition: -ms-transform 0.2s;
  }

  .rotate1 {
    transform-origin: center center;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transition: transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -o-transition: -o-transform 0.2s;
    -ms-transition: -ms-transform 0.2s;
  }

  /* 搜索界面图文列表 */
  #mylist img {
    width: auto;
  }
  #mylist .weui-media-box__title {
    white-space: normal;
  }

  .demo5-item-selected {
    background: #ffffff url(../../../src/assets/demo/active.png) no-repeat right
      bottom;
  }

  /* 第一个右侧model层 */
  .firstRightModel {
    background-color: white;
    position: absolute;
  }
  /* 重置/确定 按钮区域 */
  .firstRightModel .resetAndConfirmWrap {
    position: fixed;
    bottom: 0;
  }

  /* 多选按钮组 */
  .myBtnsRow {
    display: flex;
    /*margin-top: 5px;*/
    justify-content: space-around;
  }
  .myBtnsRow button {
    flex: 1;
    margin-left: 5px;
    margin-right: 5px;
  }

  /* 价格区间 */
  .priceArea {
    margin-top: 15px;
    padding: 0 15px;
  }
  .priceArea .priceNumber {
    margin-top: 15px;
    text-align: center;
  }
  .priceArea .priceNumber input {
    border: 0;
    width: 42%;
    height: 29px;
    border-radius: 6px;
    background-color: #f0f2f5;
    text-align: center;
  }

  /* 输入框中placeholder的颜色 */
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #ddddde;
  }
  input:-moz-placeholder,
  textarea:-moz-placeholder {
    color: #ddddde;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #ddddde;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #ddddde;
  }

  /* cell 折叠 展开 */
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
    background-color: #f3f4f6;
  }
  .slide p {
    border-bottom: 1px solid #d7d7d7;
    color: #252525;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  #imgShaixun {
    vertical-align: top;
  }
  .mySearch_lefts {
    padding-right: 10px;
    padding-top: 6px;
  }
  .mySearch_lefts img {
    height: 20px;
    line-height: 20px;
  }
  .Search_cancel {
    padding-top: 6px;
    padding-left: 2px;
  }
  .Search_cancel img {
    width: 25px;
  }
</style>

