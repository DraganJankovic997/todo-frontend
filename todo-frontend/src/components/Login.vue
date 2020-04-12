<template>
    <div id="login">
        <h3>Login</h3>
        <p>Email: <input v-model="user.email" type="text" @></p>
        <p>Password: <input v-model="user.password" type="password"> </p>
        <button @click="callLogin">Login</button>
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    data: function () {
        return {
            user : {
                email : 'test@test.com',
                password: 'password'
            }
        }
    },
    methods : {
        ...mapActions('user', ['login', 'checkToken', 'displayError']),

        callLogin(){
            this.login(this.user)
            .then((res)=>{
                this.$router.push('/todo');
            })
            .catch((err) => {
                this.displayError(err.message);
            });
        },
    }
}
</script>

<style >
    
</style>