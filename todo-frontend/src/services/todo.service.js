import axios from 'axios';
axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token');
  
      if (token != '') {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
  
      return config;
    }, 
  
    (error) => {
      return Promise.reject(error);
    }
  );
const API = 'http://localhost:8000/api/todo';

export default {
    getAll(){
        return axios.get(API);
    },
    getOne(id){
        return axios.get(API + '/' + id);
    },
    post(data){
        return axios.get(API, data);
    },
    update(data, id){
        return axios.get(API + '/' + id, data);
    },
    delete(id){
        return axios.get(API + '/' + id);
    }
};