<template>
  <p class="tou">{{title}}</p>
</template>

<script>
  export default {
    props: ['title'],
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .tou{
    font-size: 20px;
    font-weight: bold;
  }
</style>