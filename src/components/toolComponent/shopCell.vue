<template>
    <!-- 图文列表 -->
    <div id="mylist1">
        <panel :list="list" :type="type"></panel>
    </div>
</template>

<script>

import {Panel} from 'vux'

export default {
  components: {
    Panel
  },
  props: ['list'],
  methods: {
  },
  data () {
    return {
      type: '1'
    }
  },
  computed: {
  }
}
</script>
<style lang="less" scoped>
  /* 搜索界面图文列表 */
  #mylist1{
    overflow: scroll;
  }
  #mylist1 img{
    width: 4.375rem!important;
    height: 6.25rem;
    // -right: .3125rem
  }
  #mylist1 .weui-media-box__title{
    white-space:normal;
  }

  #mylist1 .weui-media-box__desc .price{
    color:red;
  }

  
</style>
