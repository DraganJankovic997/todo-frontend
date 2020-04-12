<template>
    <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <app-todo-form @formSubmit="addNew" @close="createClose()"
            :propData="emptyForm" :propCanEditDone="false" @change="createChange" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data () {
        return {
            emptyForm: {
                title: '',
                description: '',
                priority: 'LOW'
            }
        }
    },
    methods: {

        ...mapActions('todo', ['addTodo']),
        ...mapActions('userStore', ['displayError']),

        addNew(){
            this.addTodo(this.emptyForm)
            .then(()=> {
                this.$emit('closeCreate');
            }).catch((err)=> {
                this.displayError(err.message);
            });
        },
        createClose(){
            this.$emit('closeCreate');
        },
        createChange(event){
            this.emptyForm = event;
        }
    }
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