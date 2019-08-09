import userService from '../services/user.service.js';

export default {
    namespaced: true,
    state : {
        token: null,
        user: null
    },

    mutations : {
        LOGIN(state, t){
            state.token = t;
        },
        DELETE(state) {
            state.token = '';
            state.user = null;
        },
        USER(state, u) {
            state.user = u;
        }
    },

    actions : {
        login({commit, state}, data){
            userService.login(data).then( res => {
                let t = res['data']['access_token'];
                commit('LOGIN', t);
                userService.setToken(state.token);
                userService.me().then(res => {
                    commit('USER', res['data']);
                }, (err) => {
                    console.log(err);
                });
            
            }, err => {
                commit('DELETE');
                console.log(err);
            });
            
        },
        register({ dispatch }, data) {
            userService.register(data).then( res => {
                dispatch('login', data);
            }, (err) => {
                console.log(err);
            });
        },
        checkToken({commit}) {
            userService.me().then(res => {
                
            }, err => {
                commit('DELETE');
                console.log(err);
            })
        },
        logout({commit}) {
            commit('DELETE');
        }
    },

    getters : {
        getToken : (state) => state.token,
    }
}