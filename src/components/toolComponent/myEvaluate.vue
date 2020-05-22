<template>
    <!-- 图文列表 -->
    <div>
       <div class="evaluateTop" v-show='isHaveTou()'>
           <div class="evaluateTitle">
               <div class="eva-item2">评论</div>              
           </div>
            <!--<checker v-model="evaluates" type="radio" default-item-class="check-item" selected-item-class="check-item-selected">
                <checker-item @on-item-click="onItemClick" :value="item" v-for="(item, index) in evaluateType" :key="index">{{item.value}}</checker-item>
            </checker>-->
       </div>
       <div style="border:1px solid #f6f6f6;" class="user_eval evaluateContent" v-for="(item, index) in evalDatas"  :key="index">
           <div class="eval_top">
               <div class="eval_head"><img :src="isNimingHeaderFn(item)" alt=""></div>
               <div class="eval_name">{{isNimingNameFn(item)}}</div>
               <div class="eval_day">{{item.uptime}}</div>
           </div>
           <div class="eval_goods">
             <pingjia-cell :goods="item.goodsInfo"></pingjia-cell>
           </div>
           <div class="eval_img">
             <pinglun-img :pinglunImgList='getPinglunImg(item.commImg)'></pinglun-img>
           </div>
           <div class="eval_content" >
              <div>{{item.comment_text}}</div>
              <div class="eveal_img">
                  <img class="eveal_img_img"  v-for="(imgs, index) in item.evalImg"  :key="index" :src="imgs" alt="">
                  <div class="eveal_type">
                      <!--<p>{{item.evalTypes}}{{item.evalColor}}，{{item.nums}}</p>-->
                      <!-- <p class="pingjia">购买日期：{{item.buyData}} <span style="padding-left:5%"><img src="static/bottom/tuijian@2x.png" alt="">0</span><span><img src="static/bottom/pingjia@2x.png" alt="">1</span></p> -->
                      
                      <!--<p class="pingjia">购买日期：{{item.buyDate}}</p>-->
                  </div>
              </div>
           </div>
       </div>
    </div>
</template>

<script>

import {Checklist, Checker, CheckerItem} from 'vux'
import pingjiaCell from './pingjiaCell'
import pinglunImg from './pinglunImg'
import {homeUrl} from '../utils/utils.js'
export default {
  components: {
    Checklist,
    Checker,
    CheckerItem,
    pingjiaCell,
    pinglunImg
  },
  props: ['evalDatas', 'hasTou'],
  data () {
    return {
      type: '1',
      evaluates: {
        key: '1',
        value: '全部'
      },
      onlys: ['只看当前商品'],
      radioValues: ['只看当前商品'],
      xianshiEvalDatas: []
    }
  },
  computed: {
  },
  mounted () {
    this.xianshiEvalDatas = this.evalDatas
  },
  methods: {
    getPinglunImg (rowArr) {
      var tempArr = []
      for (var i = 0; i < rowArr.length; i++) {
        tempArr.push(homeUrl() + rowArr[i].img)
      }
      return tempArr
    },
    isNimingHeaderFn (item) {
      if (this.hasTou === 'no') {
        return item.user.headimg
      }
      if (item.niming === 'true') {
        return '../../../static/bottom/account.png'
      }
      return item.user.headimg
    },
    isNimingNameFn (item) {
      if (this.hasTou === 'no') {
        return item.user.nickName
      }
      if (item.niming === 'true') {
        return '匿名'
      }
      return item.user.nickName
    },
    isHaveTou () {
      if (this.hasTou === 'no') {
        return false
      }
      return true
    },
    onItemClick (values) {
      var pinglunType = ''
      switch (values.key) {
        case '1':
          pinglunType = 'all'
          break
        case '2':
          pinglunType = 'haoping'
          break
        case '3':
          pinglunType = 'yiban'
          break
        case '4':
          pinglunType = 'chaping'
          break
        default:
          break
      }
      this.changePinglunArr(pinglunType)
    },
    changePinglunArr (pinglunType) {
      if (pinglunType === '' || pinglunType === 'all') {
        this.xianshiEvalDatas = this.evalDatas
      } else {
        this.xianshiEvalDatas = []
        for (var i = 0; i < this.evalDatas.length; i++) {
          if (this.evalDatas[i].happing === pinglunType) {
            this.xianshiEvalDatas.push(this.evalDatas[i])
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
 .check-item {
    border: 1px solid #ececec;
    padding: 0px 10px;
    margin: 10px;
    margin-top: 10px;
    border-radius: 10px;
    height: 20px;
    width: 50px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .check-item-selected {
    border: 1px solid #E60012;
  }
  .evaluateTop{
    margin-top: 10px;
    border-top: 1px solid #ebebeb;
    background: #ffffff;
    margin-bottom: 1px
  }
  .evaluateTitle{
      display: flex;
          // font-size: 0.75rem;
      border-bottom: 1px solid #ebebeb
  }
  .eva-item1{
      flex: 2
  }
  .eva-item2{
    flex: 1;
    text-align: center;
    line-height: 40px

  }
  .user_eval{
      background: #ffffff;
      padding: 10px;
      font-size: 12px
      // height: 200px;
      
  }
  .eval_top{
      display: flex
  }
  .eval_head{
  width: 60px
  }
  .eval_head img{
      width: 40px;
      height: 40px;
      border-radius: 50%
  }
  .eval_name{
  flex: 1
  }
  .eval_day{
  width: 100px
  }
  .eval_content{
      // padding-left: 60px
      padding-top: 15px;
      padding-bottom: 10px;
  }
  .eveal_type{
      color: #cccccc
  }
  .eveal_img_img{
  width: 90px;
  height: 90px;
  margin-right: 5px
  }
  .pingjia img{
    width: 20px;
    height: 20px; 
    margin-right: 3px;
  }
  .pingjia span{
      text-align: left;
      padding-right:10px
  }

  .eval_goods{
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .eval_img{
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: rgba(0 , 0 , 0 , 0.05);
  }

</style>
