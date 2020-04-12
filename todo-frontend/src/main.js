import Vue from 'vue';
import App from './components/App.vue';
import axios from './axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Todos from './components/Todos.vue';
import Create from './components/Create.vue';
import Edit from './components/Edit.vue';
import TodoForm from './components/TodoForm.vue';
import Popup from './components/Popup.vue';
import store from './store';
import constants from './constants';
import userService from './services/user.service'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.component('modal', Popup);
Vue.component('app-todo-form', TodoForm);
Vue.component('app-create', Create);
Vue.component('app-edit', Edit);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/todo', component: Todos, meta: { authRequired: true } },
  ]
});

router.beforeEach((to, from, next) => {
  // if(to.meta.authRequired)
    try {
      if(constants['forNonUsers'].includes(to.fullPath)){
        if(userService.isLoggedIn()) {
          next({ path : '/todo' });
        }
      } else {
        if(!userService.isLoggedIn()) {
          next({ path : '/login' });
        }
      }
      next();
    } catch (err) {
      console.log(err);
    }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

