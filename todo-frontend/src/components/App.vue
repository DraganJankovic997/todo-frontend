<template>
  <div id="app">
    <div style="margin-bottom: 200px;">
      <ul>
        <div v-if="checkToken() == false" >
          <li>
            <router-link to="/Login"> Login </router-link>
          </li>
          <li>
            <router-link to="/register"> Register </router-link>
          </li>
        </div>
        <div v-if="checkToken()">
          <li>
            <button @click="callLogout()"> Logout </button>
          </li>
          <li>
            <router-link to="/todo"> Todos</router-link>
          </li>
          <li>
            <router-link to="/todo/create"> Create</router-link>
          </li>
        </div>
      </ul>
    </div>



    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',
  methods: {
    
    ...mapActions('user', ['logout']),
    ...mapActions('todo', ['clear']),

    callLogout(){
      localStorage.setItem('token', '');
      this.logout().then(()=> {
        this.clear().then(()=>{
          this.$router.push('/login');
        }, (err) => {
          console.log(err);
        });
      }, (err) => {
        console.log(err);
      });
    },
    checkToken(){
      if(localStorage.getItem('token') != '') {
        return true;
      } else {
        return false;
      }
    }
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
  margin: auto;
  margin-top: 10px;
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
  background-color: darkblue;
  padding: 10px;
}

</style>
