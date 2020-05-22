<template>
  <div>
    <x-header title="我的评价" :right-options="{showMore: false}" @on-click-more="show = true">
      <span v-tap="{methods: backFn}" slot="right" type="navicon" size="35">我的</span>
    </x-header> 
     

     <div class="pingjia_content">
       <evaluate-page :evalDatas="evalDatas" :evaluateType='evaluateType' hasTou='no'></evaluate-page>
     </div>
    
  </div>
</template>

<script>
import {XHeader} from 'vux'
import evaluatePage from '../../components/toolComponent/myEvaluate'
import {myTools} from '../../components/utils/utils.js'
export default {
  components: {XHeader, evaluatePage},
  data () {
    return {
      evalDatas: [],
      wxOpenId: localStorage.getItem('openid'),
      evaluateType: [
        {
          key: '1',
          value: '全部' + 0,
          num: 0
        }, {
          key: '2',
          value: '好评' + 0,
          num: 0
        }, {
          key: '3',
          value: '一般' + 0,
          num: 0
        }, {
          key: '4',
          value: '差评' + 0,
          num: 0
        }
      ]
    }
  },
  methods: {
    backFn () {
      this.$router.push({name: 'userInfo'})
    },
    // 评论列表请求
    myEvalReq () {
      var that = this
      this.$vux.loading.show({
        text: 'loaing...'
      })
      myTools().my_post('commentJsonQuery', {
        wxid: myTools().get_local_wxid
      }, function (result) {
        that.$vux.loading.hide()
        if (result.data.status === 'ok') {
          that.evalDatas = result.data.data
          that.$('.pingjia_content').css({
            'height': that.$(window).height() - that.$('.vux-header').outerHeight() + 'px'
          })
        }
      }, function (error) {
        that.$vux.toast.text('请求出错.', 'center')
        console.log(error)
        that.$vux.loading.hide()
      })
    }
  },
  created () {
    this.myEvalReq()
  }
}
</script>

<style scoped>
  .pingjia_content{
    overflow: scroll;
  }
</style>
