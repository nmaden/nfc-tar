(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-008431cd"],{"46ec":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("v-data-table",{attrs:{headers:t.headers,items:t.users,page:t.page,loading:t.loading,options:t.options,"server-items-length":t.totalPage},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.created_at",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatDate(a.created_at))+" ")]}},{key:"item.updated_at",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatDate(a.updated_at))+" ")]}},{key:"item.action",fn:function(e){var s=e.item;return[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return["admin"==t.me.role.role?a("i",t._g(t._b({staticClass:"mdi mdi-pencil",on:{click:function(e){return t.openEditModal(s)}}},"i",n,!1),o)):t._e()]}}],null,!0)},[a("span",[t._v("Редактировать")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return["admin"==t.me.role.role?a("i",t._g(t._b({staticClass:"mdi mdi-trash-can-outline",on:{click:function(e){return t.openDeleteModal(s)}}},"i",n,!1),o)):t._e()]}}],null,!0)},[a("span",[t._v("Удалить")])])]}}])}),a("v-dialog",{attrs:{width:"500"},model:{value:t.destroyModal,callback:function(e){t.destroyModal=e},expression:"destroyModal"}},[a("v-card",{staticClass:"pa-6"},[a("h3",{staticClass:"mb-4"},[t._v("Удалить запись")]),a("v-btn",{attrs:{type:"submit",depressed:"",color:"primary"},on:{click:function(e){return t.deleteItem()}}},[t._v(" Да ")]),a("v-btn",{attrs:{type:"submit",depressed:"",color:"default"},on:{click:function(e){t.destroyModal=!1}}},[t._v(" Отмена ")])],1)],1),a("v-dialog",{attrs:{width:"500"},model:{value:t.newsModal,callback:function(e){t.newsModal=e},expression:"newsModal"}},[a("v-card",{staticClass:"pa-6"},[a("v-form",{ref:"form",staticClass:"sign__page__block",on:{submit:function(e){return e.preventDefault(),t.callFunction()}}},[1==t.type?a("h3",{staticClass:"mb-4"},[t._v("Создать пользователя")]):a("h3",{staticClass:"mb-4"},[t._v("Редактирование пользователя")]),a("div",{staticClass:"item__column"},[a("v-text-field",{staticClass:"input",attrs:{label:"ФИО",required:"",outlined:"",rules:t.nameRules},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),a("div",{staticClass:"item__column"},[a("v-text-field",{staticClass:"input",attrs:{label:"Email",required:"",outlined:"",rules:t.nameRules},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("div",{staticClass:"item__column"},[a("v-text-field",{staticClass:"input",attrs:{label:"Пароль",required:"",outlined:"",rules:t.nameRules},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),a("v-btn",{attrs:{type:"submit",depressed:"",color:"primary"}},[t._v(" Создать ")])],1)],1)],1)],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item__row item__ac"},[a("h2",[t._v("Журналирования событий")])])}],n=(a("ac1f"),a("1276"),a("b0c0"),a("a4d3"),a("e01a"),{name:"News",data:function(){return{headers:[{text:"№",align:"start",sortable:!1,value:"id"},{text:"Инициатор",value:"user.name"},{text:"Действие",value:"message"},{text:"Дата создание",value:"created_at"}],items:[],newsModal:!1,description:"",nameRules:[function(t){return!!t||"Заполните поле"}],descriptionRules:[function(t){return!!t||"Заполните поле"}],files:[],type:0,newsId:"",numberOfPages:null,totalPage:null,users:[],loading:!0,page:0,options:{itemsPerPage:2,page:1},me:[],name:null,email:null,password:null,destroyModal:!1,selectedUser:null}},methods:{formatDate:function(t){var e=t.split("T")[0].split("-"),a=t.split("T")[1].split(":");return e[2]+"-"+e[1]+"-"+e[0]+" "+a[0]+":"+a[1]},openEditModal:function(t){this.selectedUser=t,this.newsModal=!0,this.name=t.name,this.email=t.email},openDeleteModal:function(t){this.destroyModal=!0,this.selectedUser=t},getUser:function(){var t=this;this.$axios({method:"get",url:this.$API_URL+this.$API_VERSION+"me",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){t.me=e.data})).catch((function(t){console.warn(t)}))},fetch:function(){var t=this;this.loading=!0,this.$axios({method:"get",url:this.$API_URL+this.$API_VERSION+"logs?per_page="+this.options.itemsPerPage+"&page="+this.options.page,headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){t.loading=!1,t.numberOfPages=e.data.total,t.totalPage=e.data.total,t.users=e.data.data})).catch((function(t){console.warn(t)}))},chooseTypeFunction:function(t){this.type=t,this.newsModal=!0},callFunction:function(){1==this.type?this.create():this.update()},create:function(){var t=this;this.$axios.post(this.$API_URL+this.$API_VERSION+"user",{name:this.name,email:this.email,password:this.password},{headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){console.log(e),t.$toast.open({message:"Успешно создано",type:"success",position:"bottom",duration:4e3,queue:!0}),t.newsModal=!1,t.type=0,t.fetch()})).catch((function(e){e.response&&422==e.response.status&&t.$toast.open({message:"Заполните все поля",type:"error",position:"bottom",duration:4e3,queue:!0})}))},show:function(t){var e=this;this.newsId=t,this.$axios({method:"get",url:this.$API_URL+this.$API_VERSION+"user/"+t,headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(t){e.newsModal=!0,e.title=t.data.title,e.description=t.data.description})).catch((function(t){console.log(t)}))},deleteItem:function(){var t=this;this.$axios({method:"delete",url:this.$API_URL+this.$API_VERSION+"user/"+this.selectedUser.id,headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){t.title=e.data.title,t.description=e.data.description,t.fetch()})).catch((function(t){console.log(t)}))},update:function(){var t=this;this.$axios.put(this.$API_URL+this.$API_VERSION+"user/"+this.selectedUser.id,{name:this.name,email:this.email,password:this.password},{headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){console.log(e),t.$toast.open({message:"Успешно создано",type:"success",position:"bottom",duration:4e3,queue:!0}),t.newsModal=!1,t.fetch()})).catch((function(e){e.response&&422==e.response.status&&t.$toast.open({message:"Заполните все поля",type:"error",position:"bottom",duration:4e3,queue:!0})}))}},mounted:function(){this.getUser(),this.fetch()},beforeMount:function(){},watch:{options:{handler:function(t){t.itemsPerPage<0?(t.itemsPerPage=this.totalPage,this.fetch()):this.fetch()}},deep:!0}}),i=n,r=(a("e161"),a("2877")),l=a("6544"),c=a.n(l),u=a("8336"),d=a("b0af"),m=a("8fea"),h=a("169a"),p=a("4bd4"),f=a("8654"),_=a("3a2f"),g=Object(r["a"])(i,s,o,!1,null,null,null);e["default"]=g.exports;c()(g,{VBtn:u["a"],VCard:d["a"],VDataTable:m["a"],VDialog:h["a"],VForm:p["a"],VTextField:f["a"],VTooltip:_["a"]})},cbbf:function(t,e,a){},e161:function(t,e,a){"use strict";a("cbbf")}}]);
//# sourceMappingURL=chunk-008431cd.735f7403.js.map