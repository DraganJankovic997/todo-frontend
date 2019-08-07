import Vue from 'vue';
import App from './App.vue';
import Login from './Login.vue';
import Register from './Register.vue';
import Todos from './Todos.vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';



Vue.use(VueRouter);
Vue.use(VueResource);
const routes = 



Vue.component('app-register', Register);
Vue.component('app-login', Login);
Vue.component('app-todos', Todos);


new Vue({
  el: '#app',
  render: h => h(App)
})
