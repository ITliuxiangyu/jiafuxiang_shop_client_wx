webpackJsonp([37],{"/8/T":function(n,t,e){"use strict";function a(n){e("Ml6e")}Object.defineProperty(t,"__esModule",{value:!0});var o=e("VawC"),i=e("6ONn"),r=e("EFzr"),s=e("d2IS"),l=e("Ztse"),c=e("QcMK"),b=(c.a,l.a,o.a,i.a,r.a,s.a,{components:{ShopCell:c.a,XHeader:l.a,Tab:o.a,TabItem:i.a,Swiper:r.a,SwiperItem:s.a},data:function(){return{dataList:[],list2:["商品","店铺"],demo2:"商品",index:0,shangpinList:[],dianpuList:[]}},created:function(){this.$nextTick(function(){this.$refs.mySwiper.xheight="300px";var n=this.$(window).height(),t=this.$(".vux-header").outerHeight(),e=this.$(".vux-tab").outerHeight();this.$refs.mySwiper.xheight=n-t-e+"px",this.$(".vux-swiper").css({overflow:"scroll"})})},methods:{switchTabItem:function(n){var t=this;this.$vux.loading.show({text:"loading"}),setTimeout(function(){t.$vux.loading.hide(),t.$data.index=n,0===n&&(t.$data.dataList=[]),1===n&&(t.$data.dataList=[]),t.$(".vux-swiper").scrollTop(0)},500)}}}),d=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"myFocusPage"}},[e("x-header",{attrs:{title:"我的关注","right-options":{showMore:!0}},on:{"on-click-more":function(t){n.show=!0}}}),n._v(" "),e("tab",{attrs:{"line-width":2,"active-color":"#fc378c","prevent-default":""},on:{"on-before-index-change":n.switchTabItem},model:{value:n.index,callback:function(t){n.index=t},expression:"index"}},n._l(n.list2,function(t,a){return e("tab-item",{key:a,staticClass:"vux-center",attrs:{selected:n.demo2===t}},[n._v(n._s(t))])}),1),n._v(" "),e("swiper",{ref:"mySwiper",attrs:{id:"mySwiper","show-dots":!1},model:{value:n.index,callback:function(t){n.index=t},expression:"index"}},[e("shop-cell",{attrs:{list:n.dataList}})],1)],1)},x=[],p={render:d,staticRenderFns:x},f=p,u=e("C7Lr"),v=a,h=u(b,f,!1,v,"data-v-00eba644",null);t.default=h.exports},"3N8Z":function(n,t,e){t=n.exports=e("UTlt")(!1),t.push([n.i,'\n.vux-1px[data-v-00eba644],\n.vux-1px-t[data-v-00eba644],\n.vux-1px-b[data-v-00eba644],\n.vux-1px-tb[data-v-00eba644],\n.vux-1px-l[data-v-00eba644],\n.vux-1px-r[data-v-00eba644] {\n  position: relative;\n}\n.vux-1px[data-v-00eba644]:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 200%;\n  border: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  height: 200%;\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n.vux-1px-t[data-v-00eba644]:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.vux-1px-b[data-v-00eba644]:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.vux-1px-tb[data-v-00eba644]:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.vux-1px-tb[data-v-00eba644]:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.vux-1px-l[data-v-00eba644]:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n.vux-1px-r[data-v-00eba644]:after {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  -webkit-transform-origin: 100% 0;\n          transform-origin: 100% 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n.vux-center-v[data-v-00eba644],\n.vux-center-h[data-v-00eba644],\n.vux-center[data-v-00eba644] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n.vux-center-v[data-v-00eba644],\n.vux-center[data-v-00eba644] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.vux-center-h[data-v-00eba644],\n.vux-center[data-v-00eba644] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n#myFocusPage .vux-slider[data-v-00eba644] {\n  overflow: unset;\n}\n#myFocusPage #mySwiper .vux-swiper[data-v-00eba644] {\n  overflow: unset;\n}\n.tab-swiper[data-v-00eba644] {\n  background-color: #fff;\n  height: 100px;\n}\n',""])},Ml6e:function(n,t,e){var a=e("3N8Z");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("FIqI")("2b410234",a,!0,{})}});