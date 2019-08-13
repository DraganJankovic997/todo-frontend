<template>
    <div id="register">
        <h3>Register</h3>
        <p>Name: <input v-model="user.name" type="text"></p>
        <p>Email: <input v-model="user.email" type="text"></p>
        <p>Password: <input v-model="user.password" type="password"></p>
        <button @click="callRegister">Register</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data : function () {
        return {
            user : {
                name: 'novitest',
                email: 'novitest@gmail.com',
                password: 'password'
            }
        }
    },
    methods: {

        ...mapActions('user', ['register', 'login', 'displayError']),

        callRegister() {
            this.register(this.user).then((res)=>{
                this.$router.push('/todo');
            }).catch((err)=> {
                this.displayError(err.message);
            });
        },
        
        
    }
}
</script>

<style >
    
</style>