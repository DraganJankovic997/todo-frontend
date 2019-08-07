<template>
  <div id="app">
    <div v-if="token == ''" align="center">
      <app-register :email="user.email" :password="user.password" :name="user.name" @tokenRegister="token=$event"></app-register>
      <app-login :pemail="user.email" :ppassword="user.password" @tokenArrived="token=$event"></app-login>
    </div>
    
    <div v-if="token != ''">
      <app-todos :token="token" @logout="logout()"></app-todos>

    </div>


  </div>
</template>

<script>


export default {
  name: 'app',
  data () {
    return {
      user : {
        id: "",
        email: "test@test.com",
        password: "password",
        name: ""
      },
      token: ''
    }
  },
  methods: {
    logout(){
      this.token = '';
      this.user.id = '';
      this.user.email = '';
      this.user.password = '';
      this.user.name = '';
    }
  },
  components: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
