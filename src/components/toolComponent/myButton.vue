<template>
    <!-- 图文列表 -->
    <button class="my_btn" v-tap="{methods:btnFn}">{{title}}</button>
</template>

<script>

export default {
  props: ['title'],
  data () {
    return {
    }
  },
  methods: {
    btnFn () {
      this.$emit('btnTap')
    }
  }
}
</script>
<style lang="less" scoped>
  .my_btn{
    border: 1px solid gray;
    background-color: pink;
    color: gray;
    padding: 7px 0px;
    width: 120px;
    border-radius: 90px;
  }
</style>