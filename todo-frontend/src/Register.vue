<template>
    <div id="register">
        <h3>Register</h3>
        <p>Ime: <input v-model="name" type="text"></p>
        <p>Email: <input v-model="email" type="text"></p>
        <p>Password: <input v-model="password" type="text"></p>
        <button @click="register(name, email, password)">Register</button>
    </div>
</template>

<script>
export default {
    props: ['pname', 'pemail', 'ppassword'],
    data : function () {
        return {
            name: this.pname,
            email: this.pemail,
            password: this.ppassword
        }
    },
    methods: {
        register(name, email, password){
            this.$http.post('http://localhost:8000/api/register', {
                name: name,
                email: email,
                password: password
            }).then((res)=>{
                var token = res['data']['access_token'];
                this.$emit('tokenRegister', token);
                this.$http.post('http://localhost:8000/api/auth/me?token='+token).then((res)=> {
                    let loggedUser = {
                        name: res['body']['name'],
                        email: res['body']['email'],
                        id: res['body']['id']
                    }
                }, (err)=>{
                    console.log(err);
                });
            }, (err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style >
    
</style>