webpackJsonp([17],{"+IAV":function(t,s,e){var n=e("zts8");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("FIqI")("a3af802e",n,!0,{})},"0Muy":function(t,s,e){s=t.exports=e("UTlt")(!1),s.push([t.i,"\n#shareList_wrap[data-v-2a2f1fb8]{\r\n    margin: 50px 0.5rem;\n}\n.shareList_contents[data-v-2a2f1fb8]{\r\n    display: -webkit-box;\r\n    display: -webkit-flex;\r\n    display: flex;\r\n    margin-top:0.1rem; \r\n    border-radius: 5px;\r\n    padding: 6px;\r\n    background: #ffffff\n}\n.shareList_img[data-v-2a2f1fb8]{\r\n    width: 110px;\n}\n.shareList_img img[data-v-2a2f1fb8]{\r\n    width: 100px;\r\n    height: 100px;\n}\n.shareList_detail[data-v-2a2f1fb8]{\r\n    -webkit-box-flex: 1;\r\n    -webkit-flex: 1;\r\n            flex: 1;\r\n    position: relative\n}\n.shareList_spans span[data-v-2a2f1fb8]{\r\n    display: inline-block;\r\n    background: #f4f4f4;\r\n    margin: 1px;\r\n    font-size: 8px;\r\n    color: #666\n}\n.shareList_prices[data-v-2a2f1fb8]{\r\n    font-size: 16px;\r\n    color: #ed393d\n}\n.shareList_prices span[data-v-2a2f1fb8]{\r\n display: inline-block;\r\n padding: 0px 0.5rem;\r\n    background: #ed393d;\r\n    margin: 1px;\r\n    border-radius: 10px;\r\n    font-size: 8px;\r\n    color: #ffffff\n}\n.shareList_desc[data-v-2a2f1fb8]{\r\n    font-size: 14px;\r\n     display: -webkit-box;  \r\n  word-break: break-all;  \r\n  text-overflow: ellipsis;  \r\n  -webkit-box-orient: vertical;  \r\n  -webkit-line-clamp: 2;\r\n  overflow: hidden\n}\n.shareList_others[data-v-2a2f1fb8]{\r\n    font-size: 10px;\r\n    color: #666\n}\n.deleData[data-v-2a2f1fb8]{\r\n    font-size:0.8rem; \r\n  border: 1px solid red;\r\n  margin-top:1.25rem;\r\n  padding: .125rem .3125rem;\r\n  color:  red;\r\n  border-radius:.1875rem;\r\n  position: absolute;\r\n  bottom: 20px;\r\n  right: 0;\n}\r\n",""])},InS7:function(t,s,e){"use strict";function n(t){e("n8Lg")}var i=e("OP72"),a=e("+Jte"),r=(i.a,{components:{Panel:i.a},props:["shareList"],methods:{shopListDetail:function(t){this.$router.push({name:"goods_detail",params:{goodsId:t}})},deleData:function(t,s){void 0!==t&&Object(a.f)().my_post("buyhistoryDelete",{buyid:t},function(t){"ok"===t.data.status&&this.$vux.toast.text("删除成功","center")},function(t){this.$vux.toast.text("网络请求失败....","bottom"),console.log(t)}),void 0!==s&&Object(a.f)().my_post("delShare",{shareid:s},function(){},function(t){this.$vux.toast.text("网络请求失败....","bottom"),console.log(t)})},requestShareList:function(){Object(a.f)().my_post("findShare",{wxid:Object(a.f)().get_local_userinfo.wxid},function(){},function(t){this.$vux.toast.text("网络请求失败....","bottom"),console.log(t)})}},data:function(){return{type:"1"}},computed:{}}),o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"shareList_wrap"}},t._l(t.shareList,function(s,n){return e("div",{key:n,staticClass:"shareList_contents"},[e("div",{staticClass:"shareList_img",on:{click:function(e){return t.shopListDetail(s.goodsid)}}},[e("img",{attrs:{src:s.src,alt:""}})]),t._v(" "),e("div",{staticClass:"shareList_detail"},[e("div",{staticClass:"shareList_desc"},[t._v(t._s(s.title)+","+t._s(s.desc))]),t._v(" "),e("div",{staticClass:"shareList_spans"},[e("span",[t._v(t._s(s.keyWorlds))])]),t._v(" "),e("div",{staticClass:"shareList_prices"},[t._v("￥"+t._s(s.shop_price)+" "),e("span",[t._v(t._s(s.rebate))])]),t._v(" "),e("div",{staticClass:"shareList_others"},[t._v(" 20条评价  98%好评")]),t._v(" "),e("div",{staticClass:"deleData",on:{click:function(e){return t.deleData(s.buyid,s.item.buyid)}}},[t._v("删除记录")])])])}),0)},d=[],l={render:o,staticRenderFns:d},c=l,p=e("C7Lr"),f=n,u=p(r,c,!1,f,"data-v-2a2f1fb8",null);s.a=u.exports},n8Lg:function(t,s,e){var n=e("0Muy");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("FIqI")("a5754d98",n,!0,{})},uppw:function(t,s,e){"use strict";function n(t){e("+IAV")}Object.defineProperty(s,"__esModule",{value:!0});var i=e("Ztse"),a=e("+EaS"),r=e("bT6r"),o=e("4PKW"),d=e("QpaW"),l=e("oast"),c=e("InS7"),p=e("+Jte"),f=e("84iU"),u=e.n(f),h=e("CtzY"),_=e.n(h),b=(i.a,a.a,o.a,d.a,r.a,c.a,l.a,{components:{XHeader:i.a,Flexbox:a.a,FlexboxItem:o.a,Divider:d.a,Toast:r.a,SharePage:c.a,XButton:l.a},data:function(){return{myFavourite:[],messShow:!1,message:"",shareList:[],user_info:Object(p.f)().get_local_userinfo,hasRecord:!0}},methods:{requestShareList:function(){var t=this,s=_.a.stringify({wxid:this.user_info.wxid});u.a.post(Object(p.b)()+"findShare/",s,{emulateJSON:!0}).then(function(s){if("ok"===s.data.status){var e=[],n=s.data.data;if("0"===n.length)t.hasRecord=!1;else{for(var i=0;i<n.length;i++){var a={};a.src=t.urlList(n[i].goods.product_thumb_image),a.title=n[i].goods.goodsname,a.desc=n[i].goods.standard,a.goodsid=n[i].goods.goodsid,a.shop_price=n[i].goods.shop_price,a.market_price=n[i].goods.market_price,a.rebate="返利￥"+n[i].goods.rebate+"元",a.kucun=n[i].goods.counts,a.sellCount=n[i].goods.sellcount,a.shareid=n[i].shareid,e.push(a)}t.shareList=e}}},function(s){t.$vux.toast.text("网络请求失败....","bottom"),console.log(s)})},shopListDetail:function(t){this.$router.push({name:"goods_detail",params:{goodsId:t}})},deleData:function(t){var s=this,e=_.a.stringify({shareid:t});u.a.post(Object(p.b)()+"delShare/",e,{emulateJSON:!0}).then(function(t){"ok"===t.data.status&&(s.messShow=!0,s.message="取消分享成功",s.requestShareList())},function(t){s.$vux.toast.text("网络请求失败....","bottom"),console.log(t)})},urlList:function(t){if(null!==t){return Object(p.b)()+t}},go_classify:function(){this.$router.push({name:"classify"})}},created:function(){this.requestShareList()},deactivated:function(){this.$destroy()}}),v=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("x-header",{staticStyle:{position:"fixed",top:"0px","z-index":"1000",width:"100%"},attrs:{title:"我的分享","right-options":{showMore:!1}},on:{"on-click-more":function(s){t.show=!0}}}),t._v(" "),t.hasRecord?e("div",{attrs:{id:"shareList_wrap"}},[t._l(t.shareList,function(s,n){return e("div",{key:n,staticClass:"shareList_contents"},[e("div",{staticClass:"shareList_img",on:{click:function(e){return t.shopListDetail(s.goodsid)}}},[e("img",{attrs:{src:s.src,alt:""}})]),t._v(" "),e("div",{staticClass:"shareList_detail"},[e("div",{staticClass:"shareList_desc"},[t._v(t._s(s.title)+","+t._s(s.desc))]),t._v(" "),e("div",{staticClass:"shareList_spans"},[e("span",[t._v(t._s(s.keyWorlds))])]),t._v(" "),e("div",{staticClass:"shareList_prices"},[t._v("￥"+t._s(s.shop_price)+" "),e("span",[t._v(t._s(s.rebate))])]),t._v(" "),e("div",{staticClass:"shareList_others"},[t._v(" 20条评价  98%好评")]),t._v(" "),e("div",{staticClass:"deleData",on:{click:function(e){return t.deleData(s.shareid)}}},[t._v("取消分享")])])])}),t._v(" "),e("toast",{attrs:{position:"middle",type:"text"},model:{value:t.messShow,callback:function(s){t.messShow=s},expression:"messShow"}},[t._v(t._s(t.message))])],2):e("div",{staticClass:"cart_wrap"},[e("x-button",{staticClass:"go_choose",attrs:{mini:"",plain:""},nativeOn:{click:function(s){return t.go_classify(s)}}},[t._v("马上去分享")])],1)],1)},m=[],x={render:v,staticRenderFns:m},g=x,L=e("C7Lr"),k=n,w=L(b,g,!1,k,null,null);s.default=w.exports},zts8:function(t,s,e){s=t.exports=e("UTlt")(!1),s.push([t.i,"\n.deleData{\n  font-size:0.8rem; \n  border: 1px solid red;\n  margin-top:1.25rem;\n  padding: .125rem .3125rem;\n  color:  red;\n  border-radius:.1875rem;\n  position: absolute;\n  z-index: 100\n}\n#shareList_wrap{\n    margin: 50px 0.5rem;\n}\n.shareList_contents{\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    margin-top:0.1rem; \n    border-radius: 5px;\n    padding: 6px;\n    background: #ffffff\n}\n.shareList_img{\n    width: 110px;\n}\n.shareList_img img{\n    width: 100px;\n    height: 100px;\n}\n.shareList_detail{\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    position: relative\n}\n.shareList_spans span{\n    display: inline-block;\n    background: #f4f4f4;\n    margin: 1px;\n    font-size: 8px;\n    color: #666\n}\n.shareList_prices{\n    font-size: 16px;\n    color: #ed393d\n}\n.shareList_prices span{\ndisplay: inline-block;\npadding: 0px 0.5rem;\n    background: #ed393d;\n    margin: 1px;\n    border-radius: 10px;\n    font-size: 8px;\n    color: #ffffff\n}\n.shareList_desc{\n    font-size: 14px;\n    display: -webkit-box;  \n  word-break: break-all;  \n  text-overflow: ellipsis;  \n  -webkit-box-orient: vertical;  \n  -webkit-line-clamp: 2;\n  overflow: hidden\n}\n.shareList_others{\n    font-size: 10px;\n    color: #666\n}\n.deleData{\n    font-size:0.8rem; \n  border: 1px solid red;\n  margin-top:1.25rem;\n  padding: .125rem .3125rem;\n  color:  red;\n  border-radius:.1875rem;\n  position: absolute;\n  bottom: 20px;\n  right: 0;\n}\n.cart_wrap {\n  background: url(/static/cart/gwbg@2x.png);\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  width: 100%;\n  height: 43rem;\n  position: relative;\n}\n.go_choose {\n  position: absolute;\n  top: 30rem;\n  left: 10rem;\n}\n",""])}});