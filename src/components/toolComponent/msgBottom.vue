<template>
    <!-- 图文列表 -->
    <div class="msg_bottom">
      <div class="left">
        <input placeholder="请输入消息内容"  v-model="msgValue"></input>
      </div>
      <div class="right">
        <x-button v-tap="{methods: sendMsgFn}" text="发送" :mini=true :gradients="['#FF5E3A', '#FF9500']"></x-button> 
      </div>
    </div>
</template>

<script>

import {XButton, XInput} from 'vux'

export default {
  components: {
    XButton,
    XInput
  },
  props: [],
  methods: {
    sendMsgFn () {
      this.$emit('sendMsg', this.msgValue)
      this.msgValue = ''
    }
  },
  data () {
    return {
      msgValue: ''
    }
  },
  computed: {
  }
}
</script>
<style lang="less" scoped>
  .msg_bottom{
    // height: 100px;
    background: #efefef;
    display: flex;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .left {
    flex: 80;
    text-align: center;
    
  }
  .right {
    flex: 20;
  }
  .left input {
    background: white;
    border-radius: 6px;
    padding-left: 8px;
    padding-right: 8px;
    width: 90%;
    height: 40px;
    border: 0px;
  }
</style>
