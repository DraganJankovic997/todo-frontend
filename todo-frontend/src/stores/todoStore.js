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
        },
        deleteTodo({dispatch}, id){
            todoService.delete(id).then(() => {
                dispatch('get');
            }, (err) => {
                console.log(err);
            });
        },
        addTodo({}, data){

        },
        editTodo({}, data, id){

        }
    },
    getters: {
        getTodos: (state) => state.todos,
    }

}