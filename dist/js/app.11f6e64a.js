(function(e){function n(n){for(var c,r,o=n[0],i=n[1],h=n[2],d=0,l=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(u,r)&&u[r]&&l.push(u[r][0]),u[r]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);f&&f(n);while(l.length)l.shift()();return a.push.apply(a,h||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],c=!0,r=1;r<t.length;r++){var o=t[r];0!==u[o]&&(c=!1)}c&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var c={},r={app:0},u={app:0},a=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-58c86e1c":"0df4c89d","chunk-6cbb928e":"494c4f24","chunk-4222786a":"70ae5d82","chunk-a6cd2616":"35c32bf2","chunk-4aed5386":"990012a1","chunk-09817c92":"ce3a02fe","chunk-4cc9db55":"94c126ea","chunk-e25db0ce":"1783f32b","chunk-040e51b2":"91c91a70","chunk-0afee4c1":"0783431c","chunk-4508b71f":"91ce92a9","chunk-540032a2":"c348d509","chunk-75aaf8f6":"619ab51c","chunk-dd9fe3fe":"50e4797a"}[e]+".js"}function i(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-58c86e1c":1,"chunk-6cbb928e":1,"chunk-4222786a":1,"chunk-a6cd2616":1,"chunk-4aed5386":1,"chunk-09817c92":1,"chunk-4cc9db55":1,"chunk-e25db0ce":1,"chunk-040e51b2":1,"chunk-0afee4c1":1,"chunk-4508b71f":1,"chunk-540032a2":1,"chunk-75aaf8f6":1,"chunk-dd9fe3fe":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise((function(n,t){for(var c="css/"+({}[e]||e)+"."+{"chunk-58c86e1c":"a17a2c2c","chunk-6cbb928e":"4551a869","chunk-4222786a":"bb489d97","chunk-a6cd2616":"53a7b3af","chunk-4aed5386":"3ca7f8e3","chunk-09817c92":"095f9229","chunk-4cc9db55":"e7feae0a","chunk-e25db0ce":"47754973","chunk-040e51b2":"8ed4ddf8","chunk-0afee4c1":"7d7d5056","chunk-4508b71f":"7318dca1","chunk-540032a2":"ee3afe52","chunk-75aaf8f6":"33db4e1c","chunk-dd9fe3fe":"58eb132f"}[e]+".css",u=i.p+c,a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var h=a[o],d=h.getAttribute("data-href")||h.getAttribute("href");if("stylesheet"===h.rel&&(d===c||d===u))return n()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){h=l[o],d=h.getAttribute("data-href");if(d===c||d===u)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var c=n&&n.target&&n.target.src||u,a=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=c,delete r[e],f.parentNode.removeChild(f),t(a)},f.href=u;var s=document.getElementsByTagName("head")[0];s.appendChild(f)})).then((function(){r[e]=0})));var c=u[e];if(0!==c)if(c)n.push(c[2]);else{var a=new Promise((function(n,t){c=u[e]=[n,t]}));n.push(c[2]=a);var h,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=o(e);var l=new Error;h=function(n){d.onerror=d.onload=null,clearTimeout(f);var t=u[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+c+": "+r+")",l.name="ChunkLoadError",l.type=c,l.request=r,t[1](l)}u[e]=void 0}};var f=setTimeout((function(){h({type:"timeout",target:d})}),12e4);d.onerror=d.onload=h,document.head.appendChild(d)}return Promise.all(n)},i.m=e,i.c=c,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)i.d(t,c,function(n){return e[n]}.bind(null,c));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var h=window["webpackJsonp"]=window["webpackJsonp"]||[],d=h.push.bind(h);h.push=n,h=h.slice();for(var l=0;l<h.length;l++)n(h[l]);var f=d;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view")],1)],1)},u=[],a={name:"App",methods:{},watch:{}},o=a,i=(t("5c0b"),t("2877")),h=t("6544"),d=t.n(h),l=t("7496"),f=Object(i["a"])(o,r,u,!1,null,null,null),s=f.exports;d()(f,{VApp:l["a"]});var p=t("bc3a"),m=t.n(p),b=t("f309");c["default"].use(b["a"]);var k=new b["a"]({}),_=t("2f62"),E=t("0e44"),g=t("88b4"),A=t.n(g),v={state:{token:[],redirect:null},mutations:{SIGN_IN:function(e,n){e.token.push(n)},REDIRECT:function(e,n){e.redirect=n},LOGOUT:function(e){e.token=[],localStorage.clear()}},actions:{SIGN_IN_USER:function(e,n){var t=e.commit;t("SIGN_IN",n.token),t("REDIRECT",n.type),1==n.user?this.dispatch("USER_DATA"):this.dispatch("USER_DATA_ADMIN")},SIGN_OUT_USER:function(e){var n=e.commit;n("LOGOUT")},REDIRECT_FALSE:function(e){var n=e.commit;n("REDIRECT",!1)}},getters:{GET_TOKEN:function(e){return e.token},GET_REDIRECT:function(e){return e.redirect}}},S=(t("b0c0"),t("d3b7"),t("8c4f")),P=(t("3ca3"),t("ddb0"),[{path:"/",name:"Login",mode:"history",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-e25db0ce"),t.e("chunk-540032a2")]).then(t.bind(null,"2fef"))}},{path:"/registration",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-e25db0ce"),t.e("chunk-040e51b2")]).then(t.bind(null,"3fd1"))},name:"Registration"},{path:"/profile",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-4222786a")]).then(t.bind(null,"c66d"))},name:"Registration"},{path:"/guest/{id?}",component:function(){return t.e("chunk-dd9fe3fe").then(t.bind(null,"0c8c"))},name:"Guest"},{path:"/main",component:function(){return t.e("chunk-75aaf8f6").then(t.bind(null,"cd56"))},children:[{path:"/",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-4222786a")]).then(t.bind(null,"c66d"))},name:"Sign"},{path:"/settings",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-e25db0ce"),t.e("chunk-4aed5386"),t.e("chunk-4508b71f")]).then(t.bind(null,"f6ad"))},name:"Sign"},{path:"/result",component:function(){return t.e("chunk-58c86e1c").then(t.bind(null,"eeac"))},name:"Sign"}]},{path:"/admin",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-4cc9db55")]).then(t.bind(null,"5765"))},children:[{path:"/",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-e25db0ce"),t.e("chunk-540032a2")]).then(t.bind(null,"2fef"))},name:"Sign"},{path:"/orders",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-4aed5386"),t.e("chunk-09817c92")]).then(t.bind(null,"e58c"))},name:"Orders"},{path:"/profile",component:function(){return Promise.all([t.e("chunk-6cbb928e"),t.e("chunk-a6cd2616"),t.e("chunk-e25db0ce"),t.e("chunk-4aed5386"),t.e("chunk-0afee4c1")]).then(t.bind(null,"66aa"))},name:"Registration"}]}]);c["default"].use(S["a"]);var R=new S["a"]({mode:"history",base:"/",routes:P}),I=R.push;R.push=function(e,n,t){return n||t?I.call(this,e,n,t):I.call(this,e).catch((function(e){return S["a"].isNavigationFailure(e)?e:Promise.reject(e)}))};var O=R,y={state:{user_name:"",password_expired:null},mutations:{USER:function(e,n){e.user=n},PASSWORD_EXPIRED:function(e,n){e.password_expired=n}},actions:{USER_DATA:function(e){var n=this,t=e.commit;m()({method:"GET",url:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL+Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_VERSION+"user",headers:{Authorization:"Bearer "+localStorage.getItem("access_token_kcmr")}}).then((function(e){t("USER",e.data.data),1==n.getters.GET_REDIRECT&&O.push("/")})).catch((function(e){console.log(e)}))},USER_DATA_ADMIN:function(e){var n=this,t=e.commit;m()({method:"GET",url:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL+Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_VERSION+"admin",headers:{Authorization:"Bearer "+localStorage.getItem("access_token_kcmr")}}).then((function(e){t("USER",e.data.data),1==n.getters.GET_REDIRECT&&("MAIN"!=e.data.data.role.name?O.push("/kcmr"):O.push("/admin/panel"))})).catch((function(e){console.log(e)}))}},getters:{GET_USER_DATA:function(e){return e.user},GET_PASSWORD_EXPIRED_DATA:function(e){return e.password_expired}}},N={auth:v,user:y};c["default"].use(_["a"]);var T=new A.a({isCompression:!1}),U=new _["a"].Store({modules:N,plugins:[Object(E["a"])({storage:{getItem:function(e){return T.get(e)},setItem:function(e,n){return T.set(e,n)},removeItem:function(e){return T.remove(e)}}})]}),D=(t("ce8c"),t("b079")),w=t.n(D),j=t("5873");c["default"].config.productionTip=!1,c["default"].prototype.$axios=m.a,c["default"].prototype.$API_VERSION="v1/",c["default"].prototype.$BACK_URL="http://local.nfc.com/",c["default"].prototype.$API_VERSION_2=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_VERSION_2,c["default"].prototype.$API_URL="http://local.nfc.com/api/",c["default"].prototype.$API_MAIN=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API,c["default"].use(w.a),c["default"].use(j["a"]),new c["default"]({store:U,vuetify:k,router:O,render:function(e){return e(s)}}).$mount("#app")},"5c0b":function(e,n,t){"use strict";t("9c0c")},"9c0c":function(e,n,t){}});
//# sourceMappingURL=app.11f6e64a.js.map