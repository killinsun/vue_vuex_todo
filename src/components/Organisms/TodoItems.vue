<template>
  <div>
    <div class="todo-items" v-for="todoItem in todoItems" :key="todoItem.id">
      <TodoItem :todoItem="todoItem" />
    </div>
    <AddButton />
  </div>
</template>

<script>
import TodoItem from '@/components/Molecules/TodoItem.vue'
import AddButton from '@/components/Atoms/AddButton.vue'

export default {
  name: 'TodoItems',
  data: function () {
    return {
      newTodoName: ''
    }
  },
  components: {
    TodoItem,
    AddButton
  },
  computed: {
    todoItems () {
      return this.$store.getters.filteredAvailableTodoItems
    }
  }
}
</script>

<style scoped>
.todo-items {
  width: 80vw;
  margin: auto;
}
</style>
