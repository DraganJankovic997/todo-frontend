import userService from '../services/user.service';

export default {
    namespaced: true,
    state : {
        token: null,
        user: null,
        message: '',
        showPopup: false
    },

    mutations : {
        LOGIN(state, t){
            state.token = t;
            localStorage.setItem('token', t);
        },
        DELETE(state) {
            state.token = '';
            state.user = null;
            localStorage.removeItem('token');
        },
        USER(state, u) {
            state.user = u;
        },
        DISPLAYERROR(state, message){
            state.message = message;
            state.showPopup = true;
        },
        HIDEERROR(state){
            state.showPopup = false;
            state.message = '';
        }
    },

    actions : {
        login({commit, dispatch}, data){
            return userService.login(data)
                .then( (res) => {
                    let token = res['data']['access_token'];
                    commit('LOGIN', token);
                    return res;
                }).catch((err) => {
                    commit('DELETE');
                    throw err;
                });
            
        },

        register({ dispatch }, data) {
            return userService.register(data).then( res => {
                    dispatch('login', data);
                    return res;
                }, (err) => {
                    dispatch('displayError', err.message);
                    throw err;
                });
        },

        checkLocalStorage(){
            return !!localStorage.getItem('token');
        },

        checkToken({dispatch}) {
            dispatch('me').then(() => {
                return true;
            }, (err) => {
                return false;
            });
        },

        me({commit, dispatch}) {
            return userService.me()
            .then(res => {
                commit('USER', res['data']);
            }).catch((err) => {
                commit('DELETE');
            });
        },
        logout({commit}) {
            commit('DELETE');
        },
        displayError({commit}, message){
            commit('DISPLAYERROR', message);
        },
        hideError({commit}){
            commit('HIDEERROR');
        }
    },

    getters : {
        getToken : (state) => state.token,
        getDisplay: (state) => state.showPopup,
        getMessage: (state) => state.message,
    }
}