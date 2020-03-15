<template>
  <div>
    <TodoItems />
  </div>
</template>

<script>
import TodoItems from '@/components/Organisms/TodoItems.vue'
export default {
  name: 'TodoBoard',
  components: {
    TodoItems
  }
}
</script>
