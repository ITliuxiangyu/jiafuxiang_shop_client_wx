import Vue from 'vue'
import VueRouter from 'vue-router'
// const AddressComp = () => import('../pages/goods/add_address.vue')
// const AddressComp = resolve => require(['../pages/goods/add_address.vue'], resolve)
/**
 *  加载模块
 */
Vue.use(VueRouter)
const HomePage = resolve => require(['../pages/home.vue'], resolve)
const FenleiPage = resolve => require(['../pages/classify/classify.vue'], resolve)
const Find = resolve => require(['../pages/find/find.vue'], resolve)

const AddressComp = resolve => require(['../pages/goods/add_address.vue'], resolve)
const SearchComp = resolve => require(['../pages/classify/goSearch.vue'], resolve)
const MiaoshaComp = resolve => require(['../pages/goods/secondKillList.vue'], resolve)
const GoodsDetailComp = resolve => require(['../pages/goods/goods_detail.vue'], resolve)
const OrderComp = resolve => require(['../pages/goods/order_confirm.vue'], resolve)
const payMoneyComp = resolve => require(['../pages/goods/pay_money.vue'], resolve)
const goodsAddressComp = resolve => require(['../pages/goods/goods_address.vue'], resolve)
const vipManageComp = resolve => require(['../pages/personal/vip_manage.vue'], resolve)
const myCollectionComp = resolve => require(['../pages/personal/myCollection.vue'], resolve)
const myRecommendComp = resolve => require(['../pages/personal/myRecommend.vue'], resolve)
const myHistoryComp = resolve => require(['../pages/personal/myHistory.vue'], resolve)
const myFocusComp = resolve => require(['../pages/personal/myFocus.vue'], resolve)
const myBuyHistoryComp = resolve => require(['../pages/personal/myBuyHistory.vue'], resolve)
const logisticsQueryComp = resolve => require(['../pages/personal/logisticsQuery.vue'], resolve)
const myCoderComp = resolve => require(['../pages/personal/myCoder.vue'], resolve)
const myInvoiceComp = resolve => require(['../pages/personal/myInvoice.vue'], resolve)
const myevalComp = resolve => require(['../pages/personal/myeval.vue'], resolve)
const redPacketsComp = resolve => require(['../pages/personal/redPackets.vue'], resolve)
const myShareComp = resolve => require(['../pages/personal/myShare.vue'], resolve)
const myKefuMsg = resolve => require(['../pages/personal/kefuMsg.vue'], resolve)
const myOrderComp = resolve => require(['../pages/personal/my_order.vue'], resolve)
const backMoneyComp = resolve => require(['../pages/personal/backMoney.vue'], resolve)
const qianbaoComp = resolve => require(['../pages/personal/qianbao.vue'], resolve)
const orderDetailComp = resolve => require(['../pages/personal/orderDetail.vue'], resolve)
const querenShouhuoComp = resolve => require(['../pages/personal/querenShouhuo.vue'], resolve)

