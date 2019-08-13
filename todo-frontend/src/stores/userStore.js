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
            state.token = true;
        },
        DELETE(state) {
            state.token = '';
            state.user = null;
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
        initialize({state, commit, dispatch}) {
// 1. proveri jel ulogovan
// setuje header ako jeste i /me
// ako nije    
            if(userService.isLoggedIn()) {
                const token = userService.getToken();
                userService.attachAuthorizationHeader(token);
                commit('LOGIN', token)
            }
        },

        login({commit, dispatch}, data){
            return userService.login(data)
                .then( (res) => {
                    commit('LOGIN', res);
                    userService.attachAuthorizationHeader(res.data.access_token)
                    return res;
                }).catch((err) => {
                    commit('DELETE');
                    throw err;
                });
        },

        register({ dispatch }, data) {
            return userService.register(data).then( (res) => {
                    console.log("register then :" + res);
                    return res;
                }, (err) => {
                    dispatch('displayError', err.message);
                    throw err;
                });
        },

        checkToken({dispatch}) {
            dispatch('me').then((res) => {
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
                userService.deleteToken();
            });
        },
        logout({commit, dispatch}) {
            commit('DELETE');
            userService.deleteToken();
            dispatch('todo/clear', '' , { root: true });
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
        checkLocalStorage: (state) => !!state.token,
    }
}