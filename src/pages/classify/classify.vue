<template>
  <div id="myrightGroup">
    <x-header title="分类" style="position:fixed;top:0px;z-index:1000;width:100%" :left-options="{showBack: false}" @on-click-more="show = false"></x-header> 
    <flexbox v-if="isSearch == false" :gutter="0" wrap="wrap" class="contentWrap">
      <div  id="sets">
        <search
        :autoFixed="true"
        @on-focus="onFocus"
        style="margin-top:46px">
        </search>
      </div>
      <flexbox-item  :span="0.24">
        <div class="flex-demo" >
          <scroller :height="myHeight" ref="leftScroller" class="leftScroll" lock-x scrollbar-y>
            <group>
              <cell class="cells" :class="{classifyActive:i==currentLeftIndex}" v-for="(item, i) in leftData" :key="i" @click.native="onCellClick(item,i)" :title="item.name"></cell>
            </group>
          </scroller>
        </div>
      </flexbox-item>
      <flexbox-item :span="0.74">
        <div class="flex-demo"  >
          <scroller @on-scroll="onScroll" :height="myHeight" class="rightScroll" lock-x scrollbar-y ref="rightScroller" >
            <div >
              <!--<div class="classifyImg"><img :src="getSanJiImg(detailClassify.length > 0 ? detailClassify[0].data[0].image : '')" alt=""></div>-->
              <div  class=""  ref="myGroup"  v-for="(item, i) in detailClassify" :key="i"> 
                <p class="classifyTitle">{{item.name}}</p>
                <div>
                  <flexbox :gutter="0" wrap="wrap" >
                    <flexbox-item :span="1/3" v-for="(classifyItem, index) in item.data" :key="index" @click.native="classifyClick(classifyItem.id,classifyItem.name)">
                      <div class="item_flexs">
                        <div class="item_flexsImg"><img :src="getSanJiImg(classifyItem.image)" alt=""></div>
                        <p ref="groupTitle">{{classifyItem.name}}</p>
                      </div>
                    </flexbox-item>
                  </flexbox>
                </div>
              </div>
            </div>
          </scroller>
        </div>
      </flexbox-item>
    </flexbox>
    <!-- 搜索界面 -->
    <div v-else>
      <classify-page :classifyData="classifyData"></classify-page>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Panel,
  XSwitch,
  Search,
  Group,
  Cell,
  Scroller,
  Flexbox,
  FlexboxItem,
  Grid,
  GridItem,
  Alert
} from 'vux'
import menu from './menu.js'

import classifyPage from '../../components/toolComponent/classifyPage.vue'

