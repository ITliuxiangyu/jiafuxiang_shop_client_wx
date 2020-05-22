<template>
  <div>
  <x-header title='我的返利' :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 
    <ticket-page :backMoney="backMoney" title="返利金额"></ticket-page>
   
  </div>
</template>

<style scoped>

</style>

<script>
import {XHeader, Flexbox, Toast, FlexboxItem, Divider} from 'vux'
import ticketPage from '../../components/toolComponent/ticketPage'
import {homeUrl} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Divider,
    Toast,
    ticketPage
  },
  data () {
    return {
      messShow: false,
      message: '',
      backMoney: [],
      wxOpenId: localStorage.getItem('openid')
    }
  },
  methods: {
    requestBackMoney () {
      this.$vux.loading.show({
        text: 'loading'
      })
      var datas = qs.stringify({
        wxid: JSON.parse(localStorage.getItem('personalInfo')).wxid
      })
      axios
        .post(homeUrl() + 'rebateTableQuery/', datas, { emulateJSON: true })
        .then(
          result => {
            this.$vux.loading.hide()
            if (result.data.status === 'ok') {
              this.backMoney = result.data.data
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            this.$vux.loading.hide()
            console.log(error)
          }
        )
    }
  },
  created () {
    this.requestBackMoney()
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>