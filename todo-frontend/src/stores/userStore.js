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
            userService.login(data).then( (res) => {
                let token = res['data']['access_token'];
                commit('LOGIN', token);
                localStorage.setItem('token', token);
                userService.me().then(res => {
                    commit('USER', res['data']);
                }, (err) => {
                    Promise.reject(err);
                });
                
                
            
            }, (err) => {
                commit('DELETE');
                Promise.reject(err);
            });
            
        },
        register({ dispatch }, data) {
            userService.register(data).then( res => {
                dispatch('login', data);
            }, (err) => {
                return Promise.reject(err);
            });
        },
        checkToken({commit}) {
            userService.me().then(res => {
                
            }, err => {
                commit('DELETE');
                return Promise.reject(err);
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