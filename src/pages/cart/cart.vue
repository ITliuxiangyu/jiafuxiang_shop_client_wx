<template>
  <div id="car">
    <x-header title="购物车" style="position:fixed;top:0px;z-index:1000;width:100%" :left-options="{showBack: false}" @on-click-more="show = false">
      <a slot="right">
        <!-- <span style="color:red" v-show="!bianji" @click="bianjiClick">编辑</span>
        <span style="color:red" v-show="bianji" @click="bianjiClick">完成</span> -->
        <!-- <img width="20" src="static/cart/Trash@2x.png" alt=""> -->
      </a>
    </x-header> 
    <div class="zhu_page" v-show="isyou" style="margin-top:46px;">
      <div class="shop_items">
        <div class="shops_" v-for="(item,index) in cartListData" :key="index" :value="item">
          <div class="shop_name">
            <!-- <check-icon :value.sync="demo1" type="plain" class="check" @click.native="clicking()"></check-icon> -->
            {{item.goods.shopname}}
          </div>
          <div class="shop_list" >
            <div class="shop_check" @click="mycheckFn(item)">
              <check-icon   :value.sync="item.ischeck" type="plain"></check-icon>
            </div>
            <div class="shop_img"><img :src="urlList(item.goods)" alt=""></div>
            <div class="shop_info">
              <div class="goods_name">{{item.goods.goodsname}}</div>                    
              <div class="shop_day">{{canshu_fn(JSON.parse(item.params))}}</div>
              <div style="margin-top:-15px">
                <group>
                  <x-number @on-change="changeNum(item)" v-model="item.number" button-style="round" :min="1"></x-number>
                </group>
              </div>
            </div>
            <div class="shop_right">
              <div style="font-size:9px; color:red;">￥{{item.goods.shop_price}}</div>
              <div class="dele" v-tap="{methods:deleCartTip , cartsid:item.cartsid}"><img src="static/cart/Trash@2x.png" alt=""></div>
            </div>
            <!-- 删除提示 -->         
          </div>
        </div>
      </div>
      <!-- 为你推荐 -->
      <div class="myrecommend">
        <p class="set-p">为你~推荐</p>
        <shoplist-page :shoplistData="shoplistData" style="margin-top:10px"></shoplist-page>
      </div>
      <!-- 底部操作 -->
      <div class="car_del_totle">
        <label> 
          <input type="checkbox" style="width: 1.6rem;height: 1.6rem;vertical-align:middle;margin-left:1rem;" name="" @click="checkAll" id="">
        </label>
        <div class="car_money">合计：￥{{totalPrice}}</div>
        <div class="car_totle" v-tap="{methods:go_confirms}">
          <span>结算</span>
        </div>
      </div>
    </div>
    <div class="cart_wrap" v-show='!isyou' style="margin-top:46px">
      <img src="static/cart/gwbg@2x.png" alt="">
      <div>
        <x-button mini plain class="go_choose" @click.native="go_home">马上去挑选</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {homeUrl, myTools, getGoodsImg} from '../../components/utils/utils.js'
  import shoplistPage from '../../components/toolComponent/shoplistPage'

  import {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XButton,
    XHeader,
    XNumber,
    Toast,
    Checker,
    CheckerItem,
    CheckIcon,
    Confirm,
    Alert,
    TransferDomDirective as TransferDom
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      XButton,
      XHeader,
      XNumber,
      CheckIcon,
      Toast,
      CheckerItem,
      Checker,
      Confirm,
      Alert,
      shoplistPage
    },
    data () {
      return {
        roundValue: 1,
        demo1: false,
        cartListData: [],
        text: '',
        checkData: [],
        checkDatas: [],
        demo1Checkbox: [2, 1],
        test: true,
        checked: false,
        totalPrice: 0.0,
        deleMessage: '你确定要删除吗?',
        delTile: '温馨提示',
        isyou: true,
        bianji: false,
        checkedData: [],
        deletCartId: '',
        shoplistData: [],
        wxOpenId: localStorage.getItem('openid'),
        mycheck: false
      }
    },

    methods: {
      canshu_fn (item) {
        var resultStr = ''
        for (var i = 0; i < item.length; i++) {
          resultStr = resultStr + item[i].name + ':' + item[i].value + ' '
        }
        return resultStr
      },
      mycheckFn (item) {
        if (item.ischeck === true) {
          this.$data.totalPrice = this.$data.totalPrice + item.goods.shop_price * item.number
        } else {
          this.$data.totalPrice = this.$data.totalPrice - item.goods.shop_price * item.number
        }
      },
      bianjiClick () {
        if (this.bianji === true) {
          return (this.bianji = false)
        }
        if (this.bianji === false) {
          return (this.bianji = true)
        }
      },
      // 请求购物车列表[]
      cartList () {
        var that = this
        myTools().my_post('cartstableManageJsonSelect', {
          wxid: myTools().get_local_wxid
        }, function (result) {
          if (result.data.length > 0) {
            that.isyou = true
            that.$data.cartListData = result.data
            for (var i = 0; i < that.$data.cartListData.length; i++) {
              that.$data.cartListData.ischeck = false
            }
            that.myRecommend()
          } else {
            that.$data.isyou = false
          }
          that.$vux.loading.hide()
        })
      },
      // 图片处理
      urlList (imgObj) {
        return getGoodsImg(imgObj)
      },
      // 购物车数量修改
      changeNum (item) {
        var that = this
        myTools().my_post('cartstableManageJsonUpdate', {
          number: item.number,
          cartsid: item.cartsid
        }, function (result) {
          if (result.data.status === 'ok') {
            that.$data.totalPrice = 0
            for (var i = 0; i < that.$data.cartListData.length; i++) {
              if (that.$data.cartListData[i].ischeck === true) {
                that.$data.totalPrice = that.$data.totalPrice + that.$data.cartListData[i].goods.shop_price * that.$data.cartListData[i].number
              }
            }
          } else {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            setTimeout(function () {
              window.location.reload()
            }, 200)
          }
        })
      },
      deleCartTip (params) {
        var that = this
        this.$vux.confirm.show({
          title: '警告',
          content: '确定要删除吗?',
          onCancel () {
          },
          onConfirm () {
            that.deleCart(params.cartsid)
          }
        })
      },
      // 从购物车删除商品
      deleCart (cartId) {
        this.$vux.loading.show({
          text: 'loaing...'
        })
        var that = this
        myTools().my_post('cartstableManageJsonDelete', {
          ids: JSON.stringify([cartId]),
          tablename: 'carts'
        }, function (result) {
          if (result.data.status === 'ok') {
            var deleteIndex = 'aaa'
            for (var i = 0; i < that.$data.cartListData.length; i++) {
              if (that.$data.cartListData[i].cartsid === cartId) {
                deleteIndex = i
                break
              }
            }
            if (deleteIndex !== 'aaa') {
              that.$data.cartListData.splice(deleteIndex, 1)
            }
            if (that.$data.cartListData.length === 0) {
              that.$data.isyou = false
            }
          }
          that.$vux.loading.hide()
        })
      },
      onCancel () {
      },
      onConfirm () {
        var arr = this.deletCartId.split(',')
        this.deleCart(arr)
      },
      // 去挑选
      go_home () {
        this.$router.push({
          name: 'classify'
        })
      },
      onHide () {
      },
      onShow () {
      },
      // 全选
      checkAll (event) {
        if (!event.currentTarget.checked) {
          this.$data.totalPrice = 0
          for (var i = 0; i < this.$data.cartListData.length; i++) {
            this.$data.cartListData[i].ischeck = false
          }
        } else {
          this.$data.totalPrice = 0
          for (var j = 0; j < this.$data.cartListData.length; j++) {
            this.$data.cartListData[j].ischeck = true
            this.$data.totalPrice = this.$data.totalPrice + this.$data.cartListData[j].goods.shop_price * this.$data.cartListData[j].number
          }
        }
      },
      // 去结算
      go_confirms (params) {
        var parmamsArr = []
        for (var i = 0; i < this.$data.cartListData.length; i++) {
          if (this.$data.cartListData[i].ischeck === true) {
            var parmamsObj = {}
            parmamsObj.number = this.$data.cartListData[i].number
            parmamsObj.params = this.$data.cartListData[i].params
            parmamsObj.shopname = this.$data.cartListData[i].goods.shopname
            parmamsObj.freightPrice = this.$data.cartListData[i].goods.transportmoney
            parmamsObj.freightRiskPrice = this.$data.cartListData[i].goods.transportmoney
            parmamsObj.goodsimage = homeUrl() + this.$data.cartListData[i].goods.product_thumb_image
            parmamsObj.keywords = this.$data.cartListData[i].goods.keywords
            parmamsObj.goodsname = this.$data.cartListData[i].goods.goodsname
            parmamsObj.goodsid = this.$data.cartListData[i].goods.goodsid
            parmamsObj.goodsprice = this.$data.cartListData[i].goods.shop_price
            parmamsObj.goods = this.$data.cartListData[i]
            parmamsArr.push(parmamsObj)
          }
        }
        if (parmamsArr.length > 0) {
          this.$router.push({
            name: 'order_confirm',
            params: {
              comfirGoodsInfo: parmamsArr,
              goodsMonery: this.$data.totalPrice
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '请至少选择一个商品'
          })
        }
      },
      // 单选商品
      checkItem (item) {
        var self = this
        this.checked = true
        self.totalPrice = 0
      },
      // 为你推荐
      myRecommend () {
        var that = this
        myTools().my_post('getRecommendGoods', {}, function (result) {
          if (result.data.status === 'ok') {
            var newGooods = result.data.data
            var searchArr = []
            for (var i = 0; i < newGooods.length; i++) {
              searchArr.push(newGooods[i].goods)
            }
            that.shoplistData = searchArr
          }
        })
      }
    },
    watch: {
    },
    created () {
      this.$vux.loading.show({
        text: 'loading'
      })
      this.cartList()
    },
    mounted: function () {
      this.$('.car_del_totle').css({
        'width': '100%',
        'height': '50px',
        'position': 'fixed',
        'bottom': this.$('.weui-tabbar').outerHeight() + 'px',
        'background': 'white',
        'line-height': '50px'
      })
      this.$('.zhu_page').css({
        'overflow': 'scroll',
        'height': this.$(window).height() - this.$('.vux-header').outerHeight() - this.$('.weui-tabbar').outerHeight() - this.$('.car_del_totle').outerHeight() + 'px'
      })
    },
    deactivated: function () {
      // this.$destroy()
    }
  }
