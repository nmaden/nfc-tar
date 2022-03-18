// import axios from "axios";
// import Vue from "vue";

// export const api = axios.create({
//   baseURL: Vue.prototype.$API_URL,
// });
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//         "access_token_kcmr"
//       )}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
