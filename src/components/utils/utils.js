import axios from 'axios'
import qs from 'qs'
import {config} from "./pro_config.js"
const configObj = config()

function removeStringSpace(str) {
    if (str === null || str === '' || str.length <= 0 || str === undefined) {
        return ''
    }
    return str.replace(/\s/g, '')
}

export function getQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

function localUserInfo(isWxid) {
    var localUser = localStorage.getItem('personalInfo')
    if (removeStringSpace(localUser) === '') {
        return ''
    } else if (JSON.parse(localUser) === null) {
        return ''
    } else {
        if (isWxid === true) {
            return JSON.parse(localStorage.getItem('personalInfo')).wxid
        } else {
            return JSON.parse(localStorage.getItem('personalInfo'))
        }
    }
}
export function homeUrl() {
    return configObj.homeUrl
}
export function homeUrlMin() {
    return configObj.homeUrlMin
}
export function myDomain() {
    return configObj.myDomain
}
export function linyueru() {
    return 'http://img4.imgtn.bdimg.com/it/u=3211202119,1365000247&fm=27&gp=0.jpg'
}
export function myTools() {
    return {
        'socket_info': {
            'msg': 'msg',
            'serverId': 'jiafuxiang_server',
            'IM': 'im_'
        },
        'date_format': function(currentTime, fmt) { // author: meizz
            var o = {
                'M+': currentTime.getMonth() + 1, // 月份
                'd+': currentTime.getDate(), // 日
                'h+': currentTime.getHours(), // 小时
                'm+': currentTime.getMinutes(), // 分
                's+': currentTime.getSeconds(), // 秒
                'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
                'S': currentTime.getMilliseconds() // 毫秒
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
                }
            }
            return fmt
        },
        'valid_phone': function(str) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (!myreg.test(str)) {
                return false
            } else {
                return true
            }
        },
        'get_local_wxid': localUserInfo(true),
        'get_local_userinfo': localUserInfo(false),
        'set_local_userinfo': function(userInfor) {
            localStorage.setItem('personalInfo', JSON.stringify(userInfor))
        },
        'remove_local_userinfo': function() {
            localStorage.removeItem('personalInfo')
        },
        'my_post': function(url, data, successFn, errorFn) {
            axios.post(homeUrl() + url + '/', qs.stringify(data), { emulateJSON: false }).then(result => { successFn(result) }, error => {
                if (errorFn) {
                    errorFn(error)
                }
            })
        },
        'my_get': function(url, successFn, errorFn) {
            axios.get(homeUrl() + url, { emulateJSON: false }).then(result => { successFn(result) }, error => {
                errorFn(error)
            })
        },
        'fenlei_list_fn': function(fn) {
            if (window.fenlei_list === undefined || window.fenlei_list === '' || !window.fenlei_list) {
                axios
                    .post(homeUrl() + 'allBigFenlei/', qs.stringify({}), { emulateJSON: false })
                    .then(
                        result => {
                            if (result.data.status === 'ok') {
                                window.fenlei_list = result.data.data
                                fn(window.fenlei_list)
                            }
                        },
                        error => {
                            this.$vux.toast.text('网络请求失败....', 'bottom')
                            console.log(error)
                            fn([])
                        })
            } else {
                fn(window.fenlei_list)
            }
        },
        'miaosha_list_fn': function(fn) {
            if (window.miaosha_list === undefined || window.miaosha_list === '' || !window.miaosha_list) {
                axios
                    .post(homeUrl() + 'secondkillManageJsonSelect/', qs.stringify({}), { emulateJSON: false })
                    .then(
                        result => {
                            if (result.data.status === 'ok') {
                                window.miaosha_list = result.data.data
                                fn(window.miaosha_list)
                            }
                        },
                        error => {
                            this.$vux.toast.text('网络请求失败....', 'bottom')
                            console.log(error)
                            fn([])
                        })
            } else {
                fn(window.miaosha_list)
            }
        },
        'getServerDate': function() {
            var xhr = null
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest()
            } else { // ie
                xhr = new window.ActiveObject('Microsoft')
            }
            xhr.open('GET', '/', false) // false不可变
            xhr.send(null)
            var date = xhr.getResponseHeader('Date')
            return new Date(date)
        },
        // 根据时间获取当前的秒杀状态 已完成
        'getStatusByTimes': function(currentTime, startTime, stopTime) {
            var status = ''
            if (currentTime < startTime) {
                status = '未开始'
            }

            if (currentTime >= startTime && currentTime <= stopTime) {
                status = '进行中'
            }

            if (currentTime > stopTime) {
                status = '已结束'
            }
            return status
        },
        // 删除字符串空格
        'removeStringSpace': function(str) {
            if (str === null || str === '' || str.length <= 0 || str === undefined) {
                return ''
            }
            return str.replace(/\s/g, '')
        },
        'replaceAllStr': function (old_str , local_char , new_char) {
            var reg = new RegExp( local_char , "g" )
            var newstr = old_str.replace( reg , new_char );
            return newstr
        }
    }
}
export function getGoodsImg(goodsObj) {
    if (goodsObj === '' || goodsObj === undefined) {
        return linyueru()
    }
    if (goodsObj.product_thumb_image === '' || goodsObj.product_thumb_image === undefined) {
        return linyueru()
    } else {
        return homeUrl() + goodsObj.product_thumb_image
    }
}
export function jsonParamsToStr(jsonObj) {
    if (typeof jsonObj === 'string') {
        jsonObj = JSON.parse(jsonObj)
    }
    var tempStr = ''
    for (var i = 0; i < jsonObj.length; i++) {
        tempStr = tempStr + jsonObj[i].name + ':' + jsonObj[i].value + ' '
    }
    return tempStr
}