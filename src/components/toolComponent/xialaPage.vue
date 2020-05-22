<template>
  <div class="xialaPage_wrap">
    <div class="one_row" v-bind:class="{isGray: index != sel_index}" v-for="(item , index) in cur_list" :key="index">
      <cell :title="item" v-tap="{methods: cellFn , index:index , title: item}">
        <span v-if="index == sel_index"><img src="../../../static/search/duihao.png" alt=""></span>
      </cell>
    </div>
  </div>
</template>



<script>
import {Cell} from 'vux'
// import {getGoodsImg} from '../../components/utils/utils.js'
export default {
  props: ['cur_list', 'sel_index'],
  components: {
    Cell
  },
  data () {
    return {
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.$('.one_row .vux-label').css({
        'font-size': '12px'
      })
    })
  },
  methods: {
    cellFn (params) {
      this.$emit('cellClick', {index: params.index, title: params.title})
    }
  }
}
</script>

<style lang="less" scoped>

  .xialaPage_wrap{
    height: 100px;
    // background-color: yellow;
    position: absolute;
    width: 100%;
  }
  .one_row{
    background-color: #fff;
  }
  .one_row img{
    height: 18px;
    display: block;
  }

  .isGray {
    color: lightgray;
  }
  
 
</style>