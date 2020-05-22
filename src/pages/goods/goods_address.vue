<template>
  <div>
     <x-header style='position:fixed;top:0px;width:100%;z-index:1000;' >管理收货地址</x-header>
    <div style="margin-top:46px">
           <div class="address_" v-for="(item,index) in addressLists" :key="index" :value="index">
        <div class="title_">
        <div class="title_top">
          <div class="checkIcon">
              <!-- <check-icon :value.sync="demo1" ></check-icon>   -->
              <!-- <checklist :max="1" title="" :label-position="labelPosition" required :options="commonList" v-model="index" @on-change="change"></checklist> -->
              <input name="111" @click="change(item)" v-model="values" :value="item" type="radio"/>
              <!-- <p>已选：{{values}}</p> -->
          </div>
          <div class="addreInfos">
            <p>{{item.username}}</p>
            <p>{{item.address}}</p>
          </div>
          <div class="addreTel">
            {{item.tel}}
            <br />
            <span v-show='item.flag == "true"' class="moren">默认</span>
            <span @click="moren_fn(item)" v-show='item.flag == "false"' class="moren_hui">默认</span>
          </div>
        </div>
        <div class="setAddress">
            <div class="moAddress">
                           
            </div>
            <!-- <div class="edit"><img src="static/cart/bj@2x.png" alt="">编辑</div> -->
            <div class="detele" @click="deleaddress(item)"><img src="static/cart/Trash@2x.png" alt="">删除</div>
        </div>
    </div>
     <!-- <div v-transfer-dom>
 <alert v-model="show" :title="温馨提示" @click.native="showModule(item.addid)" @on-show="onShow" @on-hide="onHide">确定要删除吗 </alert>
    </div> -->
    <!-- 删除提示 -->
    </div>
    </div>
    
    <div class="save" @click="go_newAddress">
        新建地址
    </div>
  </div>
</template>

<script>
import {
  Swiper,
  CheckIcon,
  XHeader,
  SwiperItem,
  Grid,
  GridItem,
  GroupTitle,
  Checklist,
  Alert,
      Confirm,
  TransferDomDirective as TransferDom
} from 'vux'
import {homeUrl, myTools} from '../../components/utils/utils.js'
import axios from 'axios'
import qs from 'qs'
// Vue.use(AlertPlugin)

// 或者umd方式
// 引入构建的js文件
// Vue.use(vuxAlertPlugin)
export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    XHeader,
    CheckIcon,
    Alert,
    Checklist,
    Confirm
  },
  data () {
    return {
      addressLists: [],
      values: ''
    }
  },
  methods: {
    moren_fn (item) {
      var that = this
      var datas = qs.stringify({
        wxid: item.wxid,
        addid: item.addid
      })
      axios.post(homeUrl() + 'change_one_add_to_moren/', datas, { emulateJSON: true }).then(
        result => {
          that.$vux.toast.text(result.data.message, 'bottom')
          if (result.data.status === 'ok') {
            for (var i = 0; i < that.$data.addressLists.length; i++) {
              if (item.addid === that.$data.addressLists[i].addid) {
                that.$data.addressLists[i].flag = 'true'
              } else {
                that.$data.addressLists[i].flag = 'false'
              }
            }
          }
        },
        error => {
          that.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        }
      )
    },
    change (item) {
    },
    go_newAddress () {
      this.$router.push({ name: 'add_address', params: {} })
    },
    addressList () {
      var that = this
      var datas = qs.stringify({
        wxid: myTools().get_local_wxid
      })
      axios.post(homeUrl() + 'findAddress/', datas, { emulateJSON: true }).then(
        result => {
          if (result.status === 200) {
            that.$data.addressLists = result.data
          }
        },
        error => {
          that.$vux.toast.text('网络请求失败....', 'bottom')
          console.log(error)
        }
      )
    },
    // 删除地址
    deleaddress (item) {
      var that = this
      this.$vux.confirm.show({
        title: '警告',
        content: '确定要删除该地址吗',
        // 组件除show外的属性
        onCancel () {
        },
        onConfirm () {
          var datas = qs.stringify({
            addid: item.addid
          })
          axios.post(homeUrl() + 'delAddress/', datas, { emulateJSON: true }).then(
            result => {
              if (result.status === 200) {
                var deleteIndex = 'aaa'
                for (var i = 0; i < that.$data.addressLists.length; i++) {
                  if (that.$data.addressLists[i].addid === item.addid) {
                    deleteIndex = i
                  }
                }
                if (deleteIndex !== 'aaa') {
                  that.$data.addressLists.splice(deleteIndex, 1)
                }
              }
            },
            error => {
              that.$vux.toast.text('网络请求失败....', 'bottom')
              console.log(error)
            }
          )
        }
      })
    },
    onHide () {
    },
    onShow () {
    },
    onCancel () {
    }
  },
  created () {
    this.addressList()
  },
  deactivated: function () {
    this.$destroy()
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true // 让 A 缓存，即不刷新
    next()
  }
}
</script>
<style>
.address_ {
  margin-top: 0.625rem;
}
.title_ {
  width: 100%;
  /* height: 6.3125rem; */
  background: #ffffff;
  font-size: 0.8125rem;
  margin-bottom: 10px;
}
.title_top {
  display: flex;
  /* height: 3.75rem; */
  border-bottom: 1px solid #ebebeb;
  padding: 0.625rem;
  /* padding-right: 0.625rem; */
  line-height: 25px;
  
}
.checkIcon{
  width: 50px;
  line-height: 3.125rem
}
.addreInfos{
  flex: 1
}
.setAddress {
  height: 2.5rem;
  line-height: 2.5rem;
  display: flex;
}
.moAddress {
  flex: 1;
}
.edit {
  width: 5rem;
}
.detele {
  width: 5rem;
}
.setAddress img {
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
  margin-right: 8px;
}
.save {
  width: 100%;
  height: 45px;
  position: fixed;
  background: #e60012;
  text-align: center;
  line-height: 45px;
  color: #ffffff;
  bottom: 0;
}

.moren {
  width: 40px;
  height: 20px;
  background: #ff3b3b;
  color: #ffffff;
  text-align: center;
  line-height: 20px;
  margin-top: 15px;
  font-size: 12px;
  float: right;
  border-radius: 5px;
}
.moren_hui {
  width: 40px;
  height: 20px;
  /*background: #ff3b3b;*/
  color: #000;
  text-align: center;
  line-height: 20px;
  margin-top: 15px;
  font-size: 12px;
  float: right;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
