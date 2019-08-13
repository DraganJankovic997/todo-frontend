<template>
    <div>
        <app-todo-form @formSubmit="addNew($event)" ></app-todo-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {

        ...mapActions('todo', ['addTodo']),
        ...mapActions('userStore', ['displayError']),

        addNew(ev){
            this.addTodo(ev)
            .then(()=> {
                this.$router.push('/todo');
            }).catch((err)=> {console.log('huehue');});
            
        }
    }
}
</script>

<style stored>
    
</style>