<template>
  <div class="btn_select_wrap">
    <div class="jiaqian_wrap">
      <div class="jiaqian_wrap_title">
        <p>价格区间</p>
      </div>
      <div class="jiaqian_wrap_input">
        <div>
          <input type="text" :value="minMoney">
        </div>
        <div>
          <span>-</span>
        </div>
        <div>
          <input type="text" :value="maxMoney">
        </div>
      </div>
    </div>
    <div class="goods_format_ goods_format_111" v-for="(item , index) in dataList" :key="index" :value="item">
      <p class="_format" >{{item.title}}</p>
      <div class="_checker">
        <checker radio-required default-item-class="demo6-item" selected-item-class="demo6-item-selected">
            <checker-item v-for="(minItem,index) in item.data" :key="index" :value="minItem">{{minItem}}</checker-item>
        </checker>
      </div>
    </div>
  </div>
</template>



<script>
import {Checker, CheckerItem} from 'vux'
export default {
  props: ['dataList'],
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      minMoney: 0,
      maxMoney: 0
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .goods_format_ {
    border-bottom: 1px solid #bbb;
    text-align: left;
    padding-bottom: 0.625rem;
  }
  .goods_format_ ._format {
    line-height: 1.875rem;
    width: 95%;
    padding-left: 15px;
    margin-top: 0.3125rem;
    color: #6b6b6b;
  }

  .demo6-item {
    /*width: 100px;*/
    padding: 0.5em 1.2em;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    // border: 1px solid #ccc;
    background-color: #f2f2f2;
    margin-right: 15px;
    margin-top: 10px;
  }
  .demo6-item-selected {
    background: #f2f2f2 url(../../../src/assets/demo/active.png) no-repeat right
      bottom;
    border-color: #ff4a00 !important;
  }

  .jiaqian_wrap_title p{
    padding-left: 15px;
    color: #6b6b6b;
  }
  .jiaqian_wrap_input input{
    background-color: #f2f2f2;
  }
  .jiaqian_wrap_input{
    display: flex;
  }
  .jiaqian_wrap_input>div{
    flex: 1;
    padding-left: 15px;
  }
</style>