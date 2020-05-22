<template>
  <div>
  <x-header title="我的收藏" >
    <span v-tap="{methods: backFn}" slot="right" type="navicon" size="35">我的</span>
  </x-header> 

    <div class="box" v-for="(item,index) in myFavourite" :key="index">
      <div class="title_div">
        <span>{{item.goods.shopname}}</span>
      </div>
      <div class="news_div">         
                <div class="shou_wraps" @click="shopListDetail(item.goods.goodsid)">
                  <div class="shou_item1" >
                  <img :src="urlList(item.goods)" alt="">
                    
                  </div>
                  <div class="shou_item2">
                    <span class="middle_name_span2 goods_name">{{item.goods.goodsname}}</span>
                    <!--<p class="goods_param" style="color:gray;">{{item.goods.goodsparams1}}，{{item.goods.goodsparams2}}</p>-->
                  </div>
                  <div class="shou_item3">
                    <div class="money_div">
                      ￥{{item.goods.shop_price}}
                    </div>
                    <div class="left_div_bottom1" @click="cancelFavourite(item.id)">
                    取消收藏
                  </div>
                  </div>
                </div>
      </div>
    </div>
            <toast position="middle" v-model="messShow" type="text">{{message}}</toast>
  </div>
</template>

<style scoped>
  .box{
    /* height: 10.625rem; */
    background: white;
    margin-top: .3125rem;
    padding: 0rem .625rem;
  }
  .shou_wraps{
    padding-top: 10px;
    display: flex;
    padding-bottom:10px
    
  }
  .shou_item1{
    /*width:100px */
    width: 24%;
    height: 0;
    overflow: hidden;
    padding-bottom: 24%;
  }
  .shou_item1 img{
  /*height: 4.75rem;
    width: 90px*/
    width: 100%;
  }
  .shou_item2{
    flex: 2;
    margin: auto 5px;
  }
  .shou_item3{
    width: 100px;
    text-align: right;

  }
  /* .news_div{
    padding: 1.25rem 0rem;
  } */
  /* .news_div>div{
    float: left;
  }
  .img_div{
    width: 25%;
  }
  .middle_div{
    width: 35%;
    padding-left: 1.25rem
  }
  .left_div{
    width: 30%;
  }
  .img_div img{
    height: 4.75rem;
    width: 90px
  } */
  .title_div{
    height: 2.875rem;
    line-height: 2.875rem;
    color: #909291;
    border-bottom:1px solid #e7e7e7; 
  } 
  /* .middle_name{
    margin-bottom:.3125rem;
  }
  .middle_name_span1{
    color: rgb(228, 20, 20);
  }
  .middle_name_span3{
    font-size: 0.8rem;
    line-height: 140%;
    color: rgb(112, 112, 112);
  }
  .middle_name_span4{
    font-size: 0.8rem;
    color: rgb(228, 20, 20);
  }
  .middle_span4{
    margin-top: 1rem;
  }

  .left_div_bottom2{
    font-size:0.8rem; 
    border: 1px solid rgb(85, 84, 84);
    margin-top:1.25rem;
    padding: .125rem .3125rem;
    color: rgb(85, 84, 84);
    border-radius:.1875rem;
    float: right;
  }
  .money_div{
    float: right;
  }  */
  .shou_item3 .left_div_bottom1{
    font-size:0.8rem; 
    border: 1px solid red;
    margin-top:1.25rem;
    padding: .125rem .3125rem;
    color:  red;
    border-radius:.1875rem;
    float: right;
  }

  .goods_name , .goods_param{
    overflow: hidden;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
</style>

<script>
import {XHeader, Flexbox, Toast, FlexboxItem, Divider} from 'vux'
import {homeUrl, getGoodsImg} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Divider,
    Toast
  },
  data () {
    return {
      myFavourite: [],
      messShow: false,
      message: '',
      wxOpenId: localStorage.getItem('openid')
    }
  },
  methods: {
    backFn () {
      this.$router.push({name: 'userInfo'})
    },
    requestFavouriteData () {
      var datas = qs.stringify({
        wxid: this.wxOpenId,
        tablename: 'favorite'
      })
      axios
        .post(homeUrl() + 'favoriteAndLookTableManageJsonSelect/', datas, { emulateJSON: true })
        .then(
          result => {
            if (result.data.status === 'ok') {
              this.myFavourite = result.data.data
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    },
    // 图片
    urlList (imgObj) {
      return getGoodsImg(imgObj)
    },
    // 去详情
    shopListDetail (goodsid) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: goodsid
        }
      })
    },
    // 取消收藏
    cancelFavourite (canceld) {
      event.stopPropagation()
      var arr = canceld.split(',')
      var datas = qs.stringify({
        ids: JSON.stringify(arr),
        tablename: 'favorite'
      })
      axios
        .post(homeUrl() + 'cartstableManageJsonDelete/', datas, { emulateJSON: true })
        .then(
          result => {
            if (result.data.status === 'ok') {
              this.messShow = true
              this.message = '取消收藏成功'
              this.requestFavouriteData()
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
    }
  },
  created () {
    this.wxOpenId = localStorage.getItem('openid')
    this.requestFavouriteData()
  },
  updated: function () {
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>