</script>
<style scoped>
  .d-item {
    background: url("/static/cart/duin@2x.png");
    width: 1.875rem;
    height: 1.875rem;
    border: 1px solid #cccc;
    border-radius: 50%;
    background-size: 1.875rem;
  }
  .d-item-selected {
    background: url(/static/cart/dui@2x.png);
    width: 1.875rem;
    height: 1.875rem;
    background-size: 1.875rem;
  }
  #car{
    background-color: white;
    overflow: hidden;
  }
  .cart_wrap {
    /*background: url(/static/cart/gwbg@2x.png);*/
    /*background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 43rem;
    position: relative;*/
    /*background-color: yellow;*/
    /*height: 3000px;*/
    /*text-align: center;*/
  }
  .cart_wrap img{
    width: 100%;
  }
  .cart_wrap div{
    height: 300px;
    /*background-color: yellow;*/
    position: absolute;
    top: 100px;
    text-align: center;
    width: 100%;
  }
  .go_choose {
    /*position: absolute;
    top: 30rem;
    left: 10rem;*/
  }
  /* 购物车列表 */
  .shop_items {
    width: 100%;
    background: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
  }
  .shops_ {
    width: 95%;
  }
  .shop_name {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgb(236, 235, 235);
    line-height: 40px;
    margin: 0;
    padding: 0;
    padding-left: 20px;

  }
  .shop_list {
    display: flex;
    /* background: pink; */
    height: 135px;
    border-bottom: 1px solid rgb(236, 235, 235);
  }
  .shop_check {
    width: 35px;
    line-height: 135px;
  }
  .shop_img {
    width: 100px;
    margin-right: 5px;
    padding-top: 15px;
    overflow: hidden;
  }
  .shop_img img {
    width: 95px;
    /*height: 95px;*/
  }
  
  .shop_info {
    flex: 1;
    padding-top: 15px;
  }
  .shop_right {
    width: 50px;
    padding-top: 15px;
    padding-left: 10px;
  }
  .shop_right img {
    width: 25px;
    height: 25px;
  }
  .checks {
    width: 50px;
    height: 50px;
    line-height: 100px;
  }
  .shop_info span {
    color: #ed393d;
    margin-right: 5px;
  }
  .shop_day {
    color: #888;
    font-size: 12px;
    margin-top: 5px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    
  }
  .dele {
    float: right;
    padding-top: 55px;
    padding-right: 8px;
  }

  .totle {
    float: right;
  }
  .car_money {
    height: 100%;
    margin-left: 2rem;
    display: inline-block;
  }
  .car_totle {
    float: right;
    right: 0px;
    height: 100%;
    width: 8.25rem;
    color: #ffffff;
    text-align: center;
    background: #ed393d;
  }
  .car_del {
    float: right;
    height: 100%;
    width: 8.25rem;
    color: #fa0606;
    text-align: center;
    background: #f3f3d4;
    border: 1px solid #dad5d5;
  }
  .myrecommend {
    margin-top: 10px;
    /* margin-bottom: 60px; */
  }
  .myrecommend .set-p {
    text-align: center;
    color: #fa0606;
    font-weight: 600;
  }
  #checks {
    width: 1.875rem;
    height: 1.875rem;
    border: 1px solid #cccc;
    border-radius: 50%;
  }
  #checks input[type="checkbox"] {
    width: 100%;
    height: 100%;
    border-radius: 50% !important;
    border: none;
    background: #ffffff;
  }

  .goods_name{
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
  }
</style>
