
// 域名
const myDomain = 'gongzhong.huidianit.com'

// 微信网页授权回调地址
const redirectUri = 'http://' + myDomain + '/static/vue-shop/dist/index.html'

// 自己的
// appId: 'wx619c085e365678c4',
// 润东
// appId: 'wxe0df1aa623047849',
// 明川的
// appId: 'wxd789a73b4cea944d',

export function config() {

    return {
        wxAppid: 'wxd789a73b4cea944d' , // 公众号appid
        redirectUri: redirectUri ,  // 微信网页授权回调地址
        redirectUriEncode: encodeURIComponent(redirectUri) ,   
        myDomain: myDomain,
        errorImg: '../static/bootom/1.png',
        loadingImg: '../static/bootom/2.jpg' , 
        homeUrl: 'http://' + myDomain + '/',
        homeUrlMin: 'http://' + myDomain , 
        shanghuKey: 'c920a96414e839d4509c19d6d1741882'  // 微信支付 商户平台号所对应的key值
    }
}






// window.WebIM = websdk

// console.log(window.WebIM)
// console.log(window.WebIM.config)
// console.log(window.WebIM.config.isMultiLoginSessions)

// setTimeout(function () {
//   var WebConn = window.WebIM.connection
//   window.conn = new WebConn({
//     isMultiLoginSessions: window.WebIM.config.isMultiLoginSessions,
//     https: typeof window.WebIM.config.https === 'boolean' ? window.WebIM.config.https : location.protocol === 'https:',
//     url: window.WebIM.config.xmppURL,
//     heartBeatWait: window.WebIM.config.heartBeatWait,
//     autoReconnectNumMax: window.WebIM.config.autoReconnectNumMax,
//     autoReconnectInterval: window.WebIM.config.autoReconnectInterval,
//     apiUrl: window.WebIM.config.apiURL,
//     isAutoLogin: true
//   })
//   var options = {
//     apiUrl: window.WebIM.config.apiURL,
//     user: JSON.parse(localStorage.getItem('personalInfo')).wxid,
//     accessToken: 'YWMtG-mTnjhGEemxi1feYn7ZufXpHvAjEhHphGAxZIrOEKS0lqBgOEUR6aW30ZM_aLdHAwMAAAFpIA1SigBPGgAiIdc1J-1fehDaGlMuscjcstxtTZMKSNIEG_o8YoOGbQ',
//     appKey: window.WebIM.config.appkey,
//     success: function () {},
//     error: function () {}
//   }
//   window.conn.open(options)
//   window.conn.listen({
//     onOpened: function (message) {
//       console.log(message)
//     },
//     onClosed: function (message) {
//       console.log(message)
//     },
//     onTextMessage: function (message) {
//       console.log('收到消息')
//       console.log('开始发射事件')
//       if (window.dispatchEvent) {
//         window.dispatchEvent(window.myEvent)
//       } else {
//         window.fireEvent(window.myEvent)
//       }
//       // var tempData = {
//       //   content: message.data,
//       //   receiveId: myTools().get_local_wxid,
//       //   senderId: myTools().socket_info.serverId,
//       //   status: 0,
//       //   time: myTools().date_format(new Date(), 'yyyy-MM-dd hh:mm:ss')
//       // }
//       // that.msgList.push(tempData)
//       // setTimeout(function () {
//       //   var scrollHeight = that.$('.list_wrap').prop('scrollHeight')
//       //   that.$('.list_wrap').scrollTop(scrollHeight + 2000, 1000)
//       // }, 100)
//     },
//     onFileMessage: function (message) {
//       console.log('//收到文件消息')
//       console.log(message)
//     },
//     onRoster: function (message) {
//       console.log('//处理好友申请')
//       console.log(message)
//     },
//     onOnline: function (message) {
//       console.log('//本机网络连接成功')
//       console.log(message)
//     },
//     onOffline: function (message) {
//       console.log('//本机网络掉线')
//       console.log(message)
//     },
//     onError: function (message) {
//       console.log('//失败回调')
//       console.log(message)
//     },
//     onReceivedMessage: function (message) {
//       console.log('收到消息送达服务器回执')
//       console.log(message)
//     },
//     onDeliveredMessage: function (message) {
//       console.log('收到消息送达客户端回执')
//       console.log(message)
//     }
//   })
// }, 100)