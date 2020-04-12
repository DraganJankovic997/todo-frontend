<template>
    <div>
        <p>Title: <input v-model="formData.title" type="text" @change="changed"></p>
        <p>Description: <textarea v-model="formData.description" rows="4" cols="50" @change="changed"></textarea></p>
        <p>Priority: 
            <select v-model="formData.priority" @change="changed">
                <option v-for="(p, index) in constants['priority']" :key="index" 
                v-bind:value="p">{{ p }}</option>
            </select>
        </p>
        <p v-if="canEditDone"> Done: <input type="checkbox" v-model="formData.done" @change="changed"></p>
        <button @click="submit">Submit</button>
        <button @click="close" >Close</button>
    </div>
</template>

<script>
import constants from '../constants';
export default {
    props : ['propData', 'propCanEditDone'],
    data () {
        return {
            formData : this.propData,
            canEditDone: this.propCanEditDone,
            constants
        }
    },
    methods: {
        submit() {
            this.$emit('formSubmit', this.formData);
        },
        close() {
            this.$emit('close');
        },
        changed(){
            this.$emit('change', this.formData);
        }
    }
}

</script>

<style stored>
    
</style>