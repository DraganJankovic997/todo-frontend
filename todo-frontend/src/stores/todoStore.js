import todoService from '../services/todo.service';

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
        },
        ADD_TODO(state, newTodo){
            state.todos.push(newTodo);
        },
        EDIT_TODO(state, payload){
            state.todos[state.todos.indexOf(payload['oldTodo'])] = payload['newTodo'];
        }
    },
    actions: {
        get({commit, dispatch}){
            return todoService.getAll().then((res)=> {
                commit('TODOS', res['data']);
            }, (err) => {
                dispatch('user/displayError', err.message, { root:true });
            });
        },
        deleteTodo({dispatch}, id){
            return todoService.delete(id).then(() => {
                dispatch('get');
            }, (err) => {
                dispatch('user/displayError', err.message, { root:true });
            });
        },
        addTodo({commit, dispatch}, data){
            return todoService.post(data)
                .then((newTodo)=> {
                    console.log(newTodo['data']);
                    commit('ADD_TODO', newTodo['data']);
                    return newTodo['data'];
                })
                .catch((err) => {
                    dispatch('user/displayError', err.message, { root:true });
                });
        },
        editTodo({commit, dispatch}, payload){
            return todoService.update(payload['data'], payload['id']).then((newData)=> {
                commit('EDIT_TODO', { 'oldTodo': payload['data'], 'newTodo':  newData['data']});
            }, (err) => {
                dispatch('user/displayError', err.message, { root:true });
            })
        },
        clear({commit}){
            commit('CLEARTODOS');
        }
    },
    getters: {
        getTodos: (state) => state.todos,
        getOne: (state) => (id) => {
            return state.todos.find((todo) => {
                  return todo.id == id;
            });
        },
    }
}