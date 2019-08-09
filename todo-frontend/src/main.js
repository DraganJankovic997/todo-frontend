import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Todos from './components/Todos.vue';
import Create from './components/Create.vue';
import Edit from './components/Edit.vue'
import store from './store.js';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/todo', component: Todos },
  { path: '/todo/create', component: Create },
  { path: '/todo/edit/:id', component: Edit }
]

const router = new VueRouter({
  routes: routes
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
