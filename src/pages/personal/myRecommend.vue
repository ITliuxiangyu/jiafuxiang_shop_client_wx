<template>  
  <div>  
       <x-header title='推荐' :right-options='{showMore: true}' @on-click-more='show = true'></x-header> 



      <div class='my_team'>
        <span>我推荐的会员</span>
      </div> 

      <div class='paihang_div'>
          <div class='top_li'>
                <flexbox>
                  <flexbox-item><div class='flex-demo'>
                      <div class='dengji_div'>
                        <span>
                          等级
                        </span>
                      </div>
                    </div></flexbox-item>
                  <flexbox-item><div class='flex-demo'>
                      <div class='renshu_div'>
                        <span>
                          人数
                        </span>
                      </div>
                    </div></flexbox-item>
                  <flexbox-item><div class='flex-demo'>
                      <div class='baifenbi_div'>
                        <span v-tap="{methods: jieshaoFn}">
                          <img src='static/bottom/fenchengshuoming.png' alt=''>分成百分比
                        </span>
                      </div>
                    </div></flexbox-item>
                </flexbox>
          </div> 

          <div class='bottom_li'>
                  <flexbox>
                    <flexbox-item>
                      <div class='flex-demo '>
                        <div class='wode_div'>
                          <img src='static/bottom/wode.png' alt="">
                          <div>三级</div>
                        </div>
                      </div>
                    </flexbox-item>
                    <flexbox-item>
                      <div class="flex-demo">
                        <div class="num_div"><span>1人</span></div>
                        
                      </div>
                      </flexbox-item>
                    <flexbox-item><div class="flex-demo">
                      <div class="num_left_div"><span>{{wo_per}}%</span></div>
                      </div></flexbox-item>
                  </flexbox>
          </div>   
          <div class="bottom_li">
                  <flexbox>
                    <flexbox-item>
                      <div class="flex-demo ">
                        <div class="wode_div">
                          <img src="static/bottom/wode.png" alt="">
                          <div>二级</div>
                        </div>
                      </div>
                    </flexbox-item>
                    <flexbox-item>
                      <div class="flex-demo">
                        <div class="num_div"><span>{{xiaji_num}}人</span></div>
                        
                      </div>
                      </flexbox-item>
                    <flexbox-item><div class="flex-demo">
                      <div class="num_left_div"><span>{{xiaji_per}}%</span></div>
                      </div></flexbox-item>
                  </flexbox>
          </div> 
          <div class="bottom_li">
                  <flexbox>
                    <flexbox-item>
                      <div class="flex-demo ">
                        <div class="wode_div">
                          <img src="static/bottom/wode.png" alt="">
                          <div>我</div>
                        </div>
                      </div>
                    </flexbox-item>
                    <flexbox-item>
                      <div class="flex-demo">
                        <div class="num_div"><span>{{xiaxiaji_num}}人</span></div>
                        
                      </div>
                      </flexbox-item>
                    <flexbox-item><div class="flex-demo">
                      <div class="num_left_div"><span>{{xiaxiaji_per}}%</span></div>
                      </div></flexbox-item>
                  </flexbox>
          </div> 
      </div>

          <!-- 分享 -->
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <img src="static/bottom/wode.png" style="max-width:100%">
        </div>
        <div @click="show=false">
          <span class="vux-close">x</span>
        </div>
      </x-dialog>
    </div>

    <!--<croppa v-model="myCroppa"></croppa>-->

  </div>  
</template>  


<style>
  .flex-demo {
    text-align: center;
    color: #666666;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .my_team{
    height: 2.125rem;
    margin-top: .75rem;
    padding-left:calc(50% - 2.6rem); 
    font-size:.8125rem;
     color: #666666;
    line-height: 2.125rem;
    background: #ffffff;
  }
  .my_team_img{
      float: right;
     
  }
  .my_team_img img{
      width: .8125rem;
      height: .4375rem;
      margin-right: .6875rem;
  }
  .paihang_div{
    width: 100%;
    height: 25.0625rem;
    /*background: #E6E6E6;*/
    border-radius:0px 0px 10px 10px; 
  }
  .top_li{
    /* background: greenyellow; */
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .dengji_div{
    margin-left: 0.625rem;
  }
  .bottom_li{
    height: 3.8125rem;
    background: #ffffff;
    border-radius:5px;
    margin: 5px 5px 0px 5px; 
  }
    .wode_div{
    margin-top: .5375rem;
    font-size: .5625rem;
    color: #666666;
  }
  .wode_div img{
    width: 1.25rem;
  }
  .num_div,.num_left_div{
    font-size: .75rem;
    line-height:3.3125rem ;
  }
</style>

<script>
import {XHeader, Flexbox, FlexboxItem, Divider, XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom} from 'vux'
import axios from 'axios'
import qs from 'qs'
import {homeUrl, myTools} from '../../components/utils/utils.js'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Divider,
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  created: function () {
    var datas = qs.stringify({
      wxid: myTools().get_local_wxid
    })
    axios.post(homeUrl() + 'getUserShangxiaji/', datas, { emulateJSON: true })
    .then(
      result => {
        if (result.data.status === 'ok') {
          this.$data.wo_per = (result.data.data.bili.shangshangji - 0) * 100
          this.$data.xiaji_per = (result.data.data.bili.shangji - 0) * 100
          this.$data.xiaxiaji_per = (result.data.data.bili.wo - 0) * 100
          this.$data.xiaji_num = (result.data.data.xiaji.length)
          this.$data.xiaxiaji_num = (result.data.data.xiaxiaji.length)
        }
      },
      error => {
        this.$vux.toast.text('网络请求失败....', 'bottom')
        console.log(error)
      }
    )
  },
  methods: {
    jieshaoFn () {
      // this.myCroppa.generateBlob(
      //   blob => {
      //     // write code to upload the cropped image file (a file is a blob)
      //   },
      //   'image/jpeg',
      //   0.8
      // )
    }
  },
  data () {
    return {
      show: false,
      xiaji_num: 0,
      xiaxiaji_num: 0,
      wo_per: 0,
      xiaji_per: 0,
      xiaxiaji_per: 0
      // myCroppa: {}
    }
  }
}
</script>  