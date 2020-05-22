<template>
  <div id="myFocusPage">
    <tab v-model="index" :line-width=2 active-color='#fc378c' prevent-default @on-before-index-change="switchTabItem">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"  :key="index">{{item}}</tab-item>
    </tab>
    <swiper id="mySwiper" v-model="index" :show-dots="false" ref="mySwiper">
      <!-- <shop-cell :list="dataList"></shop-cell> -->
      <div class="order_content" v-for="(item, index) in dataList"  :key="index">
          <div class="order_statu"><span>{{item.orderStatu}}</span><span id="orderNums">订单号:{{item.orderNum}}</span></div>
          <div class="lagistics" v-if="status">
               <flexbox>
                <flexbox-item >
                    <div class="flex-demo">
                        <p>{{item.myLogistics.currentLogistics}}</p>
                        <p class="updataTime">{{item.myLogistics.updataTime}}</p>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1"><div @click="myLogistics(item)" class="flex-demo about_more">></div></flexbox-item>
              </flexbox>
          </div>
          <div class="orderInfods">
              <p class="shoppingnames">{{item.orderInfos.shopName}}</p>
              <flexbox>
                <flexbox-item :span="3"><div class="flex-demo info_img"><img :src="item.orderInfos.shopImg" alt=""></div></flexbox-item>
                <flexbox-item ><div class="flex-demo">{{item.orderInfos.shopInfos}}</div></flexbox-item>
              </flexbox>
          </div>
          <div class="orderCost">实付：￥{{item.needPay}}</div>
      </div>
    </swiper>
  </div>
</template>



<script>
import {Tab, TabItem, Swiper, SwiperItem, XHeader, Flexbox, FlexboxItem} from 'vux'
import ShopCell from '../../components/toolComponent/shopCell'

const list = () => ['实物订单', '其他订单']
const shangpinListFn = () => [
  {
    orderStatu: '等待收货',
    orderNum: '893736621',
    myLogistics: {
      currentLogistics: '您的订单在【南昌分拨中心】发货完成，准备送往【郑州站】',
      updataTime: '2018-01-02',
      routePath: 'logisticsQuery'
    },
    orderInfos: {
      shopName: '京东',
      shopImg: 'https://image4.suning.cn/uimg/b2c/newcatentries/0070142956-000000000178989039_1_220x220.jpg?ver=2008',
      shopInfos: 'HUAWEI/华为 畅享6 3GB+16GB 全网通4G手机 （金色）'
    },
    needPay: '666.00'
  }, {
    orderStatu: '等待收货',
    orderNum: '893736621',
    myLogistics: {
      currentLogistics: '您的订单在【南昌分拨中心】发货完成，准备送往【郑州站】',
      updataTime: '2018-01-02',
      routePath: ''
    },
    orderInfos: {
      shopName: '京东',
      shopImg: 'https://image4.suning.cn/uimg/b2c/newcatentries/0070142956-000000000178989039_1_220x220.jpg?ver=2008',
      shopInfos: 'HUAWEI/华为 畅享6 3GB+16GB 全网通4G手机 （金色）'
    },
    needPay: '666.00'
  }
]
const dianpuListFn = () => [
  {
    orderStatu: '等待收货',
    orderNum: '893736621',
    myLogistics: {
      currentLogistics: '您的订单在【南昌分拨中心】发货完成，准备送往【郑州站】',
      updataTime: '2018-01-02',
      routePath: ''
    },
    orderInfos: {
      shopName: '淘宝',
      shopImg: 'https://image4.suning.cn/uimg/b2c/newcatentries/0070142956-000000000178989039_1_220x220.jpg?ver=2008',
      shopInfos: 'HUAWEI/华为 畅享6 3GB+16GB 全网通4G手机 （金色）'
    },
    needPay: '666.00'
  }
]

export default {
  components: {
    ShopCell,
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      dataList: shangpinListFn(),
      list2: list(),
      demo2: '商品',
      demoDisabled: 'A',
      index: 0,
      shangpinList: shangpinListFn(),
      dianpuList: dianpuListFn(),
      status: true
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.$refs.mySwiper.xheight = '300px'
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      var tabHeight = this.$('.vux-tab').outerHeight()
      this.$refs.mySwiper.xheight = windowHeight - headerHeight - tabHeight + 'px'
      this.$('.vux-swiper').css({'overflow': 'scroll'})
    })
  },
  methods: {
    switchTabItem (index) {
      var that = this
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        that.$data.index = index
        if (index === 0) {
          that.$data.dataList = shangpinListFn()
        }
        if (index === 1) {
          that.$data.dataList = dianpuListFn()
        }
        that.$('.vux-swiper').scrollTop(0)
      }, 500)
    },
    myLogistics: function (item) {
      this.$router.push({path: item.myLogistics.routePath})
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';

#myFocusPage .vux-slider{
  overflow: unset;
}

#myFocusPage #mySwiper .vux-swiper{
  overflow: unset;
}

.tab-swiper {
  background-color: #fff;
  height: 100px;
}
.flex-demo {
  text-align: left;
  color: #666;
//   background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
//   border: 1px solid #20b907
}
.order_content{
    padding: 15px;
    background: #ffffff;
    margin-top: 15px;
    font-size: 14px
    }
.order_statu{
    height: 35px;
    border-bottom: 1px solid #ebebeb;
    // line-height: 40px
}
#orderNums{
    float: right;
    color: #666
}
.lagistics{
    margin-top: 8px;
    margin-bottom: 8px;
    // padding-bottom: 1px solid red
    border-bottom: 1px solid #ebebeb
    
}
.orderInfods{
    margin-top: 8px;
}
.shoppingnames{
    line-height: 40px
}
.info_img img{
    width: 80px;
    // height: 80px;
}
.orderCost{
    margin-top: 8px;
    border-top: 1px solid #ebebeb;
    line-height: 30px;
    padding-top: 10px;
    color: #666
}
.about_more{
    text-align: right;
    font-size: 26px;
    color: #cccccc
}
.updataTime{
    color:#ccc;
    font-size: 12px;

}
</style>