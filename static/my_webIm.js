//判断是否是微信浏览器的函数
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


var WebConn = window.WebIM.connection

var wxid = ''


if (isWeiXin()) {
} else {　　
    alert('在微信浏览器中打开该链接')
}


window.conn = new WebConn({
    isMultiLoginSessions: window.WebIM.config.isMultiLoginSessions,
    https: typeof window.WebIM.config.https === 'boolean' ? window.WebIM.config.https : location.protocol === 'https:',
    url: window.WebIM.config.xmppURL,
    heartBeatWait: window.WebIM.config.heartBeatWait,
    autoReconnectNumMax: window.WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: window.WebIM.config.autoReconnectInterval,
    apiUrl: window.WebIM.config.apiURL,
    isAutoLogin: true
})

function huanxin_regist () {
    var options = { 
        username: wxid,
        password: '123456',
        nickname: 'nick' + wxid,
        appKey: window.WebIM.config.appkey,
        success: function (suc) {
            console.log('注册成功')
            console.log(suc)
        },  
        error: function (err) {
            console.log('注册失败')
            console.log(err)
        }, 
        apiUrl: window.WebIM.config.apiURL
    }
    window.conn.registerUser(options)
    huanxin_login_pwd()
}

function huanxin_login_token() {
    var webIM_token = ''
    var webIM_wxid = 'webim_' + JSON.parse(localStorage.getItem('personalInfo')).wxid
    webIM_token = window.WebIM.utils.getCookie(webIM_wxid)[webIM_wxid]
    var options = {
        apiUrl: window.WebIM.config.apiURL,
        user: wxid,
        accessToken: webIM_token,
        appKey: window.WebIM.config.appkey,
        success: function() {},
        error: function() {
            huanxin_login_pwd()
        }
    }
    window.conn.open(options)
}

function huanxin_login_pwd() {
    var options = {
        apiUrl: window.WebIM.config.apiURL,
        user: wxid,
        pwd: '123456',
        appKey: window.WebIM.config.appkey,
        success: function(token) {
            var token = token.access_token;
            window.WebIM.utils.setCookie(webIM_wxid, 1);
        },
        error: function() {}
    }
    window.conn.open(options)
}
window.conn.listen({
    onOpened: function(message) {
        console.log(message)
    },
    onClosed: function(message) {
        console.log(message)
    },
    onTextMessage: function(message) {
        if (location.hash == '#/personal/kefuMsg') {
            if (window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('kefu_page_event', {
                    detail: {
                        'info': message
                    }
                }))
            } else {
                window.fireEvent(new CustomEvent('kefu_page_event', {
                    detail: {
                        'info': message
                    }
                }))
            }
        }

        if (location.hash == '#/appHome/home') {
            if (window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('home_page_event', {
                    detail: {
                        'info': message
                    }
                }))
            } else {
                window.fireEvent(new CustomEvent('home_page_event', {
                    detail: {
                        'info': message
                    }
                }))
            }
        }
    },
    onFileMessage: function(message) {
        console.log('//收到文件消息')
        console.log(message)
    },
    onRoster: function(message) {
        console.log('//处理好友申请')
        console.log(message)
    },
    onOnline: function(message) {
        console.log('//本机网络连接成功')
        console.log(message)
    },
    onOffline: function(message) {
        console.log('//本机网络掉线')
        console.log(message)
    },
    onError: function(message) {
        console.log('//失败回调')
        console.log(message)
    },
    onReceivedMessage: function(message) {
        console.log('收到消息送达服务器回执')
        console.log(message)
    },
    onDeliveredMessage: function(message) {
        console.log('收到消息送达客户端回执')
        console.log(message)
    }
})