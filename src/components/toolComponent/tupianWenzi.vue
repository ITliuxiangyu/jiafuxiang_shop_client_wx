<template>
  <div class="tupianwenzi_wrap">
    <div class="img_wrap" v-tap="{methods: addImgBtnFn, tupianUrl:tupianUr}">
      <img :src="tupianUr" alt="">
      <p v-show="isHaveImgText()">{{wenzi()}}</p>
    </div>
  </div>
</template>



<script>
import {Badge} from 'vux'
export default {
  props: ['tupianUr', 'haveImgText'],
  components: {
    Badge
  },
  data () {
    return {
    }
  },
  created: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    isHaveImgText () {
      if (this.haveImgText === false) {
        return false
      }
      return true
    },
    isDeleteEle () {
      if (this.tupianUr === 'static/home/zhaoxiangji.png') {
        return false
      }
      return true
    },
    wenzi () {
      if (this.tupianUr === 'static/home/zhaoxiangji.png') {
        return '添加图片'
      }
      return '删除'
    },
    addImgBtnFn (params) {
      if (params.tupianUrl === 'static/home/zhaoxiangji.png') {
        this.$emit('addImgEvent')
      } else {
        this.$emit('delImgEvent', {'tupianUrl': params.tupianUrl})
      }
    }
  }
}
</script>

<style scoped>
  .img_wrap img{
    width: 50px;
    height: 50px;
    display: block;
    margin: 0 auto;
  }
  .img_wrap{
    width: 68px;
    /*height: 60px;*/
    border: 1px dashed lightgray;
    text-align: center;
    margin: 0 auto;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .img_wrap p{
    color: lightgray;
    font-size: 12px;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  .vux-badge{
    position: relative;
    top: -5.4em;
    left: 2.7em;
  }

</style>