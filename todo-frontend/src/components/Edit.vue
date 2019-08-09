<template>
    <div id="editForm">
        <p>Title: <input type="text"></p>
        <p>Description: <input type="text"></p>
        <p>Priority: 
            <select>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>
        </p>

        <p>Done: <input type="checkbox"></p>


        <button @click="submit()">Submit</button>
    </div>
</template>

<script>
export default {
    methods: {
        submit(){
            this.$router.push('/todo');
        }
    }
}
</script>

<style stored>


</style>
