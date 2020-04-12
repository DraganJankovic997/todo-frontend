import axios from '../axios';

const API = 'http://localhost:8000/api/todo';

export default {
    getAll(){
        return axios.get(API);
    },
    getOne(id){
        return axios.get(API + '/' + id);
    },
    post(data){
        return axios.post(API, data);
    },
    update(data, id){
        return axios.put(API + '/' + id, data);
    },
    delete(id){
        return axios.delete(API + '/' + id);
    }
};