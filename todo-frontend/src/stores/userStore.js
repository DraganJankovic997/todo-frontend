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
            return new Promise((resolve, reject) => {
                userService.login(data)
                .then( (res) => {
                    let token = res['data']['access_token'];
                    commit('LOGIN', token);
                    localStorage.setItem('token', token);
                    userService.me()
                    .then(res => {
                        commit('USER', res['data']);
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                }).catch((err) => {
                    commit('DELETE');
                    reject(err);
                });
            });
            
        },
        register({ dispatch }, data) {
            return new Promise((resolve, reject) => {
                userService.register(data).then( res => {
                    resolve(dispatch('login', data));
                }, (err) => {
                    reject(err);
                });
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