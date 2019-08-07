<template>
    <div id="todos">

        <div v-for="todo in todos" v-bind:key="todo.id">
            <h1>{{todo.title}}</h1>
            <p>{{todo.description}} Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus itaque corrupti nesciunt repellendus autem, quas ut error provident perferendis esse atque nulla minima magni cumque nobis consequatur, at veritatis et, quis necessitatibus suscipit quaerat? Consequuntur qui illo commodi laudantium optio. </p>
            
            <p>{{todo.priority}}</p>
        </div>
        
        <button @click="logout()">Logout</button>
    </div>
</template>

<script>
export default {
    props: ['token'],
    data: function(){
        return {
            t: this.token,
            todos: []
        }
    },
    mounted(){
        this.$http.get('http://localhost:8000/api/todo?token='+this.t).then((res)=>{
            this.todos = res['body'];
        }, (err)=> {
            console.log(err);
        });
    },
    methods: {
        
        logout(){
            this.$emit('logout');
        }
    }
    
}
</script>

<style >
    
</style>