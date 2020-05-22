<template>
  <div class="faxianWrap">   
     <x-header title="发现" style="position:fixed;top:0px;z-index:1000;width:100%" ></x-header> 


    <div style="margin: 10px;overflow: hidden;margin-top:46px" v-for="(item,index) in list" :key="index">
      <a :href="item.urls">
        <masker style="border-radius: 2px;">
        <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
        <div slot="content" class="m-title">
          {{item.title}}
          <br/>
          <span class="m-time">{{item.activeTime}}</span>
        </div>
      </masker>
      </a>
    </div>
  </div>

</template>

<script>
import {Masker, XHeader} from 'vux'
import {homeUrl} from '../../components/utils/utils.js'
export default {
  components: {
    Masker,
    XHeader
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    findListReq () {
      this.$http.get(homeUrl() + 'activeManageJsonSelect/').then(
        result => {
          if (result.data.status === 'ok') {
            var findArr = []
            const dataList = result.data.data
            for (var i = 0; i < dataList.length; i++) {
              var findObj = {}
              findObj.title = dataList[i].activedetail
              findObj.img = homeUrl() + 'static/myfile/' + dataList[i].imgs
              findObj.urls = dataList[i].activeAddress
              findObj.activeTime = dataList[i].starttime
              findArr.push(findObj)
            }
            this.list = findArr
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
    this.$nextTick(function () {
      // 计算发现滚动区域的高度
      var faxianWrapPaddingTop = this.$('.faxianWrap').css('padding-top').replace('px', '')
      faxianWrapPaddingTop = parseInt(faxianWrapPaddingTop)
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      var tabHeight = this.$('.weui-tabbar').outerHeight()
      this.$('.faxianWrap').height(windowHeight - headerHeight - tabHeight - faxianWrapPaddingTop)
    })
    this.findListReq()
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>


<style lang='less'>

  /* 整个滚动区域 */
  .faxianWrap{
    padding-top: 10px;
    overflow: scroll;
  }

  /* 每一个列表样式 */
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>