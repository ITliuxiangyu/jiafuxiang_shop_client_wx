webpackJsonp([15],{"1Tqr":function(t,e,n){var s=n("26rr");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n("FIqI")("64f5b424",s,!0,{})},"26rr":function(t,e,n){e=t.exports=n("UTlt")(!1),e.push([t.i,"\n.msg_page_wrap[data-v-6abbb91b] {\n  \n  background: #dfdfdf;\n}\n.list_wrap[data-v-6abbb91b]{\n  height: 300px;\n  padding-top: 17px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.one_msg[data-v-6abbb91b]{\n  margin-bottom: 17px;\n}\n.my_bottom[data-v-6abbb91b]{\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n}\n",""])},"9vkH":function(t,e,n){var s=n("JcTw");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n("FIqI")("45dfa93d",s,!0,{})},JcTw:function(t,e,n){e=t.exports=n("UTlt")(!1),e.push([t.i,"\n.content[data-v-01c90ace] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n.right_space[data-v-01c90ace],\n.left_space[data-v-01c90ace] {\n  -webkit-box-flex: 3.25;\n  -webkit-flex: 3.25;\n          flex: 3.25;\n}\n.content .left_img[data-v-01c90ace],\n.content .right_img[data-v-01c90ace] {\n  height: 0;\n  width: 11.53%;\n  padding-bottom: 10%;\n}\n.content .left_img > img[data-v-01c90ace],\n.content .right_img > img[data-v-01c90ace] {\n  width: 100%;\n}\n.content .left_content_space[data-v-01c90ace],\n.content .right_content_space[data-v-01c90ace] {\n  width: 3.479%;\n}\n.content .real_content[data-v-01c90ace] {\n  width: 69.982%;\n  background: white;\n  border-radius: 6px;\n  padding: 5px;\n}\n",""])},VDYs:function(t,e,n){var s=n("zI8c");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n("FIqI")("ae61990a",s,!0,{})},q8ac:function(t,e,n){"use strict";function s(t){n("9vkH")}function i(t){n("VDYs")}function a(t){n("1Tqr")}Object.defineProperty(e,"__esModule",{value:!0});var o=n("oast"),c=n("KiN3"),r=n("Ztse"),d=n("+Jte"),l={components:{},props:["direction","item"],methods:{isLeft:function(){return this.item.senderId===Object(d.f)().socket_info.serverId}},data:function(){return{userInfo:""}},computed:{},created:function(){this.userInfo=Object(d.f)().get_local_userinfo}},g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"msg_cell_class"},[n("div",{staticClass:"left_space"}),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"left_img"},[n("img",{directives:[{name:"show",rawName:"v-show",value:t.isLeft(),expression:"isLeft()"}],attrs:{src:"/static/bottom/1.png",alt:""}})]),t._v(" "),n("div",{staticClass:"left_content_space"}),t._v(" "),n("div",{staticClass:"real_content"},[t._v("\n      "+t._s(t.item.content)+"\n    ")]),t._v(" "),n("div",{staticClass:"right_content_space"}),t._v(" "),n("div",{staticClass:"right_img"},[n("img",{directives:[{name:"show",rawName:"v-show",value:!t.isLeft(),expression:"!isLeft()"}],attrs:{src:t.userInfo.headimg,alt:""}})])]),t._v(" "),n("div",{staticClass:"right_space"})])},f=[],u={render:g,staticRenderFns:f},p=u,m=n("C7Lr"),v=s,_=m(l,p,!1,v,"data-v-01c90ace",null),h=_.exports,b=(o.a,c.a,{components:{XButton:o.a,XInput:c.a},props:[],methods:{sendMsgFn:function(){this.$emit("sendMsg",this.msgValue),this.msgValue=""}},data:function(){return{msgValue:""}},computed:{}}),w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"msg_bottom"},[n("div",{staticClass:"left"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.msgValue,expression:"msgValue"}],attrs:{placeholder:"请输入消息内容"},domProps:{value:t.msgValue},on:{input:function(e){e.target.composing||(t.msgValue=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"right"},[n("x-button",{directives:[{name:"tap",rawName:"v-tap",value:{methods:t.sendMsgFn},expression:"{methods: sendMsgFn}"}],attrs:{text:"发送",mini:!0,gradients:["#FF5E3A","#FF9500"]}})],1)])},x=[],y={render:w,staticRenderFns:x},I=y,k=n("C7Lr"),M=i,C=k(b,I,!1,M,"data-v-30b85e8a",null),L=C.exports,T=(o.a,c.a,r.a,{directives:{},components:{XButton:o.a,XInput:c.a,XHeader:r.a,msgCell:h,msgBottom:L},methods:{onItemClick:function(t,e){this.disabled||(this.showPopup=!1)},sendMsg:function(t){var e=this,n=window.conn.getUniqueId(),s=window.WebIM.message,i=new s("txt",n);i.set({msg:t,to:Object(d.f)().socket_info.serverId,roomType:!1,success:function(n,s){console.log("发送消息成功");var i={content:t,receiveId:Object(d.f)().socket_info.serverId,senderId:Object(d.f)().get_local_wxid,status:0,time:Object(d.f)().date_format(new Date,"yyyy-MM-dd hh:mm:ss")};e.msgList.push(i),setTimeout(function(){var n=e.$(".list_wrap").prop("scrollHeight");e.$(".list_wrap").scrollTop(n+2e3,1e3),e.sendMsgToServer(t)},100)},fail:function(t){console.log("发送消息失败"),console.log(t)}}),i.body.chatType="singleChat",window.conn.send(i.body)},getMsgList:function(){this.msgList=[];var t=this;t.msgList=t.$route.params.msgList,t.unreadNum=t.$route.params.unreadNum,setTimeout(function(){var e=t.$(".list_wrap").prop("scrollHeight");t.$(".list_wrap").scrollTop(e+2e3,1e3)},1e3)},sendMsgToServer:function(t){var e=Object(d.f)().socket_info.serverId,n=Object(d.f)().get_local_wxid;Object(d.f)().my_post("addLeaveMessage",{receiveId:e,senderId:n,content:t},function(t){console.log(t)},function(t){console.log(t)})},receiveMsg:function(t){var e=this,n={content:t.data,receiveId:Object(d.f)().get_local_wxid,senderId:Object(d.f)().socket_info.serverId,status:1,time:Object(d.f)().date_format(new Date,"yyyy-MM-dd hh:mm:ss")};e.msgList.push(n),setTimeout(function(){var t=e.$(".list_wrap").prop("scrollHeight");e.$(".list_wrap").scrollTop(t+2e3,1e3)},100)},listenMsg:function(){var t=this;window.addEventListener("kefu_page_event",function(e){var n=e.detail.info;t.receiveMsg(n),t.isReadAll=!0})},readAllMsg:function(){Object(d.f)().my_post("read_all_msg_by_wxid",{wxid:Object(d.f)().get_local_wxid,client:"client"},function(t){console.log("标记已读"),console.log(t)},function(t){console.log(t)})}},data:function(){return{msgList:[],isReadAll:!1,unreadNum:0}},mounted:function(){0!==this.unreadNum&&this.readAllMsg()},created:function(){this.getMsgList(),this.$nextTick(function(){var t=this.$(window).height(),e=this.$(".vux-header").outerHeight(),n=this.$(".my_bottom").outerHeight();this.$(".list_wrap").height(t-e-n),this.$(".list_wrap").css({overflow:"scroll"})}),this.listenMsg()},beforeDestroy:function(){this.isReadAll&&(this.readAllMsg(),window.removeEventListener("kefu_page_event",this.receiveMsg))}}),$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"msg_page"},[n("x-header",{attrs:{title:"客服消息"},on:{"on-click-more":function(e){t.show=!0}}}),t._v(" "),n("div",{staticClass:"msg_page_wrap"},[n("div",{staticClass:"list_wrap"},t._l(t.msgList,function(t,e){return n("div",{staticClass:"one_msg"},[n("msgCell",{attrs:{item:t}})],1)}),0),t._v(" "),n("div",{staticClass:"my_bottom"},[n("msgBottom",{on:{sendMsg:t.sendMsg}})],1)])],1)},j=[],O={render:$,staticRenderFns:j},F=O,N=n("C7Lr"),V=a,H=N(T,F,!1,V,"data-v-6abbb91b",null);e.default=H.exports},zI8c:function(t,e,n){e=t.exports=n("UTlt")(!1),e.push([t.i,"\n.msg_bottom[data-v-30b85e8a] {\n  background: #efefef;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n.left[data-v-30b85e8a] {\n  -webkit-box-flex: 80;\n  -webkit-flex: 80;\n          flex: 80;\n  text-align: center;\n}\n.right[data-v-30b85e8a] {\n  -webkit-box-flex: 20;\n  -webkit-flex: 20;\n          flex: 20;\n}\n.left input[data-v-30b85e8a] {\n  background: white;\n  border-radius: 6px;\n  padding-left: 8px;\n  padding-right: 8px;\n  width: 90%;\n  height: 40px;\n  border: 0px;\n}\n",""])}});