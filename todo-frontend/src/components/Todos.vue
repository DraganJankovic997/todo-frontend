<template>
    <div id="todos">
        <div id="halo" v-for="todo in getTodos" v-bind:key="todo.id">
            <div v-bind:class="[ 'red',  { 'green': todo.done }] " >
                <h1> {{todo.title}} </h1>
                <p> {{todo.description}} </p>
                
                <p> {{todo.priority}} </p>
                <p> {{todo.done}} </p>
                

            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
export default {

    mounted() {
        if(localStorage.getItem('token') != ''){
            this.get().then((res)=> {
                console.log('done');
            }, (err) => {
                console.log(err);
            });
        }
    },
    methods: {
        ...mapActions('todo', ['get']),
        gottem () {
            this.get().then((res)=> {
                console.log('done');
            }, (err) => {
                console.log(err);
            });
        }
    },
    
    computed: {
        ...mapGetters('todo', ['getTodos']),

    }
    
}
</script>

<style >
    #halo {
        border: 1px solid black;
        width: 500px;
        margin: auto;
        padding: 10px;
        margin-bottom: 10px;
    }
    .red {
        background-color: red;
    }
    .green {
        background-color: green;
    }
    
</style>