import axios from 'axios';
axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token');
      if (token != '') {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    }, (err)=> {
        return err;
    });

//provera da li je code 401
axios.interceptors.response.use((response) => {
    return response;
}, (err) => {
    if(err.response.status == 401) localStorage.setItem('token', '');
    console.log('Token expired');
});



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
};