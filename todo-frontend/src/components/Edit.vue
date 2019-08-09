<template>
    <div id="editForm">
        <p>Title: <input v-model="getForEdit.title" type="text"></p>
        <p>Description: <input v-model="getForEdit.description" type="text"></p>
        <p>Priority: 
            <select v-model="getForEdit.priority">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>
        </p>

        <p>Done: <input v-model="getForEdit.done" type="checkbox"></p>


        <button @click="submit()">Submit</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data () {
        return {
        }
    },
    created () {
        this.getOne(this.$route.params.id);
    },
    methods: {

        ...mapActions('todo', ['getOne', 'editTodo']),

        submit(){
            var data = {};
            data['title'] = this.getForEdit.title;
            data['description'] = this.getForEdit.description;
            data['priority'] = this.getForEdit.priority;
            data['done'] = this.getForEdit.done;
            this.editTodo( {'id': this.$route.params.id, 'data': data}).then(()=> {
                this.$router.push('/todo');
            }, (err) => {
                Promise.reject(err);
            })
        }
    },
    computed: {
        ...mapGetters('todo', ['getForEdit']),
        
    }
}
</script>

<style stored>


</style>
