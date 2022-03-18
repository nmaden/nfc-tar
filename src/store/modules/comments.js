import axios from 'axios'
import router from '../../router'

export default {
    state: {
        comments: ''
    },
    mutations: {
        COMMENTS: (state, comments) => {
            state.comments = comments
        }
    },
    actions: {
        FETCH_COMMENTS({commit},commentObj) {
            this.$axios({
                method: "get",
                url:
                    process.env.VUE_APP_API_URL + process.env.VUE_APP_API_VERSION+
                  "get/comments?doc_id=" +
                  commentObj.id +
                  "&type=" +
                  commentObj.type,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token_kcmr")}`,
                },
              })
            .then((response) => {
                commit('COMMENTS', response.data.data)      
            })
            .catch((error) => {
                console.warn(error);
            });
        }
    },
    getters: {
        GET_COMMENTS(state) {
            return state.user
        },
    },
}
  