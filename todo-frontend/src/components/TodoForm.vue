<template>
    <div>
        <p>Title: <input v-model="formData.title" type="text"></p>
        <p>Description: <textarea v-model="formData.description" rows="4" cols="50"></textarea></p>
        <p>Priority: 
            <select v-model="formData.priority">
                <option v-for="(p, index) in constants['priority']" v-bind:key="index" 
                v-bind:value="p">{{ p }}</option>
            </select>
        </p>

        <button @click="submit">Submit</button>
    </div>
</template>

<script>
import constants from '../constants';
export default {
    props : ['propTitle', 'propDescription', 'propPriority'],
    data () {
        return {
            formData : {
                title: this.propTitle,
                description: this.propDescription,
                priority: this.propPriority,
            },
            constants
        }
    },
    methods: {
        submit(){
            this.$emit('formSubmit', this.formData);
        }
    }
}

</script>

<style stored>
    
</style>