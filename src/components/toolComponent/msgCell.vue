<template>
    <!-- 图文列表 -->
    <div class="msg_cell_class">
      <div class="left_space"></div>
      <div class="content">
        <div class="left_img">
          <img v-show="isLeft()" src="/static/bottom/1.png" alt="">
        </div>
        <div class="left_content_space"></div>
        <div class="real_content">
          {{item.content}}
        </div>
        <div class="right_content_space"></div>
        <div class="right_img">
          <img v-show="!isLeft()" :src="userInfo.headimg" alt="">
        </div>
      </div>
      <div class="right_space"></div>
    </div>
</template>

<script>

import {myTools} from '../../components/utils/utils.js'

export default {
  components: {
  },
  props: ['direction', 'item'],
  methods: {
    isLeft () {
      if (this.item.senderId === myTools().socket_info.serverId) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      userInfo: ''
    }
  },
  computed: {
  },
  created: function () {
    this.userInfo = myTools().get_local_userinfo
  }
}
</script>
<style lang="less" scoped>
  .msg_cell_class{
  }
  .content{
    display: flex;
  }
  .right_space , .left_space{
    flex: 3.25;
  }
  .content .left_img, .content .right_img{
    height: 0;
    width: 11.53%;
    padding-bottom: 10%;
  }
  .content .left_img>img, .content .right_img>img{
    width: 100%;
  }
  .content .left_content_space , .content .right_content_space{
    width: 3.479%;
  }
  .content .real_content{
    width: 69.982%;
    background: white;
    border-radius: 6px;
    padding: 5px;
  }
</style>