const liuyanComp = resolve => require(['../pages/personal/liuyan.vue'], resolve)
const jifenExchangeComp = resolve => require(['../pages/personal/jifenExchange.vue'], resolve)
const mySignedComp = resolve => require(['../pages/personal/mySigned.vue'], resolve)
const myJiFenComp = resolve => require(['../pages/personal/myJiFen.vue'], resolve)
const pingjiaComp = resolve => require(['../pages/personal/pingjia.vue'], resolve)
const pingjiaChenggongComp = resolve => require(['../pages/personal/pingjiaChenggong.vue'], resolve)
const router = new VueRouter({
  base: __dirname,
  likActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      redirect: '/appHome/home'
    },
    {
      path: '/',
      name: 'init',
      component: resolve => require(['../pages/init.vue'], resolve),
      children: [
        {
          path: 'personal/userInfo',
          name: 'userInfo',
          component: resolve => require(['../pages/personal/userInfo.vue'], resolve),
          meta: {
            title: '我的',
            keepAlive: true
          }
        },
        {
          path: '/appHome/home',
          name: 'home',
          component: HomePage,
          meta: {
            title: '主页',
            keepAlive: true
          }
        },
        {
          path: 'cart/cart',
          name: 'cart',
          component: resolve => require(['../pages/cart/cart.vue'], resolve),
          meta: {
            title: '购物车',
            keepAlive: true
          }
        },
        {
          path: 'find/find',
          name: 'find',
          component: Find,
          meta: {
            title: '发现',
            keepAlive: true
          }
        },
        {
          path: 'classify/classify',
          name: 'classify',
          component: FenleiPage,
          meta: {
            title: '分类',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/classify/goSearch',
      name: 'goSearch',
      component: SearchComp,
      meta: { title: '搜索' }
    },
    {
      path: '/goods/secondKillList',
      name: 'secondKillList',
      component: MiaoshaComp,
      meta: { title: '秒杀列表' }
    },
    {
      path: '/goods/goods_detail',
      name: 'goods_detail',
      component: GoodsDetailComp,
      meta: { title: '商品详情' },
      beforeRouteLeave: (to, from, next) => {
        this.$destroy()
      }
    },
    {
      path: '/goods/order_confirm',
      name: 'order_confirm',
      component: OrderComp,
      meta: {}
    },
    {
      path: '/goods/pay_money',
      name: 'pay_money',
      component: payMoneyComp,
      meta: { title: '订单支付' }
    },
    {
      path: '/goods/goods_address',
      name: 'goods_address',
      component: goodsAddressComp,
      meta: { title: '收货地址' }
    },
    {
      path: '/goods/add_address',
      name: 'add_address',
      component: AddressComp,
      meta: {title: '新建地址'}
    },
    {
      path: '/personal/vip_manage',
      name: 'vip_manage',
      component: vipManageComp,
      meta: {title: '会员管理'}
    },
    {
      path: '/personal/myCollection',
      name: 'myCollection',
      component: myCollectionComp,
      meta: {title: '我的收藏'}
    },
    {
      path: '/personal/myRecommend',
      name: 'myRecommend',
      component: myRecommendComp,
      meta: {title: '我的推荐'}
    },
    {
      path: '/personal/myHistory',
      name: 'myHistory',
      component: myHistoryComp,
      meta: {title: '浏览记录'}
    },
    {
      path: '/personal/kefuMsg',
      name: 'kefuMsg',
      component: myKefuMsg,
      meta: {title: '客服消息'}
    },
    {
      path: '/personal/myFocus',
      name: 'myFocus',
      component: myFocusComp,
      meta: {title: '我的关注'}
    },
    {
      path: '/personal/myBuyHistory',
      name: 'myBuyHistory',
      component: myBuyHistoryComp,
      meta: { title: '消费记录' }
    },
    {
      path: '/personal/logisticsQuery',
      name: 'logisticsQuery',
      component: logisticsQueryComp,
      meta: {title: '物流查询'}
    },
    {
      path: '/personal/myCoder',
      name: 'myCoder',
      component: myCoderComp,
      meta: {title: '我的二维码'}
    },
    {
      path: '/personal/myInvoice',
      name: 'myInvoice',
      component: myInvoiceComp,
      meta: {title: '我的发票'}
    },
    {
      path: '/personal/myeval',
      name: 'myeval',
      component: myevalComp,
      meta: {title: '我的评价'}
    },
    {
      path: '/personal/redPackets',
      name: 'redPackets',
      component: redPacketsComp,
      meta: {title: '红包'}
    },
    {
      path: '/personal/myShare',
      name: 'myShare',
      component: myShareComp,
      meta: {title: '分享'}
    },
    {
      path: '/personal/my_order',
      name: 'my_order',
      component: myOrderComp,
      meta: {title: '订单'}
    },
    {
      path: '/personal/backMoney',
      name: 'backMoney',
      component: backMoneyComp,
      meta: {title: '返利'}
    },
    {
      path: '/personal/qianbao',
      name: 'qianbao',
      component: qianbaoComp,
      meta: {title: '钱包'}
    },
    {
      path: '/personal/orderDetail',
      name: 'orderDetailComp',
      component: orderDetailComp,
      meta: {title: '订单详情'}
    },
    {
      path: '/personal/querenShouhuo',
      name: 'querenShouhuo',
      component: querenShouhuoComp,
      meta: {title: '确认成功'}
    },
    {
      path: '/personal/liuyan',
      name: 'liuyan',
      component: liuyanComp,
      meta: {title: '留言'}
    },
    {
      path: '/personal/jifenExchange',
      name: 'jifenExchange',
      component: jifenExchangeComp,
      meta: {title: '积分商城'}
    },
    {
      path: '/personal/mySigned',
      name: 'mySigned',
      component: mySignedComp,
      meta: {title: '每日签到'}
    },
    {
      path: '/personal/myJiFen',
      name: 'myJiFen',
      component: myJiFenComp,
      meta: {title: '我的积分'}
    },
    {
      path: '/personal/pingjia',
      name: 'pingjia',
      component: pingjiaComp,
      meta: {title: '评价'}
    },
    {
      path: '/personal/pingjiaChenggong',
      name: 'pingjiaChenggong',
      component: pingjiaChenggongComp,
      meta: {title: '评价成功'}
    }
  ]
})

/**
 *  路由出口
 */
export default router
