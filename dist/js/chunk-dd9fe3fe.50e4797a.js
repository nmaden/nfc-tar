(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd9fe3fe"],{"0c8c":function(i,t,s){"use strict";s.r(t);var a=function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{staticClass:"profile"},[s("div",{staticClass:"profile__inner"},[s("div",{staticClass:"profile__fio"},[s("p",{staticClass:"profile__fio"},[i._v(i._s(i.fio))])]),s("div",{staticClass:"profile__top"},[s("div",{staticClass:"profile__photo profile__gradient"},[s("div",{staticClass:"profile__image"},[s("img",{attrs:{src:i.$BACK_URL+"storage/"+i.photo_path,alt:""}})])]),s("div",{staticClass:"profile__right"},[s("p",[i._v(i._s(i.name_business))]),s("div",{staticClass:"profile__own__info"},i._l(i.phones,(function(t,a){return s("div",{key:a,staticClass:"profile__own__info--line"},[s("a",{attrs:{href:"tel:"+t.item}},[s("i",{staticClass:"mdi mdi-phone"})]),s("p",[i._v(i._s(t.value))])])})),0)])]),s("div",{staticClass:"profile__socials"},[s("div",{staticClass:"profile__links"},i._l(i.links,(function(t,a){return s("div",{key:a,staticClass:"profile__link",on:{click:function(s){return i.openLink(t.value)}}},[s("div",[t.icon?s("i",{class:"mdi "+t.icon}):s("i",{staticClass:"mdi mdi-link-variant"})]),s("a",{staticClass:"profile__link--name"},[i._v(i._s(t.name))])])})),0)])])])},n=[],e=(s("b0c0"),{name:"App",data:function(){return{links:[],phones:[],fio:"",name_business:"",photo_path:""}},beforeMount:function(){this.getProfile()},methods:{openLink:function(i){window.open(i,"_blank")},getProfile:function(){var i=this;this.$axios({method:"get",url:"".concat(this.$API_URL,"profile?id=")+this.$route.params.id,headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(t){console.log("ttt",t.data),0!==t.data.links.length&&(i.links=t.data.links),0!==t.data.phones.length&&(i.phones=t.data.phones),i.fio=t.data.name,i.name_business=t.data.name_business,i.photo_path=t.data.photo_path})).catch((function(i){console.log(i)}))}},watch:{}}),o=e,l=(s("70db"),s("2877")),c=Object(l["a"])(o,a,n,!1,null,null,null);t["default"]=c.exports},"70db":function(i,t,s){"use strict";s("aade")},aade:function(i,t,s){}}]);
//# sourceMappingURL=chunk-dd9fe3fe.50e4797a.js.map