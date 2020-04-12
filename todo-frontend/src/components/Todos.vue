<template>
    <div id="todos">
        <h1>TODOS: </h1>
        <button @click="showCreate"> Create </button>
        <div id="halo" v-for="todo in getTodos" :key="todo.id">
            <div id="maliHalo"  >

                {{todo.title}} {{todo.priority}}
                <p> {{todo.description}} </p>
                <button @click="deleteTodo(todo.id)">Delete</button>
                <button @click="showEdit(todo.id)">Edit</button>
                <button :class="[ 'red', { 'green': todo.done }]" @click="done(todo)" >{{todo.done}}</button>
            </div>
        </div>

        <app-edit v-if="editDisplay" @closeEdit="showEdit(0)" :todo-id="propForEdit" />
        <app-create v-if="createDisplay" @closeCreate="showCreate" />


    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            createDisplay: false,
            editDisplay: false,
            propForEdit: 0,
        }
    },
    created() {
        this.get().then((res)=> {
        }, (err) => {
            this.displayError(err.message);
        });
    
    },
    methods: {
        ...mapActions('todo', ['get', 'deleteTodo', 'editTodo']),
        ...mapActions('user', ['displayError']),
        done(todo){
            this.editTodo({...todo, done: !todo.done})
            .then((data) => {
                console.log(data)
                // this.displayError('Task done !');
            });
        },
        showCreate(){
            this.createDisplay = !this.createDisplay;
        },
        showEdit(id){
            this.propForEdit = id;
            this.editDisplay = !this.editDisplay;
        }

    },
    
    computed: {
        ...mapGetters('todo', ['getTodos']),
    }
    
}
</script>

<style stored>
    #halo {
        border: 1px solid black;
        width: 500px;
        margin: auto;
        padding-top: 0px;
        padding-bottom: 0px;
        margin-bottom: 10px;
    }
    #malihalo {
        margin-top: 0px;
        margin-bottom: 0px;
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        padding-left: 0px;
    }
    .red {
        background-color: rgb(238, 171, 171);
    }
    .green {
        background-color: rgb(212, 228, 212);
    }
    
    
</style>