<template>
    <div id="login">
        <h3>Login</h3>
        <p>Email: <input v-model="email" type="text" @></p>
        <p>Password: <input v-model="password" type="password"> </p>
        <button @click="callLogin(email, password)">Login</button>
    </div>
</template>

<script>

import { mapActions } from 'vuex';
import userService from '../services/user.service.js';

export default {
    data: function () {
        return {
            email : 'test@test.com',
            password: 'password'
        }
    },
    methods : {
        ...mapActions('user', ['login', 'checkToken']),

        callLogin(email, password){
            let data = {};
            data['email'] = email;
            data['password'] = password;
            this.login(data).then(()=>{
                console.log('redirect iz thena');
                this.$router.push('/todo');
            }, (err)=> {
                return Promise.reject(err);
            });
        },
    }
}
</script>

<style >
    
</style>