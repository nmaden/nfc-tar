export default {
    state: {
        token: [],
        redirect: null,
    },
    mutations: {
        SIGN_IN: (state, token) => {
            state.token.push(token)
        },
        REDIRECT: (state, type) => {
            state.redirect = type
        },
        LOGOUT: (state) => {
            state.token = [];
            localStorage.clear();
            (to, from, next) => {next({router:'/sign'})}
        }
    },
    actions: {
        SIGN_IN_USER ({commit}, data_profile) {
            commit('SIGN_IN', data_profile.token)
            commit('REDIRECT', data_profile.type);

            if(data_profile.user==true) {
             
                this.dispatch('USER_DATA');
            }
            
            else {
                this.dispatch('USER_DATA_ADMIN');
            }
            
        },
        SIGN_OUT_USER({commit}) {
            commit('LOGOUT')
        },
        REDIRECT_FALSE({commit}) {
            commit('REDIRECT', false)
        }
        
    },
    getters: {
        GET_TOKEN(state) {
            return state.token
        },
        GET_REDIRECT(state) {
            return state.redirect
        },
    },
}
  