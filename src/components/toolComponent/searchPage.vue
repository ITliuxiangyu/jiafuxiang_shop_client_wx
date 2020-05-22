<template>
  <div class="">
    <search :auto-fixed="false" v-model="value" @on-change='changes' :placeholder='displayText'>
      <div slot="left" class="mySearch_lefts" @click="cancelbackBtns"> <img src="static/bottom/fanhui@2x.png" alt=""> </div>
      <x-icon slot="right" v-tap="{methods:yuyun_btn}" type="ios-mic" class="icon-red"></x-icon>
    </search>
    <div class="chose_item" style="margin-top:0">
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div v-tap="{methods: zhongheFn}" class="vux-1px-l vux-1px-r xiala">
            <span v-bind:class="{isGray: type_index != 0}">{{zonghe}}</span> <img :src="xialaImg" alt="">
          </div>
          <div v-bind:class="{isGray: type_index != 1}" v-tap="{methods: cardCLickSellcount , type_index: 1 , column_value: 1}" class="vux-1px-r">
            销量
          </div>
          <div v-bind:class="{isGray: type_index != 2}" v-tap="{methods: cardCLickSellcount , type_index: 2 , column_value: 2}" class="vux-1px-r">
            分类
          </div>
          <div v-bind:class="{isGray: type_index != 3}" v-tap="{methods: cardCLickSellcount , type_index: 3 , column_value: 3}" class="vux-1px-r">
            店铺
          </div>
          <div v-bind:class="{isGray: type_index != 4}" v-tap="{methods: cardCLickSellcount , type_index: 4 , column_value: 4}" class="vux-1px-r">
            <img v-show="isHeng" class="hengshu" src="../../../static/bottom/paiheng.png" alt="">
            <img v-show="!isHeng" class="hengshu" src="../../../static/bottom/paishu.png" alt="">
          </div>
        </div>
      </card>
      <xiala-page v-show='isShowZonghe' v-on:cellClick="zongheCellFn" :sel_index="selIndex" :cur_list="['综合' , '价格升序' , '价格降序']"></xiala-page>
    </div>

    <!--右侧弹出界面-->
    <div v-transfer-dom>
      <popup v-model="isPopRight" position="right" style="width: 80%;" class="poup_page">
        <div style="width:100%" class="poup_content">
          <div class="motai_tou">
            嘉福祥
          </div>
          <div class="motai_content">
            <btn-select :dataList="guige"></btn-select>
          </div>

          <div class="motai_jiao">
            <div class="chongzhi">重置</div>
            <div class="wancheng">完成</div>
          </div>
        </div>
      </popup>
    </div>
    
    <!-- 图文列表 -->
    <shop-list v-show="!isHeng" :shoplistData="shopList"></shop-list>
    <!--<shoplist-page v-show="changesIcon==false" :shoplistData="shopList"></shoplist-page>-->
    <shoplist-page v-show="isHeng" :shoplistData="shopList"></shoplist-page>
    

    <ul class="search_result" v-show="hiddens" >
      <li v-for="(item, i) in searchTitle" :key="i" @click="resultClicks(item)">{{item}}</li>
    </ul>
    <alert v-model="showAlert" :title="('提示')"> {{ ('暂无数据') }}</alert>

    <div class="lu_yin_wrap" style="text-align:center; display:none;">
      <x-icon v-tap="{methods:close_luyin_wrap}" type="ios-close" class="icon-luyin_close"></x-icon>
      <div class="yuyin_loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
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
  Divider,
  TransferDom,
  Sticky,
  XHeader,
  Search,
  Alert,
  XInput
} from 'vux'
import ShopCell from './shopCell.vue'
import xialaPage from './xialaPage.vue'
import ShopList from './shopList.vue'
import shoplistPage from './shoplistPage'
import btnSelect from './btnSelect'
import {myTools} from '../utils/utils.js'

