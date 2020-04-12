import Vue from 'vue';
import Vuex from 'vuex';
import user from './stores/userStore';
import todo from './stores/todoStore';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        todo
    }
}); 