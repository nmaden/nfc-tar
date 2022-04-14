import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import 'vue-toast-notification/dist/theme-default.css'
import VueToast from 'vue-toast-notification'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.prototype.$API_VERSION = process.env.VUE_APP_API_VERSION;
Vue.prototype.$API_VERSION_2 = process.env.VUE_APP_API_VERSION_2;
Vue.prototype.$API_URL = 'http://api.kazaerospace.crocos.kz/api/';
Vue.prototype.$API_MAIN = process.env.VUE_APP_API;
Vue.use(VueToast);

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