export default {
  directives: {
    TransferDom
  },
  props: ['searchData'],
  components: {
    XHeader,
    Sticky,
    Flexbox,
    FlexboxItem,
    Divider,
    Cell,
    Group,
    XButton,
    Popup,
    Card,
    Icon,
    ShopCell,
    Search,
    Alert,
    ShopList,
    shoplistPage,
    XInput,
    xialaPage,
    btnSelect
  },
  data () {
    return {
      currentPostData: 'goodsname',
      allClassifyCellData: [],
      selectClassifyCellData: '全部', // 全部分类 cell中右侧的提示字
      isPopRight: false,
      shopList: [],
      boolePrice: true,
      booleSellcount: true,
      displayText: '请输入商品名',
      showDiv: false,
      searchDataText: this.searchData.classifyName ? this.searchData.classifyName : '',
      imgUrl: '../../../static/cart/down.png',
      messages: '全部',
      value: this.searchData.classifyName ? this.searchData.classifyName : '',
      searchTitle: [],
      isSearch: false,
      hiddens: false,
      showAlert: false,
      srcIcon: 'static/bottom/paiheng.png',
      percent: 0,
      lu_yin_time: '',
      wx: '',
      lu_yin_id: '',
      search_time: '',
      selIndex: 0,
      zonghe: '综合',
      isShowZonghe: false,
      type_index: 0,
      xialaImg: '../../../static/home/xiala.png',
      guige: [
        {
          'title': '类别',
          'data': ['usb风扇', '迷你风扇', '风扇', '3c数码配件', '汽车内外试用品', '居家日用']
        },
        {
          'title': '天猫无忧购',
          'data': ['只换不修']
        },
        {
          'title': '店铺类型',
          'data': ['旗舰店', '专卖店', '专营店呢']
        },
        {
          'title': '商品类型',
          'data': ['花呗分期', '包邮', '这口', '搭配减价', '公益宝贝']
        }
      ],
      isJisuan: false,
      xiaoliangSheng: false,
      isHeng: false
    }
  },
  methods: {
    shengxu (obj1, obj2) {
      var val1 = parseFloat(obj1.shop_price)
      var val2 = parseFloat(obj2.shop_price)
      if (val1 < val2) {
        return 1
      } else if (val1 > val2) {
        return -1
      } else {
        return 0
      }
    },
    jiangxu (obj1, obj2) {
      var val1 = parseFloat(obj1.shop_price)
      var val2 = parseFloat(obj2.shop_price)
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    xiaoliangShengFn (obj1, obj2) {
      var val1 = parseFloat(obj1.sellcount)
      var val2 = parseFloat(obj2.sellcount)
      if (val1 < val2) {
        return 1
      } else if (val1 > val2) {
        return -1
      } else {
        return 0
      }
    },
    xiaoliangJiangFn (obj1, obj2) {
      var val1 = parseFloat(obj1.sellcount)
      var val2 = parseFloat(obj2.sellcount)
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    xiaoliangSort () {
      if (this.xiaoliangSheng === false) {
        this.shopList.sort(this.xiaoliangShengFn)
        this.xiaoliangSheng = true
      } else {
        this.shopList.sort(this.xiaoliangJiangFn)
        this.xiaoliangSheng = false
      }
    },
    zongheCellFn (params) {
      this.selIndex = params.index
      this.zonghe = params.title
      this.isShowZonghe = false
      this.type_index = 0
      this.xialaImg = '../../../static/home/xiala.png'

      if (this.selIndex === 1) {
        this.shopList.sort(this.jiangxu)
      }
      if (this.selIndex === 2) {
        this.shopList.sort(this.shengxu)
      }
    },
    zhongheFn () {
      this.currentPostData = 'keywords'
      this.isShowZonghe = !this.isShowZonghe
    },
    onFocus () {
    },
    close_luyin_wrap () {
      this.$('.lu_yin_wrap').fadeOut(1)
    },
    translate_luyin_id (that) {
      window.wx.translateVoice({
        localId: that.lu_yin_id, // 需要识别的音频的本地Id，由录音相关接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          // alert('语音识别结果')
          // alert(res.translateResult) // 语音识别的结果
          that.value = res.translateResult.replace('。', '').replace('，', '')
          this.$vux.loading.show({
            text: 'loading'
          })
          getResults(that.value, that)
        },
        error: function (error) {
          // alert('语音识别出错')
          alert(error)
        }
      })
    },
    start_wx_luyin () {
      var that = this
      window.wx.startRecord()
      window.wx.onVoiceRecordEnd({
        complete: function (res) {
          that.lu_yin_id = res.localId
          that.stop_lu_yin_time()
          that.translate_luyin_id(that)
        }
      })
    },
    stop_lu_yin_time () {
      var that = this
      window.wx.stopRecord({
        success: function (res) {
          that.lu_yin_id = res.localId
          that.stop_lu_yin_time()
          that.translate_luyin_id(that)
        }
      })
    },
    yuyun_btn () {
      this.$('.lu_yin_wrap').fadeToggle()
    },
    changes (val) {
      var that = this
      if (this.search_time !== '') {
        clearTimeout(this.search_time)
      }
      this.search_time = setTimeout(function () {
        that.start_search()
      }, 1000)
    },
    start_search () {
      var that = this
      if (this.value === '' || this.value === undefined) {
        return
      }
      this.$vux.loading.show({
        text: 'loading'
      })
      var currUrl = 'getGoodsListByQueryString'
      myTools().my_post(currUrl, {
        queryStr: that.value,
        fieldName: that.currentPostData
      }, function (result) {
        that.$vux.loading.hide()
        that.$data.shopList = []
        if (result.data.status === 'ok') {
          that.isShowZonghe = false
          that.shopList = result.data.data
          if (that.shopList.length <= 0) {
            that.$vux.toast.text('换个搜索试试.....', 'center')
          }
        }
      }, function () {
        that.$vux.loading.hide()
        that.$vux.toast.text('网络请求失败....', 'bottom')
      })
    },
    resultClicks (item) {
      this.hiddens = false
      this.shopData(JSON.stringify(item))
    },
    // 子页面传来的值
    shopData (searches) {
      var that = this
      this.searchDataText = searches.replace(/ /, '')
      if (this.searchDataText === '') {
        return
      }
      that.$vux.loading.show({
        text: 'loading'
      })
      if (this.searchData.is_auto_search === 'true') {
        myTools().my_post('getGoodsByMinfenleiId', {'minFenleiId': this.searchData.classifyId}, function (result) {
          if (result.data.status === 'ok') {
            that.$vux.loading.hide()
            that.shopList = result.data.data
            if (that.shopList.length <= 0) {
              that.$vux.toast.text('换个搜索试试.....', 'center')
            }
          }
        }, function () {
          that.$vux.toast.text('网络请求失败....', 'bottom')
          that.$vux.loading.hide()
        })
      }
    },
    cancelbackBtns () {
      this.$router.go(-1)
    },
    motaiContentScroll () {
      var that = this
      if (this.isJisuan === false) {
        setTimeout(function () {
          that.$('.motai_content').css({
            'height': that.$(window).height() - that.$('.motai_tou').outerHeight() - that.$('.motai_jiao').outerHeight() + 'px'
          })
        }, 100)
      }
    },
    cardCLickSellcount (params) {
      this.type_index = params.type_index
      this.xialaImg = '../../../static/home/xialahui.png'
      switch (params.column_value) {
        case 1:
          // this.currentPostData = 'keywords'
          this.xiaoliangSort()
          break
        case 2:
          this.currentPostData = 'standard'
          this.start_search()
          break
        case 3:
          this.currentPostData = 'shopname'
          this.start_search()
          break
        case 4:
          // this.isPopRight = true
          // this.motaiContentScroll()
          // this.isJisuan = true
          // this.xiaoliangSort()
          this.currentPostData = 'keywords'
          this.isHeng = !this.isHeng
          break
        default:
          break
      }
    }
  },
  created () {
    // values: 'keywords'
    // values: 'goodsname'
    // values: 'standard'
    // values: 'shopname'
    var that = this
    if (this.$route.params.is_auto_search === 'true') {
      this.currentPostData = 'xiaoClassiData'
    }
    this.shopData(this.searchDataText)
    this.isJisuan = false
    that.$nextTick(function () {
      that.$('.yuyin_loading')[0].addEventListener('touchstart', function (event) {
        event.preventDefault()
        that.$('.yuyin_loading').toggleClass('luyin_animation')
        that.start_wx_luyin()
      }, false)
      that.$('.yuyin_loading')[0].addEventListener('touchend', function (event) {
        that.$('.yuyin_loading').toggleClass('luyin_animation')
        that.stop_lu_yin_time()
      }, false)
    })
  },
  mounted () {
    // 列表区域高度的设置
    var that = this
    var windowHeight = this.$(window).height()
    this.$('.news_recommend').css({
      'height': windowHeight - that.$('.vux-search-box').outerHeight() - that.$('.chose_item').outerHeight() + 'px',
      'overflow': 'scroll'
    })
  }
}
function getResults (val, that) {
  myTools().my_post('getGoodsListByQueryString', {
    queryStr: val,
    fieldName: that.currentPostData
  }, function (result) {
    that.$data.shopList = []
    if (result.data.status === 'ok') {
      that.shopList = result.data.data
      that.$vux.loading.hide()
      if (that.shopList.length <= 0) {
        that.$vux.toast.text('换个搜索试试.....', 'center')
      }
    }
  }, function (error) {
    that.$vux.toast.text('网络请求失败....', 'bottom')
    console.log(error)
    that.$vux.loading.hide()
  })
}
</script>

<style scoped>
  .lu_yin_wrap{
    height: 50px;
    width: 100%;
    /*background-color: floralwhite;*/
    /*background-color: radial-gradient(#b88f8f, #d573c0, #48a8bd);*/
    background: radial-gradient(#5885b4, #8cb8ce, #d2e4ec);
    position: fixed;
    bottom: 0;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  /*搜索界面 card样式*/
  @import "../../../static/css/1px.less";
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    /*color: #f74c31;*/
  }
  .xiala img{
    width: 15px;
    vertical-align: middle;
  }
  .isGray{
    color: lightgray;
  }

  /* 图标上下旋转动画 */
  

  .demo5-item-selected {
    background: #ffffff url(../../../src/assets/demo/active.png) no-repeat right
      bottom;
  }

  /* *{
      pointer-events:none;
  } */

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

  .showDiv {
    position: fixed;
    top: 55px;
    width: 100%;
    height: 6.25rem;
    padding-top: 1.5rem;
    z-index: 9999999999;
    background: #ffffff;
  }
  .showDivWrap {
    position: fixed;
    top: 55px;
    width: 100%;
    height: 100%;
    padding-top: 1.5rem;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 1px 3px #888888;
  }

  .search_result li{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
  }

  .icon-luyin_close{
    position: absolute;
    top: 0;
    right: 0.2em;
  }

  /*语音区域*/
  a{
		display: block;
		text-align: center;
		font-size: 20px;
		margin-top: 200px;
	}
	.yuyin_loading{
		width: 80px;
		height: 40px;
		margin: 0 auto;
	}
  .luyin_animation span{
    -webkit-animation: load 1.04s ease infinite;
  }
	.yuyin_loading span{
		display: inline-block;
		width: 8px;
		height: 100%;
		border-radius: 4px;
		background: lightgreen;
		/*-webkit-animation: load 1.04s ease infinite;*/
	}
	@-webkit-keyframes load{
		0%,100%{
			height: 40px;
			background: lightgreen;
		}
		50%{
			height: 60px;
			margin-top: -20px;
			background: lightblue;
		}
	}
	.yuyin_loading span:nth-child(2){
		-webkit-animation-delay:0.13s;
	}
	.yuyin_loading span:nth-child(3){
		-webkit-animation-delay:0.26s;
	}
	.yuyin_loading span:nth-child(4){
		-webkit-animation-delay:0.39s;
	}
	.yuyin_loading span:nth-child(5){
		-webkit-animation-delay:0.52s;
	}


  .poup_page{
    background-color: white;
  }

  .motai_tou{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #bbb;
    color: red;
    text-align: center;
    /*position: fixed;
    width: 100%;
    top: 0px;*/
  }

  .motai_content {
    overflow: scroll;
  }

  .motai_jiao{
    display: flex;
    text-align: center;
    position: fixed;
    width: 80%;
    bottom: 0;
  }
  .motai_jiao div{
    padding-top: 10px;
    padding-bottom: 10px;
    flex: 1;
  }
  .motai_jiao .chongzhi{
    background-color: #fbe4e5;
    color: #cf0f1d;
  }
  .motai_jiao .wancheng{
    background-color: #cf0f1d;
    color: #fff;
  }

  /* 横竖图片 */
  .hengshu{
    width: 20px;
  }




</style>

