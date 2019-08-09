import Vue from 'vue';
import Vuex from 'vuex';
import user from './stores/userStore.js';
import todo from './stores/todoStore.js';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        todo
    }
}); 