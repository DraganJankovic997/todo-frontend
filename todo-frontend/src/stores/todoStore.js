import todoService from '../services/todo.service.js';

export default {
    namespaced: true,
    state: {
        todos: [],
    },
    mutations: {
        TODOS(state, t){
            state.todos = t;
        }
    },
    actions: {
        get({commit}){
            todoService.getAll().then((res)=> {
                commit('TODOS', res['data']);
            }, (err) => {
                console.log(err.request);
            });
        }
    },
    getters: {
        getTodos: (state) => state.todos,
    }

}