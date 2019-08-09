import todoService from '../services/todo.service.js';

export default {
    namespaced: true,
    state: {
        todos: [],
        forEdit: null
    },
    mutations: {
        TODOS(state, data){
            state.todos = data;
        },
        TODO(state, data) {
            state.forEdit = data;
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
        addTodo({dispatch}, data){
            todoService.post(data).then(()=> {
                dispatch('get');
            }, (err) => {
                console.log(err);
            })
        },
        editTodo({commit, dispatch}, payload){
            todoService.update(payload['data'], payload['id']).then(()=> {
                dispatch('get');
            }, (err) => {
                console.log(err);
            })
        },
        getOne({commit}, id){
            todoService.getOne(id).then((res) => {
                commit('TODO', res['data']);
            }, (err) => {
                console.log(err);
            })
        }
    },
    getters: {
        getTodos: (state) => state.todos,
        getForEdit: (state) => state.forEdit
    }

}