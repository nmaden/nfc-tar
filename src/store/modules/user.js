import axios from 'axios'
import router from '../../router'

export default {
    state: {
        user_name: '',
        password_expired: null
    },
    mutations: {
        USER: (state, user) => {
            state.user = user
        },
        PASSWORD_EXPIRED: (state, password_expired) => {
            state.password_expired = password_expired
        }
    },
    actions: {
        USER_DATA({commit}) {
            axios({ 
                method: 'GET',
                url:  process.env.VUE_APP_API_URL + process.env.VUE_APP_API_VERSION + 'user',
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('access_token_kcmr')
                },
            })
            .then((response) => {
            //    commit('PASSWORD_EXPIRED', response.data.password_expired)
               commit('USER', response.data.data)
      
                if (this.getters.GET_REDIRECT == true) {
                    router.push('/')
                }
                
            })  
            .catch((error) => {
                console.log(error);
            });
        },
        USER_DATA_ADMIN({commit}) {
            axios({ 
                method: 'GET',
                url:  process.env.VUE_APP_API_URL + process.env.VUE_APP_API_VERSION + 'admin',
                headers: {
                    'Authorization': 'Bearer '+  localStorage.getItem('access_token_kcmr') 
                },
            })
            .then((response) => {
            //    commit('PASSWORD_EXPIRED', response.data.password_expired)
               commit('USER', response.data.data);
               if (this.getters.GET_REDIRECT == true) {
                 response.data.data.role.name!='MAIN'? router.push('/kcmr'):router.push('/admin/panel')
               }
            })  
            .catch((error) => {
                console.log(error);
            });
        },
    },
    getters: {
        GET_USER_DATA(state) {
            return state.user
        },
        GET_PASSWORD_EXPIRED_DATA(state) {
            return state.password_expired
        },
    },
}
  