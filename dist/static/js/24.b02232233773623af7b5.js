webpackJsonp([24],{"77FK":function(t,n,e){n=t.exports=e("UTlt")(!1),n.push([t.i,"\n.two_goods_in_one_row_wrap[data-v-58e598dc] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 8px;\n}\n.two_goods_in_one_row_wrap > div[data-v-58e598dc] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  border-radius: 10px;\n  background-color: white;\n}\n.left[data-v-58e598dc] {\n  margin-right: 6px;\n}\n.right[data-v-58e598dc] {\n  margin-left: 6px;\n}\n.two_goods_in_one_row_wrap > div > img[data-v-58e598dc] {\n  width: 100%;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n.goods_name[data-v-58e598dc] {\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: center;\n  padding-top: 10px;\n  display: -webkit-box;\n  word-break: break-all;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n.money[data-v-58e598dc] {\n  padding: 15px 10px;\n}\n.money > p > span[data-v-58e598dc]:nth-child(1) {\n  color: #fb3808;\n  margin-right: 10px;\n}\n.money > p > span[data-v-58e598dc]:nth-child(2) {\n  color: #858585;\n}\n",""])},GKRn:function(t,n,e){var i=e("Ix/l");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("FIqI")("2ebf40d3",i,!0,{})},"Ix/l":function(t,n,e){n=t.exports=e("UTlt")(!1),n.push([t.i,"\n.tu_wrap[data-v-0335d068] {\n  background: -webkit-linear-gradient(left, #fd7c07, #f83709);\n  background: linear-gradient(to right, #fd7c07, #f83709);\n  text-align: center;\n  color: #fffae4;\n}\n.tu_wrap .first img[data-v-0335d068] {\n  width: 22px;\n  vertical-align: middle;\n  margin-right: 10px;\n}\n.tu_wrap .first[data-v-0335d068] {\n  vertical-align: middle;\n  font-size: 22px;\n}\n.tu_wrap .third[data-v-0335d068] {\n  color: white;\n  padding-top: 18px;\n  padding-bottom: 22px;\n}\n.tu_wrap .third span[data-v-0335d068] {\n  border: 1px solid white;\n  border-radius: 99px;\n  padding: 6px 18px;\n}\n.tu_wrap .third > span[data-v-0335d068]:nth-child(1) {\n  margin-right: 10px;\n}\n.tu_wrap .third > span[data-v-0335d068]:nth-child(2) {\n  margin-left: 10px;\n}\n.goods_list[data-v-0335d068] {\n  margin-top: 20px;\n}\n",""])},JVlo:function(t,n,e){"use strict";function i(t){e("pGwm")}function a(t){e("GKRn")}Object.defineProperty(n,"__esModule",{value:!0});var r=e("3cXf"),o=e.n(r),s=e("Ztse"),d={components:{},data:function(){return{}},created:function(){this.$nextTick(function(){})},methods:{}},p=function(){var t=this,n=t.$createElement;t._self._c;return t._m(0)},c=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"two_goods_in_one_row_wrap"},[e("div",{staticClass:"left"},[e("img",{attrs:{src:"static/bottom/1.png",alt:""}}),t._v(" "),e("div",{staticClass:"goods_name"},[t._v("\n      哺乳衣套装尽快拉倒金坷垃几万哦女新材料款阿拉丁甲壳虫夏洛克技术点2018昆仑决阿萨德啊速度快\n    ")]),t._v(" "),e("div",{staticClass:"money"},[e("p",[e("span",[t._v("￥45.0")]),e("span",[t._v("220人已购买")])])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{attrs:{src:"static/bottom/2.jpg",alt:""}}),t._v(" "),e("div",{staticClass:"goods_name"},[t._v("\n      哺乳衣套装尽快拉倒金坷垃几万哦女新材料款阿拉丁甲壳虫夏洛克技术点2018昆仑决阿萨德啊速度快\n    ")]),t._v(" "),e("div",{staticClass:"money"},[e("p",[e("span",[t._v("￥45.0")]),e("span",[t._v("220人已购买")])])])])])}],l={render:p,staticRenderFns:c},u=l,g=e("C7Lr"),h=i,v=g(d,u,!1,h,"data-v-58e598dc",null),_=v.exports,m=(s.a,{components:{XHeader:s.a,twoGoodsInOneRow:_},data:function(){return{querenObj:this.$route.params.item,currentTitle:this.$route.params.title}},methods:{pingjiaBtnTextFn:function(){return"支付成功"===this.currentTitle?"查看订单":"立即评价"},xiaoTextFn:function(){return"支付成功"===this.currentTitle?"等待卖家发货~":"去评价一下本次的购物体验吧~"},bigTextFn:function(){return"支付成功"===this.currentTitle?"支付成功":"交易成功"},titleFn:function(){return"支付成功"===this.currentTitle?"支付成功":"确认成功"},backToHome:function(){this.$router.push({name:"home"})},goToPingjia:function(){"支付成功"===this.currentTitle?this.$router.push({name:"my_order",params:{index:2}}):this.$router.push({name:"pingjia",params:{info:{order:this.querenObj.order,goods:this.querenObj.goods}}})}},created:function(){""===this.querenObj||void 0===this.querenObj||null==this.querenObj?this.querenObj=JSON.parse(localStorage.getItem("querenShouhuo_querenObj")):localStorage.setItem("querenShouhuo_querenObj",o()(this.querenObj)),this.currentTitle}}),f=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("x-header",{attrs:{title:t.titleFn(),"right-options":{showMore:!1}},on:{"on-click-more":function(n){t.show=!0}}}),t._v(" "),e("div",{staticClass:"queren_wrap"},[e("div",{staticClass:"tu_wrap"},[e("p",{staticClass:"first"},[e("img",{attrs:{src:"static/home/chenggong.png",alt:""}}),t._v(t._s(t.bigTextFn()))]),t._v(" "),e("p",{staticClass:"second"},[t._v(t._s(t.xiaoTextFn()))]),t._v(" "),e("p",{staticClass:"third"},[e("span",{directives:[{name:"tap",rawName:"v-tap",value:{methods:t.backToHome},expression:"{methods: backToHome}"}]},[t._v("返回首页")]),e("span",{directives:[{name:"tap",rawName:"v-tap",value:{methods:t.goToPingjia},expression:"{methods: goToPingjia}"}]},[t._v(t._s(t.pingjiaBtnTextFn()))])])])]),t._v(" "),e("two-goods-in-one-row",{staticClass:"goods_list"})],1)},x=[],w={render:f,staticRenderFns:x},b=w,T=e("C7Lr"),k=a,j=T(m,b,!1,k,"data-v-0335d068",null);n.default=j.exports},pGwm:function(t,n,e){var i=e("77FK");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("FIqI")("28e72d38",i,!0,{})}});