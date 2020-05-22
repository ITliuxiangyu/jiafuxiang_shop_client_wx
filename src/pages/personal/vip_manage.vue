
<template>  

  <div>  
    <!-- top -->
    <x-header title="我的团队" :right-options="{showMore: false}"></x-header> 

    <div class="vip_top">
      <div class="vip_img">
        <img style="border-radius:4px;"  :src="user_info.headimg">  
      </div>
      <div class="span_font1"><span>{{user_info.nickName}}</span></div>
      <div class="span_font2"><span>您是嘉福祥的天使会员</span></div>
    </div>

    <!-- 我得团队 -->
    <div class="my_team">
      <span>我的团队</span>
    </div> 

      <!-- vip牌 -->
      <div class="my_vip">
        <div v-tap="{methods:jinzhuan_fn}" class="jin_vip"><span>金钻会员</span></div>
        <div v-tap="{methods:yinzhuan_fn}" class="yin_vip"><span>银钻会员</span></div>
      </div>

      <!-- team li -->
<div style="clear:both;"></div>
      <div class="team_li">
            <flexbox v-for="(item, index) in xiaji"  :key="index">
              <flexbox-item>
                <div class="flex-demo">
                  <img style="border-radius:4px;" :src="item.headimg" alt="">
                  <div class="team_li_name">
                    <span>{{item.nickName}}</span>
                  </div>
                </div>
                </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <div class="youhaodu_div">
                    <div> <img  src="static/bottom/youhaodu.png" alt=""></div>
                   
                    <div>
                      <div><span>友好度</span></div>
                      <div><span>99%</span></div>
                    </div>
                  </div>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                    <div class="left_div">
                      <img src="static/bottom/hetaliaotian.png" alt="">
                    </div>
                </div>
              </flexbox-item>
           </flexbox>
      </div>
      
  </div>

</template>  

<script>
import {Flexbox, FlexboxItem, Divider, XHeader} from 'vux'
import {myTools, getGoodsImg} from '../../components/utils/utils.js'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XHeader
  },
  data () {
    return {
      user_huiyuan: '',
      xiaji: [],
      user_info: myTools().get_local_userinfo
    }
  },
  methods: {
    // 获取会员信息方法
    get_user_huiyuan: function (resultFn) {
      var that = this
      if (this.$data.user_huiyuan === '') {
        console.log('用户id')
        console.log(myTools().get_local_wxid)
        myTools().my_post('getUserShangxiaji', {
          wxid: myTools().get_local_wxid
        }, function (result) {
          if (result.data.status === 'ok') {
            that.user_huiyuan = result.data.data
          }
          resultFn()
        })
      } else {
        resultFn()
      }
    },
    // 金钻会员 按钮方法
    jinzhuan_fn: function () {
      var that = this
      that.get_user_huiyuan(function () {
        that.xiaji = that.user_huiyuan.xiaji
        console.log('0000')
        console.log(that.xiaji)
        if (that.xiaji === undefined || that.xiaji.length === 0) {
          that.$vux.toast.text('请邀请好友....', 'center')
        }
      })
    },
    // 银钻会员 按钮方法
    yinzhuan_fn: function () {
      var that = this
      that.get_user_huiyuan(function () {
        that.xiaji = that.$data.user_huiyuan.xiaxiaji
        if (that.xiaji === undefined || that.xiaji.length === 0) {
          that.$vux.toast.text('请邀请好友....', 'center')
        }
      })
    },
    // 图片方法
    urlList (imgObj) {
      return getGoodsImg(imgObj)
    }
  }
}
</script>  

<style lang="">


  .vip_top{
    width:100%;
    height:8.8125rem;

    background:#ffffff;
  }
  .vip_img{
        padding-top:1rem; 
    margin-left:calc(50% -  1.7rem);
  }
  .vip_img img{
    
    width: 3.8125rem;
  }
  .span_font1,.span_font2{
    text-align: center;
  }
  .span_font1{
    font-size: .9375rem;
    color: #333333;
  }
    .span_font2{
    font-size: .625rem;
    color: #666666;
  }
  .my_team{
    margin: .375rem .25rem .375rem .25rem;
    padding-left:calc(50% - 1.6rem); 
    border-radius: 5px;
    font-size: .625rem;
    background: #ffffff;
  }
  .my_team_img{
      float: right;
      color: #333333;
  }
  .my_team_img img{
      width: .8125rem;
      height: .4375rem;
      margin-right: .6875rem;
  }
  .my_vip{
    margin: .3125rem 0px .3125rem .2125rem;
  }
  .jin_vip{
    background: linear-gradient(to right, #48E1CA,#48B9E1); /* 标准的语法（必须放在最后） */
  }
  .yin_vip{
    background: linear-gradient(to left, #48E1CA,#48B9E1); /* 标准的语法（必须放在最后） */
  }
  .jin_vip,.yin_vip{
    margin: .3125rem;
    float: left;
    width: 47%;
    height: 3.8125rem;
    border-radius:.625rem ;
    font-size: .9375rem;
    color: white;
    text-align: center;
    line-height: 3.8125rem;
  }
  .flex-demo {
    height: 4.75rem;
    text-align: center;
    color: #333333;
    /* background-colo; */
    border-radius: 4px;
    /* background-clip: padding-box; */
  }

  .team_li{
    margin:.375rem; 
    background: #ffffff;
    border-radius:5px; 
    margin-top: .3125rem;
  }
  .team_li img{
    width: 2.875rem;
    margin-top: .3125rem;
  }
  .team_li_name{
    font-size: .625rem;
  }
  .youhaodu_div>div{
    float: left;
    font-size: .625rem;
    padding-top: 1.1325rem;
    padding-left: 0.5rem;
  }
  .youhaodu_div img{
      width: 2.0625rem;
  }
  .left_div img{
      width: 1.9375rem;
      margin-top:1.3rem ;
      margin-left: 4.5rem;
  }
</style>