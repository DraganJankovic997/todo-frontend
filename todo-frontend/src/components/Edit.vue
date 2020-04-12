<template>
    <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <app-todo-form :propData="forEdit" :propCanEditDone="true" @formSubmit="updateNew($event)"
            @close="closeEdit" @change="changeEdit" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '../constants';

export default {
    props: {
        todoId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            forEdit: null
        }
    },
    created() {
        this.forEdit = {...this.getOne(this.todoId)};
    },
    methods: {

        ...mapActions('todo', [, 'editTodo']),
        ...mapActions('user', ['displayError']),

        updateNew() {
            this.editTodo(this.forEdit)
            .then(()=> {
                this.$emit('closeEdit');
            })
            .catch((err)=> {
                this.displayError(err.message);
            })
        },
        closeEdit(){
            this.$emit('closeEdit');
        },
        changeEdit(event){
            this.forEdit = event;
        }

    },
    computed: {
        ...mapGetters('todo', ['getOne']),
    },
    
}
</script>

<style stored>
    .modal-backdrop {
       position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        margin: 30px;
    }

</style>
