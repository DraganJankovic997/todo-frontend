import axios from 'axios';


const API = 'http://localhost:8000/api';
const ROUTES = {
    'LOGIN' : '/auth/login',
    'REGISTER' : '/register',
    'ME' : '/auth/me',
    'REFRESH' : '/auth/refresh'
};

export default {

    login(data){
        return axios.post(API + ROUTES.LOGIN, data);
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

    setToken(token){
        localStorage.setItem('token', token);
        this.addHeader();
    },
    addHeader(){
        axios.interceptors.request.use(
            (config) => {
              let token = localStorage.getItem('token');
          
              if (token != null) {
                config.headers['Authorization'] = 'Bearer ' + token;
              }
          
              return config;
            }, 
          
            (error) => {
              return Promise.reject(error);
            }
          );
          
    }
};