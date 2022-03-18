import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import modules from './modules/index'
// import createMutationsSharer from "vuex-shared-mutations"
Vue.use(Vuex)

const ls = new SecureLS({ isCompression: false });

export default new Vuex.Store({
  modules,
  plugins: [
    //   createMutationsSharer({ predicate: ["LOGOUT"] }),
      createPersistedState({
        storage: {
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: key => ls.remove(key)
        }
      })
  ],
})
