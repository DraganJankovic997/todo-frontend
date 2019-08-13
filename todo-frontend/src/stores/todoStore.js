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
        EDIT_TODO(state, newData){
            let index = state.todos.findIndex((x) => x.id === newData['id']);
            console.log(index)
            state.todos.splice(index, 1, newData)
            // state.todos[i] = newData;
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
        addTodo({commit, dispatch, state}, data){
            return todoService.post(data)
                .then((newTodo)=> {
                    commit('ADD_TODO', newTodo['data']);
                    console.log(state.todos);
                    return newTodo['data'];
                })
                .catch((err) => {
                    dispatch('user/displayError', err.message, { root:true });
                });
        },
        editTodo({commit, dispatch}, forEdit) {
            return todoService.update(forEdit, forEdit['id']).then((newData)=> {
                commit('EDIT_TODO', newData['data']);
                console.log(newData.data.done)
            })
            .catch((err) => {
                console.log(err)
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