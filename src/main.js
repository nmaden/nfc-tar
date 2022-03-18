import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import VueI18n from 'vue-i18n'
// import VueCompositionAPI from "@vue/composition-api";
// import VTooltip from "v-tooltip";
// import VueRouter from "vue-router";
import messages from './i18n'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

Vue.use(require("vue-pusher"), {
  api_key: "d664bdb583f823af07f8",
  options: {
    cluster: "eu",
    encrypted: true,
  },
});

// Vue.use(VueCompositionAPI);
// Vue.use(VTooltip);
// Vue.use(VueRouter);

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: messages
})

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueToast);

Vue.prototype.$API_VERSION = process.env.VUE_APP_API_VERSION;
Vue.prototype.$API_VERSION_2 = process.env.VUE_APP_API_VERSION_2;
Vue.prototype.$API_URL = 'http://127.0.0.1:8003/api/';
Vue.prototype.$API_MAIN = process.env.VUE_APP_API;

// Vue.prototype.$API_VERSION = 'v1/';
// Vue.prototype.$API_VERSION_2 = 'v2/';
// Vue.prototype.$API_URL = 'http://api.edc.crocos.kz/api/';
// Vue.prototype.$API_MAIN = 'https://api.edc.crocos.kz/api';


axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 422) {

    // for (let key in error.response.data.errors) {
    //   this.messages[key] = error.response.data.errors[key].pop();

    // }



    var elements = document.getElementsByClassName("agreement__item--input");
    console.log(elements);


    for (var i = 0, len = elements.length; i < len; i++) {
        // elements[i].style ...

        console.log(elements[i].childNodes)
    }

    // LocalStorage.remove('access_token');
    // if(window.location.origin.includes('cabinet.eqonaq.kz')) {
    //   window.location.href = 'https://eqonaq.kz/login';
    //   return Promise.resolve(error.response);
    // }
    // else if(window.location.origin.includes('cabinet.beta.eqonaq.kz')) {
    //     window.location.href = 'https://beta.eqonaq.kz/login';
    //     return Promise.resolve(error.response);
    // }
    // else {
    //     router.replace('/local_sign');
    //     return Promise.resolve(error.response);
    // }
    // // router.replace('/login')
    // // window.location.href = "http://localhost:8081/local_sign";
  }
  return Promise.reject(error);
});

new Vue({
  store,
  vuetify,
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
