<template>
  <div id="app">
    <div style="margin-bottom: 200px;">
      <ul>

        <div v-if="checkLocalStorage">
          <li>
            <button @click="callLogout"> Logout </button>
          </li>
          <li>
            <router-link to="/todo"> Todos</router-link>
          </li>
        </div>
        
        <div v-else>
          <li>
            <router-link to="/Login"> Login </router-link>
          </li>
          <li>
            <router-link to="/register"> Register </router-link>
          </li>
        </div>


      </ul>
    </div>

    <modal v-if="getDisplay" @close="closeModal"> {{getMessage}} </modal>

    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import modal from './Popup.vue';

export default {
  name: 'app',
  
  methods: {
    
    ...mapActions('user', ['logout', 'hideError', 'displayError', 'checkToken']),
    ...mapActions('todo', ['clear']),

    async callLogout(){
      try {
        await this.logout().then(()=> {
          this.clear().then(()=>{
            this.$router.push('/login');
          });
        });
      } catch (err) {
        this.displayError(err);
      }
    },
    closeModal(){
      this.hideError();
    },
  },
  async created() {
    await this.$store.dispatch('user/initialize')
  },  
  computed: {
    ...mapGetters('user', ['getDisplay', 'getMessage', 'checkLocalStorage']),
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
button {
  height: 40px;
  width: 100px;
}

</style>
