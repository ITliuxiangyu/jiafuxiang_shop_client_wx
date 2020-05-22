<template>
    <div id="ticketPage">
        <div class="wu_quan" v-show='backMoney == [] || backMoney == "" || backMoney == undefined'>暂无优惠券</div>
        <div class="tickPage" v-for="(item,index) in backMoney"  :key="index">
            <div class="ticketBox">
                <div class="ticketLeft">
                    <div class="ticketLeft_img">
                        <img :src="urlList(item)" alt="">
                    </div>
                    <div class="ticketLeft_span">
                        <p>{{item.goods.goodsname}}</p>
                        <p style="line-height:50px">{{item.rebatetime}}</p>
                    </div>
                </div>
                <div class="ticketRight">
                    <div class="dd_div1">

                    </div>
                    <p class="monspan"><span style="font-size:0.2em; color:gray;">返利:</span>{{item.rebatemoney}}</p>
                    <div class="dd_div2">
                    
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>

import {Flexbox, FlexboxItem, Divider} from 'vux'
import {getGoodsImg} from '../utils/utils.js'
export default {
  components: {
    Flexbox, FlexboxItem, Divider
  },
  props: ['backMoney', 'title'],
  data () {
    return {
      type: '1'
    }
  },
  computed: {
  },
  methods: {
    urlList (item) {
      return getGoodsImg(item.goods)
    }
  },
  created () {
    this.$nextTick(function () {
      var that = this
      that.$('#ticketPage').height(document.documentElement.clientHeight - that.$('.vux-header').height())
    })
  },
  deactivated: function () {
    this.$destroy()
  }
}
</script>
<style lang="less">
    #ticketPage{
        overflow: scroll;
    }
    .ticketBox{
        height: 8rem ;
        background: white;
        border-radius:10px; 
        margin: 0.5rem 0.5rem;
    }

    .ticketLeft{
        height: 8rem;
        width: 70%;
        // background: #666;
        float: left;
        border-radius:10px; 


    }
    .ticketRight{
        height: 8rem;
        width: 30%;
        background: linear-gradient(to right, rgb(136, 245, 229),#48B9E1); /* 标准的语法（必须放在最后） */
        float: left;
        text-align: center;
        line-height: 8rem;
        color: white;
        position: relative;
        border-radius: 10px;
        // border-left: ;
    }
    .monspan{
        font-size: 2rem;
    }
    .ticketLeft_img{
        float: left;
        height: 8rem;
        // background: #FE7273;
        margin-right: 1em;
        width: 40%;
    }
    .ticketLeft_img img{
        height: 6.9rem;
        width: 6.9em;
        margin-top:0.5rem ;
        float: left;
        border: 1px solid gray;
        border-radius: 8px;
    }
    .ticketLeft_span{
        height: 8rem;
        padding-top: 2rem;
        float: left;
        width: 50%;
    }
    .ticketLeft_span p{
        width: 100%;
        font-size: 0.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding-left: 0.6em;
    }
    .dd_div1,.dd_div2{
        width: 1rem;
        height: 1rem;
        background: #f4f8fb;
        border-radius: 50%;
    }
    .dd_div1{
        position: absolute;
        top: -0.5rem;
        left: -0.5rem;
    }
    .dd_div2{
        position: absolute;
        bottom: -0.5rem;
        left: -0.5rem;
    }

    .wu_quan{
        text-align: center;
        color: lightslategray;
    }
</style>
