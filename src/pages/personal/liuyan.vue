<template>
    <div id="liuyan">
            <x-header title="留言"  @on-click-more="show = true"></x-header> 
            <group :title="('选择反馈类型')">
                
            <cell :title="'类型'" :value="ly" is-link @click.native="showPopup=true"></cell>
            </group>

        <div v-transfer-dom>
            <popup v-model="showPopup" class="checker-popup" position="top">
                <div style="padding:10px 10px 40px 10px;">
                <p style="padding: 5px 5px 5px 2px;color:#888;">反馈类型</p>
                <checker
                v-model="ly"
                default-item-class="ly-item"
                selected-item-class="ly-item-selected"
                disabled-item-class="ly-item-disabled">
                    <checker-item :value="('花跟叶')" @on-item-click="onItemClick"> {{ ('花跟叶') }} </checker-item>
                    <checker-item :value="('鸟与树')" @on-item-click="onItemClick"> {{ ('鸟与树') }} </checker-item>
                    <checker-item :value="('我和你')" @on-item-click="onItemClick"> {{ ('我和你') }} </checker-item>
                    <checker-item :value="('全套礼品装')" disabled @on-item-click="onItemClick"> {{ ('全套礼品装') }} </checker-item>
                </checker>
                </div>
            </popup>
        </div>


            <group :title="('反馈')">
            <x-textarea  :max="100" name="description" :placeholder="('内容')"></x-textarea>
            </group>

            <group :title="('选择反馈类型')">
            <x-input :placeholder="('')"></x-input>
            </group>
<div class="ly_btn">
                  <x-button  @click.native="index=0" :disabled="index === 0" type="primary">留言</x-button>

</div>

    </div>
</template>

<script>
import {XButton, XTextarea, XInput, XHeader, Checker, CheckerItem, Divider, Group, Cell, Popup, TransferDom} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XButton,
    XTextarea,
    XInput,
    XHeader,
    Checker,
    CheckerItem,
    Divider,
    Group,
    Cell,
    Popup
  },
  methods: {
    onItemClick (value, disabled) {
      if (!this.disabled) {
        this.showPopup = false
      }
    }
  },
  data () {
    return {
      items1: [{
        key: '1',
        value: 'A'
      }, {
        key: '2',
        value: 'B'
      }, {
        key: '3',
        value: 'C'
      }],
      demo1: '',
      demo1Required: '',
      demo11: null,
      demo12: {key: '2', value: 'B'},
      demo21: null,
      demo22: [{key: '2', value: 'B'}],
      demo23: null,
      demo1Checkbox: [2, 1],
      demo1CheckboxMax: ['2', '3'],
      demo2: '2',
      demo3: '',
      ly: '',
      showPopup: false,
      demo5: 1,
      demo6: [2, 3]
    }
  }
}
</script>

<style>
.ly-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.ly-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.ly-item-disabled {
  color: #999;
}
.ly_btn{
  width: 10rem;
  margin: auto;
  margin-top: 5rem;
}
</style>

