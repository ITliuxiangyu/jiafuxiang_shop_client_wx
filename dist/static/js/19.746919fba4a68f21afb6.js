webpackJsonp([19],{Enji:function(e,t,n){"use strict";function o(e){n("TzLB")}var a=n("Bv8n"),i=(a.a,{props:["orderInfoList","isHaveJiao","isHaveAnniu"],components:{shopCell3:a.a},data:function(){return{}},created:function(){var e=this;this.$nextTick(function(){this.$(".cell_tou>div:nth-child(2)>span").css({"line-height":e.$(".cell_tou").height()+"px"})})},methods:{isHaveAnniuFn:function(){return"false"!==this.isHaveAnniu},fahuotimeFn:function(e){return null===e.fahuotime||""===e.fahuotime||void 0===e.fahuotime?"":"发货时间: "+e.fahuotime},isShowJiao:function(){return"false"!==this.isHaveJiao},getTotalMoney:function(e){return parseInt(e.totalMoney)},chakanwuliu:function(e){this.$emit("chakanwuliu",e.item)},querenshouhuo:function(e){this.$emit("querenshouhuo",{order:e.order,goods:e.goods})},qupingjia:function(e){this.$emit("qupingjia",{order:e.order,goods:e.goods})},quxiaodingdan:function(e){this.$emit("quxiaodingdan",e.item)},shanchudingdan:function(e){this.$emit("shanchudingdan",e.item)},go_to_pay:function(e){this.$emit("qufukuan",e.order)},cuimaijiafahuo:function(){},goto_dingdan_detail:function(e){var t=e.goods,n=this.orderJsonCircle(e.order);this.$router.push({name:"orderDetailComp",params:{order:n,goods:t}})},getStatus:function(e){var t="";return 0===e.status&&(t="等待买家付款"),1===e.status&&(t="买家已经付款"),2===e.status&&(t="订单已取消"),3===e.status&&(t="交易完成"),t},orderJsonCircle:function(e){for(var t=0;t<e.goodsInfo.length;t++)delete e.goodsInfo[t].orderInfo;return e}}}),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"order_list_cell_page"},e._l(e.orderInfoList,function(t,o){return n("div",{key:o,staticClass:"order_list_cell_wrap"},[n("div",{staticClass:"cell_tou"},[n("div",[n("img",{attrs:{src:"static/home/tianmaobao.png",alt:""}}),e._v(" "),n("span",[e._v(e._s(t.goodsInfo[0].goods.shopname))])]),e._v(" "),n("div",[n("span",[e._v(e._s(e.getStatus(t)))])])]),e._v(" "),e._l(t.goodsInfo,function(o,a){return n("div",{key:a,staticClass:"cell_content1"},[n("shop-cell3",{attrs:{goods:o.goods,params:o.params,buyNumber:o.buyNumber}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isHaveAnniuFn(),expression:"isHaveAnniuFn()"}],staticClass:"cell_bottom"},[n("span",{directives:[{name:"show",rawName:"v-show",value:0==t.status&&0==o.status,expression:"item.status == 0 && goodsItem.status == 0"},{name:"tap",rawName:"v-tap",value:{methods:e.go_to_pay,order:t},expression:"{methods:go_to_pay , order:item}"}],staticClass:"pingjia_btn"},[e._v("去付款")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:1==t.status&&3==o.status,expression:"item.status == 1 && goodsItem.status == 3"},{name:"tap",rawName:"v-tap",value:{methods:e.qupingjia,order:t,goods:o},expression:"{methods:qupingjia , order:item , goods:goodsItem}"}],staticClass:"pingjia_btn"},[e._v("去评价")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:1==t.status&&(1==o.status||2==t.status),expression:"item.status == 1 && (goodsItem.status == 1 || item.status == 2)"},{name:"tap",rawName:"v-tap",value:{methods:e.chakanwuliu,order:t,goods:o.goods},expression:"{methods:chakanwuliu , order:item , goods:goodsItem.goods}"}],staticClass:"pingjia_btn"},[e._v("查看物流")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:1==t.status&&2==o.status,expression:"item.status == 1 && goodsItem.status == 2"},{name:"tap",rawName:"v-tap",value:{methods:e.querenshouhuo,order:t,goods:o},expression:"{methods:querenshouhuo , order:item , goods:goodsItem}"}],staticClass:"pingjia_btn"},[e._v("确认收货")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:1==t.status&&4==o.status,expression:"item.status == 1 && goodsItem.status == 4"}]},[e._v("评价完成")]),e._v(" "),n("span",{directives:[{name:"tap",rawName:"v-tap",value:{methods:e.shanchudingdan,item:t.orderId},expression:"{methods:shanchudingdan , item:item.orderId}"},{name:"show",rawName:"v-show",value:2==t.status,expression:"item.status == 2"}],staticClass:"pingjia_btn"},[e._v("删除订单")])]),e._v(" "),n("div",{staticClass:"zongji"},[n("p",[n("span",{staticClass:"zongjia_left"},[e._v(e._s(e.fahuotimeFn(o)))]),n("span",{staticClass:"zongjia_right"},[e._v("共"+e._s(o.buyNumber)+"件商品 合计:￥"+e._s(e.getTotalMoney(t)))])])])],1)}),e._v(" "),e._m(0,!0)],2)}),0)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cell_btns"},[n("div",{staticClass:"zongji"})])}],d={render:s,staticRenderFns:r},l=d,u=n("C7Lr"),c=o,p=u(i,l,!1,c,"data-v-379a51c8",null);t.a=p.exports},"L+JW":function(e,t,n){var o=n("RaB8");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("FIqI")("a933cad6",o,!0,{})},RaB8:function(e,t,n){t=e.exports=n("UTlt")(!1),t.push([e.i,"\n#myFocusPage .vux-slider[data-v-1dbe1929] {\n  overflow: unset;\n}\n#myFocusPage #mySwiper .vux-swiper[data-v-1dbe1929] {\n  overflow: unset;\n}\n.wrap—order[data-v-1dbe1929] {\n  padding: 0.375rem;\n  background: #ffffff;\n  margin-bottom: 10px;\n}\n.item—title[data-v-1dbe1929] {\n  height: 2.8125rem;\n  line-height: 2.8125rem;\n  border-bottom: 1px solid #ebebeb;\n  font-size: .4em;\n}\n.font-right[data-v-1dbe1929] {\n  text-align: right;\n  font-size: 12px;\n}\n.tab-swiper[data-v-1dbe1929] {\n  background-color: #fff;\n  height: 100px;\n}\n.bottom-order[data-v-1dbe1929] {\n  margin-top: 0.375rem;\n}\n.flex-demo[data-v-1dbe1929] {\n  text-align: center;\n  border-radius: 20px;\n  background-clip: padding-box;\n  height: 1.875rem;\n  border: 1px solid #666;\n  line-height: 1.875rem;\n}\n.first_order[data-v-1dbe1929] {\n  display: none;\n}\n.orserListWrap[data-v-1dbe1929] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  border-bottom: 1px solid #ebebeb;\n  padding-top: 10px;\n  font-size: 14px;\n}\n.orderListImg[data-v-1dbe1929] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  padding-right: 5px;\n}\n.orderListImg img[data-v-1dbe1929] {\n  width: 100px;\n  height: 100px;\n}\n.orderListDetail[data-v-1dbe1929] {\n  -webkit-box-flex: 3;\n  -webkit-flex: 3;\n          flex: 3;\n}\n.detailInfo[data-v-1dbe1929] {\n  margin-bottom: 15px;\n  display: -webkit-box;\n  word-break: break-all;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n.shopsColor[data-v-1dbe1929] {\n  color: #f74c31;\n}\n.goods_name[data-v-1dbe1929] {\n  color: lightseagreen;\n  overflow: hidden;\n  -webkit-line-clamp: 1;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  font-size: .6em;\n  /*white-space: nowrap;*/\n  /*text-overflow: ellipsis;*/\n}\n.goods_order_number[data-v-1dbe1929] {\n  color: blueviolet;\n  overflow: hidden;\n  -webkit-line-clamp: 1;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  text-align: right;\n  font-size: .6em;\n  /*white-space: nowrap;*/\n  /*text-overflow: ellipsis;*/\n}\n.goods_params[data-v-1dbe1929] {\n  padding-top: 1em;\n  overflow: hidden;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  font-size: .2em;\n  color: lightslategray;\n  /*white-space: nowrap;*/\n  /*text-overflow: ellipsis;*/\n}\n.noList[data-v-1dbe1929] {\n  padding-top: 100px;\n  text-align: center;\n}\n",""])},TzLB:function(e,t,n){var o=n("y5fK");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("FIqI")("c9270aec",o,!0,{})},iUYV:function(e,t,n){"use strict";function o(e){n("L+JW")}Object.defineProperty(t,"__esModule",{value:!0});var a=n("VawC"),i=n("6ONn"),s=n("EFzr"),r=n("d2IS"),d=n("Ztse"),l=n("+EaS"),u=n("4PKW"),c=n("bT6r"),p=n("QcMK"),h=n("Enji"),f=n("+Jte"),g=(p.a,d.a,a.a,i.a,s.a,r.a,l.a,u.a,c.a,h.a,{components:{ShopCell:p.a,XHeader:d.a,Tab:a.a,TabItem:i.a,Swiper:s.a,SwiperItem:r.a,Flexbox:l.a,FlexboxItem:u.a,Toast:c.a,orderListCell:h.a},data:function(){return{list:[],list2:["全部","待付款","待发货","待收货","待评价","已完成","已取消"],demo2:"商品",index:this.$route.params.index?this.$route.params.index:0,all_order_list:[],orderListInfos:[],user_info:Object(f.f)().get_local_userinfo}},methods:{backFn:function(){this.$router.push({name:"userInfo"})},noListFn:function(){switch(this.index){case 0:return"还没有订单";case 1:return"没有未付款的订单";case 2:return"没有待发货的商品";case 3:return"没有待收货的商品";case 4:return"没有待评价的商品";case 5:return"没有已完成的商品";case 6:return"没有已取消的订单"}},pingjia_fn:function(e){this.$router.push({name:"pingjia",params:{info:e}})},switchTabItem:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e.cur_index,o=this;o.$vux.loading.hide(),o.$data.index=n,o.selectOrderByStatus(o,n),!0===t&&o.$(".vux-swiper").scrollTop(0),setTimeout(function(){var e=o.$(window).height(),t=o.$(".vux-header").outerHeight(),n=o.$(".vux-tab").outerHeight();o.$refs.mySwiper.xheight=e-t-n+20+"px",o.$(".vux-swiper").css({overflow:"scroll"})},100)},orderListReq:function(){var e=this;e.$vux.loading.show({text:"loading..."}),Object(f.f)().my_post("ordertableListJson",{wxid:e.user_info.wxid},function(t){e.$vux.loading.hide(),"ok"===t.data.status&&(e.all_order_list=[],e.all_order_list=t.data.data,e.orderListInfos=e.all_order_list,e.switchTabItem({cur_index:e.$data.index}))},function(t){e.$vux.toast.text("网络请求失败....","bottom"),e.$vux.loading.hide(),console.log(t)})},buyNum:function(e){for(var t=0,n=0,o=0;o<this.orderListInfos.length;o++)for(var a=this.orderListInfos[o].goodsInfo,i=0;i<a.length;i++)t+=parseInt(a[i].buyNumber),n+=parseInt(a[i].goods.price);return"num"===e?t:"price"===e?n:void 0},go_to_pay:function(e){this.$router.push({name:"pay_money",params:{orderInfo:e}})},qurenshouhuo:function(e){var t=this;t.$vux.loading.show({text:"loading..."}),Object(f.f)().my_post("querenshouhuoApi",{goodsid:e.goods.goods.goodsid,orderid:e.order.orderId},function(n){t.$vux.loading.hide(),t.$vux.toast.text(n.data.message,"center"),"ok"===n.data.status&&t.$router.push({name:"querenShouhuo",params:{item:e}})},function(){t.$vux.loading.hide(),t.$vux.toast.text("网络请求失败....","bottom")})},cancelOrder:function(e){var t=this;t.$vux.loading.show({text:"loading..."}),Object(f.f)().my_post("modify_order_status",{orderTableId:e,status:2},function(n){if(t.$vux.loading.hide(),t.$vux.toast.text(n.data.message,"center"),"ok"===n.data.status){for(var o=0;o<t.$data.all_order_list.length;o++)if(t.$data.all_order_list[o].orderId===e){t.$data.all_order_list[o].status="已取消";break}t.selectOrderByStatus(t,0)}},function(){t.$vux.loading.hide(),t.$vux.toast.text("网络请求失败....","bottom")})},getUrl:function(e){return Object(f.a)(e)},zuzhuangTempOrder:function(e){return{createTime:e.createTime,deliveryTime:e.deliveryTime,freightPrice:e.freightPrice,freightRiskPrice:e.freightRiskPrice,goodsInfo:[],invoiceContent:e.invoiceContent,invoiceType:e.invoiceType,noGoodsMethod:e.noGoodsMethod,orderId:e.orderId,payTime:e.payTime,sendCompany:e.sendCompany,status:e.status,totalFreightMoney:e.totalFreightMoney,totalMoney:e.totalMoney,totalNum:e.totalNum,transportMethod:e.transportMethod,userAddress:e.userAddress,userInfo:e.userInfo,wxOrderId:e.wxOrderId}},selectOrderByStatus:function(e,t){if(e.orderListInfos=[],0===t&&(e.orderListInfos=e.all_order_list),1===t)for(var n=0;n<e.all_order_list.length;n++)0===e.all_order_list[n].status&&e.orderListInfos.push(e.$data.all_order_list[n]);if(6===t)for(var o=0;o<e.all_order_list.length;o++)2===e.all_order_list[o].status&&e.orderListInfos.push(e.$data.all_order_list[o]);if(2===t||3===t||4===t)for(var a=0;a<e.all_order_list.length;a++)if(1===e.all_order_list[a].status){for(var i=e.zuzhuangTempOrder(e.all_order_list[a]),s=0;s<e.all_order_list[a].goodsInfo.length;s++)e.all_order_list[a].goodsInfo[s].status===t-1&&i.goodsInfo.push(e.all_order_list[a].goodsInfo[s]);i.goodsInfo.length>0&&e.orderListInfos.push(i)}if(5===t)for(var r=0;r<e.all_order_list.length;r++)if(1===e.all_order_list[r].status){for(var d=e.zuzhuangTempOrder(e.all_order_list[r]),l=0;l<e.all_order_list[r].goodsInfo.length;l++)3!==e.all_order_list[r].goodsInfo[l].status&&4!==e.all_order_list[r].goodsInfo[l].status||d.goodsInfo.push(e.all_order_list[r].goodsInfo[l]);d.goodsInfo.length>0&&e.orderListInfos.push(d)}},deleteOrder:function(e){var t=this;this.$vux.loading.show({text:"loading"}),Object(f.f)().my_post("ordertableDelete",{orderId:e},function(n){"ok"===n.data.status&&(t.delete_localArr_by_orderId(e),t.$vux.toast.text("订单删除成功...","center")),t.$vux.loading.hide()},function(){t.$vux.loading.hide(),t.$vux.toast.text("删除失败...")})},delete_localArr_by_orderId:function(e){for(var t=0;t<this.all_order_list.length;t++)if(e===this.all_order_list[t].orderId){this.all_order_list.splice(t,1);break}this.switchTabItem({cur_index:this.index},!1)},wuliuFn:function(e){this.$router.push({name:"logisticsQuery",params:{orderInfo:e}})}},created:function(){console.log("订单created...."),this.orderListReq()}}),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"myFocusPage"}},[n("x-header",{attrs:{title:"全部订单","right-options":{showMore:!1}},on:{"on-click-more":function(t){e.show=!0}}},[n("span",{directives:[{name:"tap",rawName:"v-tap",value:{methods:e.backFn},expression:"{methods: backFn}"}],attrs:{slot:"right",type:"navicon",size:"35"},slot:"right"},[e._v("我的")])]),e._v(" "),n("tab",{attrs:{"line-width":2,"active-color":"#fc378c","prevent-default":""},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},e._l(e.list2,function(t,o){return n("tab-item",{directives:[{name:"tap",rawName:"v-tap",value:{methods:e.switchTabItem,cur_index:o},expression:"{methods:switchTabItem , cur_index:index}"}],key:o,staticClass:"vux-center",attrs:{selected:e.demo2===t}},[e._v(e._s(t))])}),1),e._v(" "),n("swiper",{ref:"mySwiper",attrs:{id:"mySwiper","show-dots":!1},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},[n("orderListCell",{directives:[{name:"show",rawName:"v-show",value:e.orderListInfos.length>0,expression:"orderListInfos.length > 0"}],attrs:{orderInfoList:e.orderListInfos},on:{qufukuan:e.go_to_pay,chakanwuliu:e.wuliuFn,querenshouhuo:e.qurenshouhuo,qupingjia:e.pingjia_fn,quxiaodingdan:e.cancelOrder,shanchudingdan:e.deleteOrder}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.orderListInfos.length<=0,expression:"orderListInfos.length <= 0"}],staticClass:"noList"},[e._v("\n      "+e._s(e.noListFn())+"\n    ")])],1)],1)},m=[],x={render:v,staticRenderFns:m},_=x,b=n("C7Lr"),w=o,I=b(g,_,!1,w,"data-v-1dbe1929",null);t.default=I.exports},y5fK:function(e,t,n){t=e.exports=n("UTlt")(!1),t.push([e.i,"\n.order_list_cell_wrap[data-v-379a51c8] {\n  margin-top: 10px;\n  font-size: 12px;\n}\n.cell_tou[data-v-379a51c8] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding: 0 15px;\n}\n.cell_tou > div[data-v-379a51c8] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.order_list_cell_wrap img[data-v-379a51c8] {\n  width: 20px;\n  vertical-align: middle;\n}\n.cell_tou[data-v-379a51c8] {\n  background-color: white;\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n.order_list_cell_wrap span[data-v-379a51c8] {\n  vertical-align: middle;\n}\n.cell_tou > div[data-v-379a51c8]:nth-child(2) {\n  text-align: right;\n}\n.cell_tou > div:nth-child(2) span[data-v-379a51c8] {\n  color: #fb3808;\n}\n.cell_content[data-v-379a51c8] {\n  background-color: #f9f9f9;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding: 10px 15px;\n}\n.cell_content .left[data-v-379a51c8] {\n  -webkit-box-flex: 30%;\n  -webkit-flex: 30%;\n          flex: 30%;\n}\n.cell_content .left img[data-v-379a51c8] {\n  width: 100%;\n}\n.cell_content .center[data-v-379a51c8] {\n  -webkit-box-flex: 53%;\n  -webkit-flex: 53%;\n          flex: 53%;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.cell_content .center p[data-v-379a51c8]:nth-child(1) {\n  color: black;\n  display: -webkit-box;\n  word-break: break-all;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n.cell_content .center p[data-v-379a51c8]:nth-child(2) {\n  color: #858585;\n  display: -webkit-box;\n  word-break: break-all;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n  margin-top: 3px;\n}\n.cell_content .center p[data-v-379a51c8]:nth-child(3) {\n  margin-top: 3px;\n}\n.cell_content .center p:nth-child(3) span[data-v-379a51c8] {\n  color: #d10018;\n  border: 1px solid #d10018;\n  border-radius: 3px;\n  padding: 0 2px;\n}\n.cell_content .right[data-v-379a51c8] {\n  -webkit-box-flex: 15%;\n  -webkit-flex: 15%;\n          flex: 15%;\n  text-align: right;\n}\n.cell_content .right p[data-v-379a51c8]:nth-child(2) {\n  color: #858585;\n  text-decoration: line-through;\n}\n.zongji[data-v-379a51c8] {\n  border-bottom: 0.5px solid #d7d7d7;\n  padding: 10px 15px;\n  text-align: right;\n}\n.zongjia_left[data-v-379a51c8] {\n  float: left;\n}\n.cell_btns .btns[data-v-379a51c8] {\n  border-bottom: 0.5px solid #d7d7d7;\n  padding: 13px 15px;\n  text-align: right;\n}\n.cell_btns .btns span[data-v-379a51c8] {\n  border: 1px solid #acacac;\n  border-radius: 99px;\n  padding: 6px 5px;\n  margin-left: 8px;\n}\n.order_list_cell_wrap .cell_btns .gaoliang[data-v-379a51c8] {\n  color: #fb3808;\n  border: 1px solid #fb3808;\n}\n.cell_bottom[data-v-379a51c8] {\n  text-align: right;\n  padding-left: 15px;\n  padding-right: 15px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  background-color: #f9f9f9;\n}\n.pingjia_btn[data-v-379a51c8] {\n  color: #fb3808;\n  border: 1px solid #fb3808;\n  border-radius: 99px;\n  padding: 6px 5px;\n  margin-left: 10px;\n}\n.cell_content1[data-v-379a51c8] {\n  border-bottom: 1px solid white;\n}\n",""])}});