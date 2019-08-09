<template>
    <div>
        <p>Title: <input v-model="title" type="text"></p>
        <p>Description: <textarea v-model="description" rows="4" cols="50"></textarea></p>
        <p>Priority: 
            <select v-model= "priority">
                <option selected="selected" value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>
        </p>

        


        <button @click="submit()">Submit</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data () {
        return {
            title: '',
            description: '',
            priority: 'LOW'
        }
    },
    methods: {

        ...mapActions('todo', ['addTodo']),

        submit(){
            let data = {};
            data['title'] = this.title;
            data['description'] = this.description;
            data['priority'] = this.priority;
            this.addTodo(data).then(()=> {
                this.$router.push('/todo');
            }, (err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style stored>
    
</style>