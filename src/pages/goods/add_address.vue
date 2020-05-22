<template>
  <div>
         <x-header style="position:fixed;top:0px;width:100%;z-index:1000">新增地址</x-header>
      <div class="add—address">
                <group label-width="4.5em" label-margin-right="2em" label-align="right">

              <x-input title="收货人" v-model="userName" placeholder="收货人" ></x-input>
              <x-input style="border-bottom:1px solid #ebebeb" v-model="phone" title="手机号" type="" placeholder="手机号" ></x-input>
               <x-address @on-hide="logHide" @on-show="logShow" title="省市区" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="" :show.sync="showAddress"></x-address>
              <x-input title="详细地址" type="" v-model="detailAd" placeholder="详细地址" ></x-input>
              <x-input title="邮编" placeholder="邮编" v-model="mailCode"></x-input>
              
            <div class="cell_address">
              <span>设为默认地址</span>
              <div class="lables">
                <label><check-icon :value.sync="demo1"> ({{ demo1 }})</check-icon></label>
              </div>
            </div>

            </group>
        <button @click="confirm_fn">添加</button>
      </div>
      <toast v-model="show1">{{text}}</toast>
  </div>
</template>
<style lang="less">
.cell_address {
  position: relative;
  height: 2.875rem;
  line-height: 2.875rem;
  border-top: 1px solid #cccccc;
  padding-left: 1.5rem;
}
.cell_address div {
  display: inline-block;
  position: absolute;
  left: 10rem;
}
.cell_address input {
  /* width: 2rem; */
}
.cell_address div span {
  color: white;
}
button {
  width: 90%;
  height: 2.875rem;
  color: #ffffff;
  font-size: 1.2rem;
  margin: 20% 5%;
  background: #ed393d;
  border-radius: 10px;
}
.add—address{
      margin-top: 2.875rem;
}
.lables label{
  margin-right: 30px;
}
</style>

<script>
import {
  GroupTitle,
  XHeader,
  Group,
  Cell,
  XInput,
  ButtonTab,
  ButtonTabItem,
  Divider,
  XAddress,
  CheckIcon,
  Toast
} from 'vux'
import axios from 'axios'
import qs from 'qs'
import {homeUrl, myTools} from '../../components/utils/utils.js'

export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XInput,
    ButtonTab,
    ButtonTabItem,
    Divider,
    XHeader,
    XAddress,
    CheckIcon,
    Toast
  },
  data () {
    return {
      name: '',
      value: [],
      addressData: [],
      showAddress: false,
      userName: '',
      phone: '',
      detailAd: '',
      mailCode: '',
      demo1: false,
      show1: false,
      text: '',
      wxOpenId: localStorage.getItem('openid')
    }
  },
  methods: {
    onShadowChange (ids, names) {
      this.name = names
    },
    logHide (str) {
    },
    logShow (str) {
    },
    confirm_fn () {
      if (myTools().valid_phone(this.$data.phone) === false) {
        this.$vux.toast.text('手机号格式错误', 'center')
        return
      }
      if (this.userName !== '' && this.phone !== '' && this.detailAd !== '' && this.value !== '') {
        var flag = false
        if (this.demo1 === true) {
          flag = 'true'
        } else {
          flag = 'flase'
        }
        var datas = qs.stringify({
          wxid: myTools().get_local_wxid,
          username: this.userName,
          tel: this.phone,
          address: this.name + this.detailAd,
          mailcode: this.mailCode,
          flag: flag
        })
        axios.post(homeUrl() + 'addAddress/', datas, {emulateJSON: true})
        .then(
          result => {
            if (result.data.status === 'ok') {
              this.show1 = true
              this.text = '地址保存成功'
              this.$router.push({name: 'goods_address'})
            }
          },
          error => {
            this.$vux.toast.text('网络请求失败....', 'bottom')
            console.log(error)
          }
        )
      } else {
        this.$vux.toast.text('信息不完整', 'center')
      }
    },
    get_chinese_address () {
      var that = this
      myTools().my_post('get_chinese_address', {}, function (result) {
        that.addressData = result.data.data
      })
    }
  },
  created () {
    this.get_chinese_address()
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>