<template>
  <div class="msg_page">
    <x-header title="客服消息"  @on-click-more="show = true"></x-header> 
    <div class="msg_page_wrap">

      <div class="list_wrap">

        <div class="one_msg" v-for="(item, index) in msgList">
          <msgCell :item="item"></msgCell>
        </div>

      </div>

      <div class="my_bottom">
        <msgBottom v-on:sendMsg="sendMsg"></msgBottom>
      </div>
    </div>
  </div>
</template>

<script>
import {XButton, XInput, XHeader} from 'vux'
import {myTools} from '../../components/utils/utils.js'
import msgCell from '../../components/toolComponent/msgCell.vue'
import msgBottom from '../../components/toolComponent/msgBottom.vue'

export default {
  directives: {
  },
  components: {
    XButton,
    XInput,
    XHeader,
    msgCell,
    msgBottom
  },
  methods: {
    onItemClick (value, disabled) {
      if (!this.disabled) {
        this.showPopup = false
      }
    },
    sendMsg (value) {
      var that = this
      var id = window.conn.getUniqueId() // 生成本地消息id
      var MyMessage = window.WebIM.message
      var msg = new MyMessage('txt', id) // 创建文本消息
      msg.set({
        msg: value,                  // 消息内容
        to: myTools().socket_info.serverId,                          // 接收消息对象（用户id）
        roomType: false,
        success: function (id, serverMsgId) {
          console.log('发送消息成功')
          var tempData = {
            content: value,
            receiveId: myTools().socket_info.serverId,
            senderId: myTools().get_local_wxid,
            status: 0,
            time: myTools().date_format(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }
          that.msgList.push(tempData)
          setTimeout(function () {
            var scrollHeight = that.$('.list_wrap').prop('scrollHeight')
            that.$('.list_wrap').scrollTop(scrollHeight + 2000, 1000)
            that.sendMsgToServer(value)
          }, 100)
        },
        fail: function (e) {
          console.log('发送消息失败')
          console.log(e)
        }
      })
      msg.body.chatType = 'singleChat'
      window.conn.send(msg.body)
    },
    getMsgList () {
      this.msgList = []
      var that = this
      that.msgList = that.$route.params.msgList
      that.unreadNum = that.$route.params.unreadNum
      setTimeout(function () {
        var scrollHeight = that.$('.list_wrap').prop('scrollHeight')
        that.$('.list_wrap').scrollTop(scrollHeight + 2000, 1000)
      }, 1000)
    },
    sendMsgToServer (value) {
      var receiveId = myTools().socket_info.serverId
      var senderId = myTools().get_local_wxid
      myTools().my_post('addLeaveMessage', {
        receiveId: receiveId,
        senderId: senderId,
        content: value
      }, function (result) {
        console.log(result)
      }, function (error) {
        console.log(error)
      })
    },
    receiveMsg (message) {
      var that = this
      var tempData = {
        content: message.data,
        receiveId: myTools().get_local_wxid,
        senderId: myTools().socket_info.serverId,
        status: 1,
        time: myTools().date_format(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }
      that.msgList.push(tempData)
      setTimeout(function () {
        var scrollHeight = that.$('.list_wrap').prop('scrollHeight')
        that.$('.list_wrap').scrollTop(scrollHeight + 2000, 1000)
      }, 100)
    },
    listenMsg () {
      var that = this
      window.addEventListener('kefu_page_event', function (event) {
        var message = event.detail.info
        that.receiveMsg(message)
        that.isReadAll = true
      })
    },
    readAllMsg () {
      myTools().my_post('read_all_msg_by_wxid', {
        wxid: myTools().get_local_wxid,
        client: 'client'
      }, function (result) {
        console.log('标记已读')
        console.log(result)
      }, function (error) {
        console.log(error)
      })
    }
  },
  data () {
    return {
      msgList: [],
      isReadAll: false,
      unreadNum: 0
    }
  },
  mounted: function () {
    if (this.unreadNum !== 0) {
      this.readAllMsg()
    }
  },
  created: function () {
    this.getMsgList()
    this.$nextTick(function () {
      var windowHeight = this.$(window).height()
      var headerHeight = this.$('.vux-header').outerHeight()
      var bottomHeight = this.$('.my_bottom').outerHeight()
      this.$('.list_wrap').height(windowHeight - headerHeight - bottomHeight)
      this.$('.list_wrap').css({
        'overflow': 'scroll'
      })
    })
    this.listenMsg()
  },
  beforeDestroy: function () {
    if (this.isReadAll) {
      this.readAllMsg()
      window.removeEventListener('kefu_page_event', this.receiveMsg)
    }
  }
}
</script>

<style scoped>
  .msg_page_wrap {
    
    background: #dfdfdf;
  }
  .list_wrap{
    height: 300px;
    padding-top: 17px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .one_msg{
    margin-bottom: 17px;
  }
  .my_bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>

