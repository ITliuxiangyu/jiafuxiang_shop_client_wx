<template>
  <div>
    <x-header title="商品评价" :right-options="{showMore: false}" @on-click-more="show = true"></x-header> 
    <div class="my_meng_ban" v-tap="{methods: hideMengban}">
      <div class="my_pop_bottom">
        <!--<div class="first">
          <button v-tap="{methods: xiangceFn}">拍照</button>
        </div>-->
        <div class="second">
          <button v-tap="{methods: paizhaoFn}">拍照/相册</button>
        </div>
        <div class="third">
          <button v-tap="{methods: cancelFn}">取消</button>
        </div>
      </div>
    </div>

    <div class="pingjia_page">
      <div class="pingjia_wrap">
        <div class="gonghuo_wrap">
          <div>
            <p>供货商: {{goods.goods.shopname}}</p>
          </div>
        </div>
        <pingjiaCell :goods="goods"></pingjiaCell>
      </div>

      <div class="zongti_wtap">
        <p>总体感受: </p> 
        <checker
          v-model="checkModel"
          default-item-class="zongti_wrap_button"
          selected-item-class="zongti_wrap_button_selected"
        >
          <checker-item @on-item-click='checkerFn' v-for="(item, i) in checkerButtons" :key="i" :value="item.value"><img :src="item.img">{{item.text}}</checker-item>
        </checker>
      </div>

        
        <div>
          <div class="xiangche_wrap">
            <pingjia-wenzi :shuzu1="shuzu1" :shuzu2="shuzu2" v-on:addImgEvent='tankuangFn' v-on:deleteImgEvent="deleteOneImgFn"></pingjia-wenzi>
          </div>
        </div>
        <div>
          <checklist title="" required :options="commonList"  @on-change="change"></checklist>
        </div>

        <div>
          <group title="服务评分">
            <cell title="实物相符" >
              <rater v-model="data1" :active-color="starColor"></rater>
            </cell>
            <cell title="物流服务" >
              <rater v-model="data2" :active-color="starColor"></rater>
            </cell>
            <cell title="服务态度">
              <rater v-model="data3" :active-color="starColor"></rater>
            </cell>

          </group>
        </div>
        <div class="pj_btn">
          <x-button type="primary" v-tap="{methods:tijiaoFn}">提交</x-button>
        </div>
      </div>
    </div>


    

  </div>
</template>

