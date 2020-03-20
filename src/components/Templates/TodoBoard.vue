<template>
  <div class='todo-board'>
    <TodoItems />
    <TodoInfo v-if='innerVisible' />
  </div>
</template>

<script>
import TodoItems from '@/components/Organisms/TodoItems.vue'
import TodoInfo from '@/components/Organisms/TodoInfo.vue'

export default {
  name: 'TodoBoard',
  data: function () {
    return {
      visible: true
    }
  },
  computed: {
    innerVisible () {
      return this.$store.state.infoVisible
    }
  },
  components: {
    TodoItems,
    TodoInfo
  }
}
</script>

<style scoped>

.todo-board {
  position: relative;
}

</style>
