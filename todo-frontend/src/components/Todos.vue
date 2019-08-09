<template>
    <div id="todos">
        <div id="halo" v-for="todo in getTodos" v-bind:key="todo.id">
            <div id="maliHalo" v-bind:class="[ 'red',  { 'green': todo.done }] " >

                {{todo.title}} {{todo.priority}}
                <p> {{todo.description}} </p>
                <button @click="deleteTodo(todo.id)">Delete</button>
                <button @click="redirectEdit(todo.id)">Edit</button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
export default {

    created() {
        if(localStorage.getItem('token') != ''){
            this.get().then((res)=> {
            }, (err) => {
                console.log(err);
            });
        }
    },
    methods: {
        ...mapActions('todo', ['get', 'deleteTodo']),

        redirectEdit(id){
            this.$router.push('todo/edit/' + id);
        },

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