<script>
import {CellBox, Checklist, XTextarea, Rater, Group, Cell, Range, XButton, XHeader, Checker, CheckerItem} from 'vux'
import pingjiaCell from '../../components/toolComponent/pingjiaCell'
import pingjiaWenzi from '../../components/toolComponent/pingjiaWenzi'
import {myTools} from '../../components/utils/utils.js'
export default {
  components: {
    CellBox,
    Checklist,
    XTextarea,
    Rater,
    Group,
    Cell,
    Range,
    XButton,
    XHeader,
    pingjiaCell,
    Checker,
    CheckerItem,
    pingjiaWenzi
  },
  data () {
    return {
      commonList: ['匿名'],
      data1: 3,
      data2: 3,
      data3: 3,
      isNiMing: 'false',
      textData: 'sss',
      starColor: '#f84d09',
      allInfo: this.$route.params.info,
      goods: '',
      checkModel: '1',
      checkerButtons: [
        {
          img: 'static/home/flower_love.png',
          value: 'haoping',
          text: '喜欢'
        },
        {
          img: 'static/home/flower_yiban.png',
          value: 'yiban',
          text: '一般'
        },
        {
          img: 'static/home/flower_hate.png',
          value: 'chaping',
          text: '不喜欢'
        }
      ],
      checkerValue: '',
      shuzu1: ['static/home/zhaoxiangji.png'],
      shuzu2: [],
      selectPicList: [],
      zongArr: [],
      shangchuanNum: 0,
      isComplete: false
    }
  },
  methods: {
    shangchuan (commentid) {
      // commentid = '6054245700639057'
      var that = this
      this.zongArr = this.shuzu1.concat(this.shuzu2)
      this.$vux.loading.show({
        text: that.shangchuanNum + '/' + (that.shuzu1.length + that.shuzu2.length - 1)
      })
      this.uploadImgToWx(commentid)
    },
    uploadImgToWx (commentid) {
      var that = this
      if (this.zongArr.length > 1) {
        var uploadId = that.zongArr.shift()
        window.wx.uploadImage({
          localId: uploadId,
          isShowProgressTips: 0,
          success: function (res) {
            var serverId = res.serverId
            myTools().my_post('ceshiTupiandizhi', {
              'media_id': serverId,
              'comment_id': commentid
            }, function (result) {
              if (result.data.status === 'ok') {
                that.shangchuanNum = that.shangchuanNum + 1
                that.$vux.loading.show({
                  text: that.shangchuanNum + '/' + (that.shuzu1.length + that.shuzu2.length - 1)
                })
                if (that.isComplete === true) {
                  that.$vux.loading.hide()
                  that.$vux.toast.text('上传成功', 'center')
                  that.isComplete = false
                  that.$router.push({name: 'pingjiaChenggong', params: {orderInfo: that.allInfo}})
                }
              }
            })
            that.uploadImgToWx(commentid)
          },
          error: function (error) {
            alert('上传出错')
            alert(JSON.stringify(error))
            that.uploadImgToWx(commentid)
          }
        })
      } else {
        that.isComplete = true
        that.$vux.loading.hide()
        that.shangchuanNum = 0
      }
    },
    paizhaoFn (params) {
      var that = this
      var selectCount = 0
      selectCount = 6 - that.shuzu1.length - that.shuzu2.length
      if (selectCount <= 0) {
        alert('最多选择5张图片')
        return
      }
      window.wx.chooseImage({
        count: selectCount,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.selectPicList = res.localIds

          that.shuzu1 = that.shuzu1.concat(that.shuzu2)
          that.shuzu2 = []
          for (var kk = 0; kk < that.selectPicList.length; kk++) {
            if (that.shuzu1.length < 6) {
              that.shuzu1.unshift(that.selectPicList[kk])
            }
          }
          if (that.shuzu1.length > 4) {
            var tempArr = that.shuzu1
            that.shuzu1 = tempArr.splice(0, 4)
            that.shuzu2 = tempArr
          }
        }
      })
      that.hideMengban()
    },
    xiangceFn () {
    },
    cancelFn () {
    },
    deleteOneImgFn (params) {
      var delImgUrl = params.tupianUrl
      var tempArr = this.shuzu1.concat(this.shuzu2)
      // 删除元素
      var delIndex = 0
      for (var i = 0; i < tempArr.length; i++) {
        if (delImgUrl === tempArr[i]) {
          delIndex = i
        }
      }
      tempArr.splice(delIndex, 1)

      this.shuzu2 = []
      if (tempArr.length > 4) {
        this.shuzu1 = tempArr.splice(0, 4)
        this.shuzu2 = tempArr
      } else {
        this.shuzu1 = tempArr
      }
    },
    hideMengban () {
      this.$('.my_meng_ban').css({
        'visibility': 'hidden'
      })
      this.$('.my_pop_bottom').css({
        'transform': 'translate(0 , 0px)'
      })
    },
    tankuangFn () {
      if (this.shuzu1.length + this.shuzu2.length >= 6) {
        alert('最多只能添加5张图片')
        return
      }
      this.$('.my_pop_bottom').css({
        'bottom': '-' + this.$('.my_pop_bottom').outerHeight() + 'px',
        'transform': 'translate(0 , 0)'
      })
      this.$('.my_meng_ban').css({
        'visibility': 'visible'
      })
      this.$('.my_pop_bottom').css({
        'transform': 'translate(0 , ' + (-this.$('.my_pop_bottom').outerHeight()) + 'px)'
      })
    },
    checkerFn (selectValue) {
      this.checkerValue = selectValue
    },
    change (changeArr) {
      this.isNiMing = changeArr.length > 0 ? 'true' : 'false'
    },
    tijiaoFn () {
      var that = this
      that.textData = this.$('.weui-textarea').val()
      if (this.checkerValue === '') {
        this.$vux.toast.text('请做出整体评价', 'center')
        return
      }
      if (myTools().removeStringSpace(this.textData).length <= 0) {
        this.$vux.toast.text('请输入评价内容', 'center')
        return
      }
      this.zongArr = this.shuzu1.concat(this.shuzu2)
      this.$vux.loading.show({
        text: that.shangchuanNum + '/' + (that.zongArr.length - 1)
      })
      myTools().my_post('commentJsonAdd', {
        goodsid: that.goods.goods.goodsid,
        wxid: myTools().get_local_wxid,
        comment_text: that.textData,
        orderid: that.allInfo.order.orderId,
        checkerValue: that.checkerValue,
        shiwu: that.data1,
        wuliu: that.data2,
        fuwu: that.data3,
        niming: that.isNiMing,
        params: that.goods.params,
        buyNumber: that.goods.buyNumber,
        fahuotime: that.goods.fahuotime,
        is_pingjia: that.goods.is_pingjia,
        orderTableId: that.goods.orderTableId,
        status: that.goods.status,
        transportId: that.goods.transportId
      }, function (result) {
        that.$vux.toast.text(result.data.message, 'center')
        if (result.data.status === 'ok') {
          that.shangchuan(result.data.data.commentid)
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  created () {
    if (!this.allInfo || this.allInfo === '' || this.allInfo === undefined) {
      this.goods = JSON.parse(localStorage.getItem('pingjia_goods'))
      this.allInfo = JSON.parse(localStorage.getItem('pingjia_info'))
    } else {
      this.goods = this.allInfo.goods
      localStorage.setItem('pingjia_info', JSON.stringify(this.allInfo))
      localStorage.setItem('pingjia_goods', JSON.stringify(this.goods))
    }
    this.$nextTick(function () {
      // 视频滚动区域高度
      this.$('.pingjia_page').css({
        overflow: 'scroll',
        top: this.$('.vux-header').outerHeight() + 'px',
        height: document.documentElement.clientHeight - this.$('.vux-header').outerHeight() + 'px'
      })
      this.$('.my_pop_bottom').css({
        'bottom': this.$('.my_pop_bottom').outerHeight() + 'px'
      })
    })
  }
}
</script>
<style scoped>
  .pj_btn{
    margin-top: 2rem;
    margin-bottom: 15px;
  }
  .gonghuo_wrap{
    background-color: white;
    padding-left: 15px;
  }
  .gonghuo_wrap>div{
    border-bottom: 1px solid #f1f1f1;
  }
  .gonghuo_wrap>div>p{
    height: 40px;
    line-height: 40px;
    font-size: 11px;
    color: #555555;
  }
  .zongti_wtap{
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
  }
  .zongti_wtap p{
    color: #878787;
  }
  .zongti_wrap_button {
    padding-left: 10px;
    padding-right: 10px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }
  .zongti_wrap_button img{
    width: 15px;
  }
  .zongti_wrap_button_selected {
    background: #ffffff url(/static/home/active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
  .xiangche_wrap {
    /*height: 100px;*/
    /*background-color: yellow;*/
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .xxx img{
    width: 30px;
  }


  .my_meng_ban{
    position: fixed;
    top: 0;
    width: 100%;
    height: 1000px;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    z-index: 998;
  }
  .my_pop_bottom{
    width: 100%;
    position: fixed;
    z-index: 999;
  }

  .my_pop_bottom button{
    width: 100%;
    background-color: white;
    text-align: center;
    color: black;
    border: 0px;
    border-bottom: 1px solid lightgray;
    height: 50px;
    font-size: 14px;
  }

  .my_pop_bottom .second{
    border-bottom: 3px solid #efe5e5;
  }


</style>
