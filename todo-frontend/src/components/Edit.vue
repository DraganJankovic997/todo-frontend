<template>
    <div id="editForm">
        <app-todo-form :propTitle="forEdit.title" :propDescription="forEdit.description" 
        :propPriority="forEdit.priority" @formSubmit="updateNew($event)"></app-todo-form>
        <p> Done: <input type="checkbox" v-model="getOne.done"></p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '../constants';

export default {
    data () {
        return {
            forEdit: null
        }
    },
    created() {
        this.forEdit = {...this.getOne(this.$route.params.id)};
    },
    methods: {

        ...mapActions('todo', [, 'editTodo']),
        ...mapActions('user', ['displayError']),

        updateNew(ev) {
            ev['done'] = this.forEdit.done;
            this.editTodo({'data': ev, 'id': this.$route.params.id})
            .then(()=> {
                this.$router.push('/todo');
            })
            .catch((err)=> {
                this.displayError(err.message);
            })
        }
    },
    computed: {
        ...mapGetters('todo', ['getOne']),
    },
    
}
</script>

<style stored>


</style>
