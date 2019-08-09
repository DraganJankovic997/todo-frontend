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
        },
        CLEARTODOS(state){
            state.todos = [];
            state.forEdit = null;
        }
    },
    actions: {
        get({commit}){
            todoService.getAll().then((res)=> {
                commit('TODOS', res['data']);
            }, (err) => {
                throw err;
            });
        },
        deleteTodo({dispatch}, id){
            todoService.delete(id).then(() => {
                dispatch('get');
            }, (err) => {
                throw err;
            });
        },
        addTodo({dispatch}, data){
            todoService.post(data).then(()=> {
                dispatch('get');
            }, (err) => {
                throw err;            })
        },
        editTodo({ dispatch}, payload){
            todoService.update(payload['data'], payload['id']).then(()=> {
                dispatch('get');
            }, (err) => {
                throw err;
            })
        },
        getOne({commit}, id){
            return new Promise((resolve, reject) => {
                todoService.getOne(id).then((res) => {
                    commit('TODO', res['data']);
                    resolve(res['data']);
                }).catch((err) => {
                    reject(err);
                });
            });
            
        },
        clear({commit}){
            commit('CLEARTODOS');
        }
    },
    getters: {
        getTodos: (state) => state.todos,
    }
}