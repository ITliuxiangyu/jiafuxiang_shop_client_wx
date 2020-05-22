<template>
  <div class="pinglun_img_wrap">
    <pingjia-wenzi :haveImgText='false' :haveTextArea='false' :haveTou="false" :shuzu1="shuzu1" :shuzu2="shuzu2"></pingjia-wenzi>
  </div>
</template>

<script>

// import {Checklist, Checker, CheckerItem} from 'vux'
import pingjiaWenzi from './pingjiaWenzi'
export default {
  props: ['pinglunImgList'],
  components: {
    pingjiaWenzi
  },
  data () {
    return {
      shuzu1: [],
      shuzu2: []
    }
  },
  created () {
    if (this.pinglunImgList.length > 4) {
      this.shuzu1 = this.pinglunImgList.splice(0, 4)
      this.shuzu2 = this.pinglunImgList
    } else {
      this.shuzu1 = this.pinglunImgList
      this.shuzu2 = []
    }
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
