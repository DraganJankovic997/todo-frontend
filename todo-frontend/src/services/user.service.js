import axios from '../axios';

const API = 'http://localhost:8000/api';
const ROUTES = {
    'LOGIN' : '/auth/login',
    'REGISTER' : '/register',
    'ME' : '/auth/me',
    'REFRESH' : '/auth/refresh'
};

export default {

    login(data){
        return axios.post(API + ROUTES.LOGIN, data)
        .then((res) => {
            this.addToken(res['data']['access_token']);
            return res;
        });
    },
    register(data){
        return axios.post(API + ROUTES.REGISTER, data);
    },
    me(){
        return axios.post(API + ROUTES.ME);
    },
    refresh(){
        return axios.post(API + ROUTES.REFRESH, data);
    },
    addToken(token){
        localStorage.setItem('token', token);
    },
    deleteToken(){
        localStorage.removeItem('token');
    },
    getToken(){
        return localStorage.getItem('token');
    },    

    attachAuthorizationHeader(token) {
        this.attachHeader('Authorization', "Bearer " + token);
    },

    isLoggedIn() {
        return !!this.getToken();
    },

    attachHeader(header, value) {
        axios.defaults.headers.common[header] = value;
    }
};