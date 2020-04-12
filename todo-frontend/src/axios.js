import axios from 'axios';
import userService from './services/user.service';
import store from './store'

// axios.defaults.headers.common['Authorization'] = "Bearer " + userService.getToken();
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

axios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if(err.response.status === 401) {
        store.dispatch('user/logout')
        // userService.deleteToken();
        alert('401: Unauthorized');
    }    
});


export default axios;