<template>

  <div>
    <search-page :searchData="searchData"></search-page>
  </div>
</template>
<script>
import {
  Popup
} from 'vux'
import searchPage from '../../components/toolComponent/searchPage.vue'
export default {
  components: {
    Popup,
    searchPage
  },
  data () {
    return {
      searchData: this.$route.params
    }
  },
  created () {
    this.searchData = this.$route.params
  }
}
</script>
<style scoped>

</style>
