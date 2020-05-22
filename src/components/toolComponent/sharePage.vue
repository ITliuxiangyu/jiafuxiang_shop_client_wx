<template>
<!-- 列表形式 -->
    <div id="shareList_wrap"> 
        <div class="shareList_contents" v-for="(item,index) in shareList" :key="index" >
            <div class="shareList_img" @click="shopListDetail(item.goodsid)">
                <img :src="item.src" alt="">
            </div>
            <div class="shareList_detail">
               <div class="shareList_desc">{{item.title}},{{item.desc}}</div>
               <div class="shareList_spans"><span>{{item.keyWorlds}}</span></div>
               <div class="shareList_prices">￥{{item.shop_price}} <span>{{item.rebate}}</span></div>
               <div class="shareList_others"> 20条评价 &nbsp;98%好评</div>
               <div class="deleData" @click="deleData(item.buyid,item.item.buyid)">删除记录</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Panel } from 'vux'
import { myTools } from '../utils/utils'
// import axios from 'axios'
// import qs from 'qs'
export default {
  components: {
    Panel
  },
  props: ['shareList'],
  methods: {
    shopListDetail (goodsId) {
      this.$router.push({
        name: 'goods_detail',
        params: {
          goodsId: goodsId
        }
      })
    },
    //   删除分享记录
    deleData (buyid, shareid) {
      if (buyid !== undefined) {
        myTools().my_post('buyhistoryDelete', {
          buyid: buyid
        }, function (result) {
          if (result.data.status === 'ok') {
            this.$vux.toast.text('删除成功', 'center')
          }
        }, function (error) {
          this.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        })
      }
      // 分享记录删除
      if (shareid !== undefined) {
        myTools().my_post('delShare', {
          shareid: shareid
        }, function () {
        }, function (error) {
          this.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        })
      }
    },
    requestShareList () {
      myTools().my_post('findShare', {
        wxid: myTools().get_local_userinfo.wxid
      }, function () {
      }, function (error) {
        this.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      })
    }
  },
  data () {
    return {
      type: '1'
    }
  },
  computed: {}
}
</script>
<style scoped>
#shareList_wrap{
    margin: 50px 0.5rem;
}
.shareList_contents{
    display: flex;
    margin-top:0.1rem; 
    border-radius: 5px;
    padding: 6px;
    background: #ffffff
}
.shareList_img{
    width: 110px;
}
.shareList_img img{
    width: 100px;
    height: 100px;
}
.shareList_detail{
    flex: 1;
    position: relative
}
.shareList_spans span{
    display: inline-block;
    background: #f4f4f4;
    margin: 1px;
    font-size: 8px;
    color: #666
}
.shareList_prices{
    font-size: 16px;
    color: #ed393d
}
.shareList_prices span{
 display: inline-block;
 padding: 0px 0.5rem;
    background: #ed393d;
    margin: 1px;
    border-radius: 10px;
    font-size: 8px;
    color: #ffffff
}
.shareList_desc{
    font-size: 14px;
     display: -webkit-box;  
  word-break: break-all;  
  text-overflow: ellipsis;  
  -webkit-box-orient: vertical;  
  -webkit-line-clamp: 2;
  overflow: hidden
}
.shareList_others{
    font-size: 10px;
    color: #666
}
.deleData{
    font-size:0.8rem; 
  border: 1px solid red;
  margin-top:1.25rem;
  padding: .125rem .3125rem;
  color:  red;
  border-radius:.1875rem;
  position: absolute;
  bottom: 20px;
  right: 0;
}
</style>
