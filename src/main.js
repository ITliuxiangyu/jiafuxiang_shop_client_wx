import Vue from 'vue'
import Vuex from 'vuex'
import {AjaxPlugin, AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin, XCircle} from 'vux'
import router from './router'
import App from './App'
import axios from 'axios'
import 'vue-material-design-icons/styles.css'
import vueTap from 'v-tap'
import $ from 'jquery'
import {homeUrl, getQueryString} from './components/utils/utils.js'
import {config} from './components/utils/pro_config.js'
import VueLazyLoad from 'vue-lazyload'
import {VueHammer} from 'vue2-hammer'
import wx from 'weixin-js-sdk'
// import websdk from 'easemob-websdk'




var configObj = config()


Vue.use(VueHammer)
Vue.use(VueLazyLoad, {
  error: configObj.errorImg,
  loading: configObj.loadingImg
})


/*
  环信 webIM 通信的代码 在 ./components/utils/pro_config.js 文件中
*/

/**
 * 加载插件
 */
Vue.use(vueTap)
Vue.use(Vuex)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
/**
 * 设置vuex
 */

Vue.prototype.$ajax = axios
Vue.prototype.$ = $
const store = new Vuex.Store({})

window.wx = wx
Vue.prototype.wx = wx
Vue.prototype.wxAppid = configObj.wxAppid
Vue.prototype.redirectUriEncode = configObj.redirectUriEncode
Vue.prototype.shanghuKey = configObj.shanghuKey
Vue.prototype.myDomain = configObj.myDomain




function configWxJSSDK(){
  $.get(homeUrl() + 'wxjssdk/', {url: location.href.split('#')[0]}, function (data) {
    window.wx.config({
      debug: false,
      appId: configObj.wxAppid,
      timestamp: data.timestamp + '',
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'chooseImage',
        'uploadImage',
        'scanQRCode',
        'onMenuShareAppMessage',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'translateVoice',
        'onMenuShareTimeline',
        'onMenuShareQZone',
        'onMenuShareQQ'
      ]
    })
    var userInfo = JSON.parse(localStorage.getItem('personalInfo'))
    var fenxiangTitle = '嘉福祥商城'
    var fenxiangDesc = '这是一个购物的天堂,你想要的都在这里'
    var fenxiangLink = userInfo ? (configObj.redirectUri + '?wxid=' + userInfo.wxid) : ''
    var fenxiangImgUrl = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=902997215,1986506219&fm=27&gp=0.jpg'
  
    window.wx.ready(function () {
     
      // 分享到朋友圈  老方法
      window.wx.onMenuShareTimeline({
        title: fenxiangTitle,
        link: fenxiangLink,
        imgUrl: fenxiangImgUrl,
        success: function (res) {
          // that.addShareData('微信朋友圈分享')
          // that.addUserJiFen('20')
        }
      })
  
      // 分享到朋友 老方法
      window.wx.onMenuShareAppMessage({
        title: fenxiangTitle,
        desc: fenxiangDesc,
        link: fenxiangLink,
        imgUrl: fenxiangImgUrl,
        success: function () {
          // that.addShareData('微信好友分享')
          // that.addUserJiFen('20')
        },
        cancel: function () {
          alert('用户取消分享')
        }
      })
  
      // 分享到qq
      window.wx.onMenuShareQQ({
        title: fenxiangTitle,
        desc: fenxiangDesc,
        link: fenxiangLink,
        imgUrl: fenxiangImgUrl,
        success: function () {
          alert('分享到qq成功')
        },
        cancel: function () {
          alert('用户取消分享到qq')
        }
      })
  
      // 分享到qq空间
      window.wx.onMenuShareQZone({
        title: fenxiangTitle,
        desc: fenxiangDesc,
        link: fenxiangLink,
        imgUrl: fenxiangImgUrl,
        success: function () {
          alert('分享到qq成功')
        },
        cancel: function () {
          alert('用户取消分享到qq')
        }
      })
      
    })
    window.wx.error(function (res) {
      alert('配置失败')
      alert(JSON.stringify(res))
    })
  })
}


var huoquWxid = getQueryString('wxid')

if (huoquWxid && localStorage.getItem('fenxiangren')) {
  localStorage.setItem('fenxiangren', huoquWxid)
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + configObj.wxAppid + '&redirect_uri=' + configObj.redirectUriEncode + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
} else {

  var code = getQueryString('code')
  if (code) {

      $.ajax({
          type: "POST",
          url: configObj.homeUrl + 'getOpenidByCode_new_fn/',
          data: "code=" + code,
          success: function(result) {
            configWxJSSDK()
            if (result.status === 'ok') {
                localStorage.setItem('personalInfo', JSON.stringify(result.data))
                
                if (localStorage.getItem('fenxiangren')) {
                    var current_wxid = result.data.wxid
                    if (result.data.is_first_register == 'true') {
                        huanxin_regist()
                    } else {
                        huanxin_login_token()
                    }
                    if (current_wxid == localStorage.getItem('fenxiangren')) {} else {
                        $.ajax({
                            type: 'POST',
                            url: '/addUserShangjiNewFn/',
                            data: 'wxid=' + current_wxid + '&upperson=' + localStorage.getItem('fenxiangren'),
                            success: function(chenggong) {
                                localStorage.removeItem('fenxiangren')
                            },
                            error: function(err) {
                                localStorage.removeItem('fenxiangren')
                            }
                        })
                    }
                } else {
                    localStorage.removeItem('fenxiangren')
                }
            } else {
                // alert("1111111")
                // alert('获取用户信息失败,请关闭页面重新进入')
                // alert(JSON.stringify(result))
            }
          },
          error: function(error) {
              // alert("222222")
              alert('错误: 获取用户信息失败,请关闭页面重新进入')
              alert(JSON.stringify(error))
          }
      });
  }
}


store.registerModule('vux', {
  state: {
    loading: false,
    showBack: true,
    title: '',
    number: ''
  },
  mutations: {
    updateLoading (state, loading) {
      state.loading = loading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateTitle (state, title) {
      state.title = title
    },
    updateNumber (state, number) {
      let num = ''
      if (number <= 0) {
        state.number = num
      } else {
        num = number.toString()
        state.number = num
      }
    }
  }
})

/**
 * 公用组件
 */
Vue.component('x-circle', XCircle)

Vue.prototype.updateTitle = function (value) {
  this.$store.commit('updateTitle', value)
}
/**
 *  日志输出开关
 */
// Vue.config.productionTip = true
/**
 *  点击延迟
 */
// FastClick.attach(document.body)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
