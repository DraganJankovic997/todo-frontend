<template>
    <div id="login">
        <h3>Login</h3>
        <p>Email: <input v-model="email" type="text" @></p>
        <p>Password: <input v-model="password" type="text"> </p>
        <button @click="login(email, password)">Login</button>
    </div>
</template>

<script>
export default {
    props: ['pemail', 'ppassword'],
    data: function () {
        return {
            email : this.pemail,
            password: this.ppassword
        }
    },
    methods :{
        login(email, password) {
            this.$http.post('http://localhost:8000/api/auth/login', {
                email: email,
                password: password
            })
            .then((res) => {
                var token = res['data']['access_token'];
                this.$emit('tokenArrived', token);
                this.$http.post('http://localhost:8000/api/auth/me?token='+token).then((res)=> {
                    let loggedUser = {
                        name: res['body']['name'],
                        email: res['body']['email'],
                        id: res['body']['id']
                    }
                }, (err)=>{
                    console.log(err);
                });
            }, (err)=> {
                console.log(err);
            });
        }
    }
}
</script>

<style >
    
</style>