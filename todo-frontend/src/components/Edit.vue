<template>
    <div id="editForm">
        <p>Title: <input v-model="forEdit.title" type="text"></p>
        <p>Description: <input v-model="forEdit.description" type="text"></p>
        <p>Priority: 
            <select v-model="forEdit.priority">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>
        </p>

        <p>Done: <input v-model="forEdit.done" type="checkbox"></p>


        <button @click="submit()">Submit</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data () {
        return {
            forEdit: {
                'title' : '',
                'description': '',
                'priority': '',
                'done': false
            },
        }
    },
    created () {
        this.getOne(this.$route.params.id)
        .then((data) => {
            this.forEdit = data;
        }).catch((err) => {
            console.log(err);
        });
    },
    methods: {

        ...mapActions('todo', ['getOne', 'editTodo']),

        submit(){
            var data = {};
            data['title'] = this.forEdit.title;
            data['description'] = this.forEdit.description;
            data['priority'] = this.forEdit.priority;
            data['done'] = this.forEdit.done;
            this.editTodo({'id': this.$route.params.id, 'data': data})
            .then(()=>{
                this.$router.push('/todo');
            }).catch((err) => {
                console.log(err);
            });
        }
    },
}
</script>

<style stored>


</style>
