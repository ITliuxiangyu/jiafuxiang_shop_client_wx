webpackJsonp([28],{Szbw:function(t,n,e){var a=e("sPAv");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("FIqI")("5296581c",a,!0,{})},floN:function(t,n,e){"use strict";function a(t){e("Szbw")}Object.defineProperty(n,"__esModule",{value:!0});var i=e("3cXf"),o=e.n(i),s=e("Ztse"),d=e("+EaS"),r=e("bT6r"),l=e("4PKW"),m=e("QpaW"),v=e("+Jte"),c=e("84iU"),f=e.n(c),p=e("CtzY"),u=e.n(p),h=(s.a,d.a,l.a,m.a,r.a,{components:{XHeader:s.a,Flexbox:d.a,FlexboxItem:l.a,Divider:m.a,Toast:r.a},data:function(){return{myFavourite:[],messShow:!1,message:"",wxOpenId:localStorage.getItem("openid")}},methods:{backFn:function(){this.$router.push({name:"userInfo"})},requestFavouriteData:function(){var t=this,n=u.a.stringify({wxid:this.wxOpenId,tablename:"favorite"});f.a.post(Object(v.b)()+"favoriteAndLookTableManageJsonSelect/",n,{emulateJSON:!0}).then(function(n){"ok"===n.data.status&&(t.myFavourite=n.data.data)},function(n){t.$vux.toast.text("网络请求失败....","bottom"),console.log(n)})},urlList:function(t){return Object(v.a)(t)},shopListDetail:function(t){this.$router.push({name:"goods_detail",params:{goodsId:t}})},cancelFavourite:function(t){var n=this;event.stopPropagation();var e=t.split(","),a=u.a.stringify({ids:o()(e),tablename:"favorite"});f.a.post(Object(v.b)()+"cartstableManageJsonDelete/",a,{emulateJSON:!0}).then(function(t){"ok"===t.data.status&&(n.messShow=!0,n.message="取消收藏成功",n.requestFavouriteData())},function(t){n.$vux.toast.text("网络请求失败....","bottom"),console.log(t)})}},created:function(){this.wxOpenId=localStorage.getItem("openid"),this.requestFavouriteData()},updated:function(){},deactivated:function(){this.$destroy()}}),g=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("x-header",{attrs:{title:"我的收藏"}},[e("span",{directives:[{name:"tap",rawName:"v-tap",value:{methods:t.backFn},expression:"{methods: backFn}"}],attrs:{slot:"right",type:"navicon",size:"35"},slot:"right"},[t._v("我的")])]),t._v(" "),t._l(t.myFavourite,function(n,a){return e("div",{key:a,staticClass:"box"},[e("div",{staticClass:"title_div"},[e("span",[t._v(t._s(n.goods.shopname))])]),t._v(" "),e("div",{staticClass:"news_div"},[e("div",{staticClass:"shou_wraps",on:{click:function(e){return t.shopListDetail(n.goods.goodsid)}}},[e("div",{staticClass:"shou_item1"},[e("img",{attrs:{src:t.urlList(n.goods),alt:""}})]),t._v(" "),e("div",{staticClass:"shou_item2"},[e("span",{staticClass:"middle_name_span2 goods_name"},[t._v(t._s(n.goods.goodsname))])]),t._v(" "),e("div",{staticClass:"shou_item3"},[e("div",{staticClass:"money_div"},[t._v("\n                    ￥"+t._s(n.goods.shop_price)+"\n                  ")]),t._v(" "),e("div",{staticClass:"left_div_bottom1",on:{click:function(e){return t.cancelFavourite(n.id)}}},[t._v("\n                  取消收藏\n                ")])])])])])}),t._v(" "),e("toast",{attrs:{position:"middle",type:"text"},model:{value:t.messShow,callback:function(n){t.messShow=n},expression:"messShow"}},[t._v(t._s(t.message))])],2)},_=[],b={render:g,staticRenderFns:_},x=b,w=e("C7Lr"),k=a,y=w(h,x,!1,k,"data-v-6052afaf",null);n.default=y.exports},sPAv:function(t,n,e){n=t.exports=e("UTlt")(!1),n.push([t.i,"\n.box[data-v-6052afaf]{\n  /* height: 10.625rem; */\n  background: white;\n  margin-top: .3125rem;\n  padding: 0rem .625rem;\n}\n.shou_wraps[data-v-6052afaf]{\n  padding-top: 10px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding-bottom:10px\n}\n.shou_item1[data-v-6052afaf]{\n  /*width:100px */\n  width: 24%;\n  height: 0;\n  overflow: hidden;\n  padding-bottom: 24%;\n}\n.shou_item1 img[data-v-6052afaf]{\n/*height: 4.75rem;\n  width: 90px*/\n  width: 100%;\n}\n.shou_item2[data-v-6052afaf]{\n  -webkit-box-flex: 2;\n  -webkit-flex: 2;\n          flex: 2;\n  margin: auto 5px;\n}\n.shou_item3[data-v-6052afaf]{\n  width: 100px;\n  text-align: right;\n}\n/* .news_div{\n  padding: 1.25rem 0rem;\n} */\n/* .news_div>div{\n  float: left;\n}\n.img_div{\n  width: 25%;\n}\n.middle_div{\n  width: 35%;\n  padding-left: 1.25rem\n}\n.left_div{\n  width: 30%;\n}\n.img_div img{\n  height: 4.75rem;\n  width: 90px\n} */\n.title_div[data-v-6052afaf]{\n  height: 2.875rem;\n  line-height: 2.875rem;\n  color: #909291;\n  border-bottom:1px solid #e7e7e7;\n}\n/* .middle_name{\n  margin-bottom:.3125rem;\n}\n.middle_name_span1{\n  color: rgb(228, 20, 20);\n}\n.middle_name_span3{\n  font-size: 0.8rem;\n  line-height: 140%;\n  color: rgb(112, 112, 112);\n}\n.middle_name_span4{\n  font-size: 0.8rem;\n  color: rgb(228, 20, 20);\n}\n.middle_span4{\n  margin-top: 1rem;\n}\n\n.left_div_bottom2{\n  font-size:0.8rem; \n  border: 1px solid rgb(85, 84, 84);\n  margin-top:1.25rem;\n  padding: .125rem .3125rem;\n  color: rgb(85, 84, 84);\n  border-radius:.1875rem;\n  float: right;\n}\n.money_div{\n  float: right;\n}  */\n.shou_item3 .left_div_bottom1[data-v-6052afaf]{\n  font-size:0.8rem; \n  border: 1px solid red;\n  margin-top:1.25rem;\n  padding: .125rem .3125rem;\n  color:  red;\n  border-radius:.1875rem;\n  float: right;\n}\n.goods_name [data-v-6052afaf], .goods_param[data-v-6052afaf]{\n  overflow: hidden;\n  -webkit-line-clamp: 3;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n}\n",""])}});