import {homeUrl, linyueru, myTools} from '../../components/utils/utils.js'
export default {
  components: {
    classifyPage,
    Search,
    Group,
    Cell,
    Scroller,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Panel,
    XSwitch,
    XHeader,
    Alert
  },
  watch: {
    $route: 'getClassifyArr'
  },
  methods: {
    // 修改分类数据的结构
    modifyMinData (dataArr) {
      // 修改右侧小分类数据的结构
      if (dataArr.length <= 0) {
        return
      }
      var resultArr = []
      var previorName = dataArr[0].bigName
      var tempDic = {}
      var minTempArr = []
      for (var i = 0; i < dataArr.length; i++) {
        var data = dataArr[i]
        var bigName = data.bigName
        var minName = data.minName
        if (bigName !== previorName) {
          tempDic['name'] = previorName
          tempDic['datas'] = minTempArr
          resultArr.push(tempDic)
          tempDic = {}
          minTempArr = []
          previorName = bigName
        } else {
          minTempArr.push(minName)
        }
      }
      this.$data.classifyArr = resultArr
    },
    // 获取分类数据
    getClassifyArr () {
      this.$vux.loading.show({
        text: 'loading'
      })
      var that = this
      myTools().fenlei_list_fn(function (result) {
        that.leftData = result
        that.onCellClick(that.leftData[0], 0)
        that.$vux.loading.hide()
      })
    },
    onFocus () {
      this.$router.push({ name: 'goSearch', params: {fenleiPass: '分类'} })
    },
    onScroll (event) {
    },
    onCellClick (item, clickIndex) {
      var that = this
      this.$vux.loading.show({
        text: 'loading'
      })
      myTools().my_post('getAllFenleiByDafenleiId', {
        dafenleiId: item.id
      }, function (result) {
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.detailClassify = result.data.data
          setTimeout(() => {
            that.$('.vux-flexbox-item').css({
              'padding-left': '0px',
              'padding-right': '0px'
            })
          }, 100)
        }
      }, function (error) {
        console.log(error)
        that.$vux.loading.hide()
        that.$vux.toast.text('网络请求失败....', 'bottom')
      })
      that.currentLeftIndex = clickIndex
    },
    // 三级分类
    getClassifyData (sanjiClass) {
      var classid = ''
      var that = this
      for (var i = 0; i < sanjiClass.length; i++) {
        classid = sanjiClass[i].id
      }
      myTools().my_post('getSanjifenleiData', {
        fatherid: classid
      }, function (result) {
        if (result.data.status === 'ok') {
          that.sanjiClassData = result.data.data
        }
      }, function (error) {
        console.log(error)
      })
    },
    getSanJiImg (images) {
      if (images === undefined || images === '') {
        return linyueru()
      }
      var shopImgs = homeUrl() + images
      return shopImgs
    },
    // 分类点击
    classifyClick (classifyId, classifyName) {
      this.$router.push({ name: 'goSearch', params: {'classifyId': classifyId, 'classifyName': classifyName, 'is_auto_search': 'true'} })
    }
  },
  created () {
    this.$nextTick(function () {
      var that = this
      var windowHeight = this.$(window).height()
      var tabHeight = this.$('.weui-tabbar').outerHeight()
      var setHeight = this.$('#sets').outerHeight()
      this.myHeight = windowHeight - setHeight - tabHeight + 'px'
      this.$('.weui-cells').css({
        'font-size': '13px',
        'margin-top': '0px'
      })
      setTimeout(() => {
        that.$('.vux-flexbox-item').css({
          'padding-left': '0px',
          'padding-right': '0px'
        })
      }, 100)
    })
    this.getClassifyArr()
  },
  data () {
    return {
      position: 'default',
      showPositionValue: false,
      isSearch: false,
      classifyActive: [],
      myCols: 2,
      currentLeftIndex: 0,
      myHeight: '100px',
      classifyArr: [],
      classifyData: [],
      leftData: [],
      detailClassify: [],
      sanjiClassData: []
    }
  },
  computed: {
    pageSections () {
      const flatten = (tree, level = 1) => {
        const treeCloned = JSON.parse(JSON.stringify(tree))
        let flattened = []
        treeCloned.forEach(branch => {
          const { children } = branch
          delete branch.children
          branch.level = level
          flattened.push(branch)
          if (children) {
            flattened = [...flattened, ...flatten(children, level + 1)]
          }
        })
        return flattened
      }
      return flatten(menu)
    }
  }
}
</script>
<style lang="less" scoped>
  #sets {
    width: 100%;
    z-index: 1000000;
    position: absolute;
    top: 0px;
  }
  .contentWrap {
    margin-top: 92px;
  }
  /* 左侧滚动区域 */
  .leftScroll .weui-cell .vux-label {
    color: #666;
  }

  #myrightGroup .weui-cells {
    margin-top: 0;
  }
  // #myrightGroup .weui-cells{
  //   font-size: 14px !important;
  // }
  .classifyActive {
    // border: 1px solid orange;
    background: #ffffff !important;
    // border-left: 1px solid #f74c31;
  }
  cell {
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .grid-center img {
    width: 100%;
  }
  .item_flexs .item_flexsImg {
    // border: 1px solid red;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    text-align: center;
  }
  .item_flexs .item_flexsImg img {
    width: 80%;
  }
  .item_flexs p {
    text-align: center;
    font-size: 12px;
  }
  .item_flexs {
    // padding: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    // border: 1px solid #eee;
  }
  .classifyImg {
    width: 100%;
    height: 100px;
  }
  .classifyImg img {
    width: 100%;
    height: 90px;
  }
  .rightScroll {
    background: #ffffff;
  }
  .cells {
    background: #f4f4f4;
    // border-bottom: none;
  }
  .classifyTitle {
    // padding-left: 10px;
    font-weight: 700;
    line-height: 40px;
  }

</style>
