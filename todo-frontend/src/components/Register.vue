<template>
    <div id="register">
        <h3>Register</h3>
        <p>Ime: <input v-model="name" type="text"></p>
        <p>Email: <input v-model="email" type="text"></p>
        <p>Password: <input v-model="password" type="text"></p>
        <button @click="callRegister(name, email, password)">Register</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data : function () {
        return {
            name: 'novitest',
            email: 'novitest@gmail.com',
            password: 'password'
        }
    },
    methods: {

        ...mapActions('user', ['register', 'login']),

        callRegister(name, email, password) {
            var data = {};
            data['name'] = name;
            data['email'] = email;
            data['password'] = password;

            this.register(data);
        },
        
        
    }
}
</script>

<style >
    
</style>