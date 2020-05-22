<template>
  <div class="pingjiawenzi_wrap">
    <div class="shang" v-show="isHaveTou()">
      <span>商品描述</span>
    </div>
    <div class="zhong" v-show="isHaveTextArea()">
      <x-textarea :placeholder="('宝贝满足您的期望吗，请留下您的使用心得，分享给想买的他们吧')"></x-textarea>
    </div>
    <div class="xia">
      <tupian-wenzi :haveImgText='haveImgText' :tupianUr="item" v-for="(item , index) in shuzu1" :key="index" v-on:addImgEvent="addImgBtnFn" v-on:delImgEvent="delImgBtnFn"></tupian-wenzi>
      <div v-for="k in 4-shuzu1.length" :key="k"></div>
    </div>
    <div class="xia xiaxia" v-show="shuzu2.length > 0">
      <tupian-wenzi :haveImgText='haveImgText' :tupianUr="item" v-for="(item , index) in shuzu2" :key="index" v-on:addImgEvent="addImgBtnFn" v-on:delImgEvent="delImgBtnFn"></tupian-wenzi>
      <div v-for="j in 4-shuzu2.length" :key="j"></div>
    </div>
  </div>
</template>



<script>
import {XTextarea} from 'vux'
import tupianWenzi from './tupianWenzi.vue'
export default {
  props: ['shuzu1', 'shuzu2', 'haveTou', 'haveTextArea', 'haveImgText'],
  components: {
    XTextarea,
    tupianWenzi
  },
  data () {
    return {
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.$('.weui-textarea').css({
        'background-color': 'rgb(237,243,244)'
      })
    })
  },
  methods: {
    isHaveTextArea () {
      if (this.haveTextArea === false) {
        return false
      }
      return true
    },
    isHaveTou () {
      if (this.haveTou === false) {
        return false
      }
      return true
    },
    addImgBtnFn () {
      this.$emit('addImgEvent')
    },
    delImgBtnFn (canshu) {
      this.$emit('deleteImgEvent', canshu)
    }
  }
}
</script>

<style scoped>
  
  .shang span{
    padding-left: 15px;
    padding-right: 15px;
  }

  .zhong{
    /*background-color: gray;*/
  }

  .xia{
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .xia>div{
    flex: 1;
  }
  .xiaxia{
    margin-top: 10px;
  }
  /*.sb{
    display: flex;
  }
  .sb>div{
    flex: 1;
  }*/

  /*.weui-textarea{
    background-color: red;
  }*/

</style>