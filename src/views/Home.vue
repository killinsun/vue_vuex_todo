<template>
  <div class="home">
    <h1> Vue + Vuex TODO App study </h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <TodoBoard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoBoard from '@/components/Templates/TodoBoard.vue'

export default {
  name: 'Home',
  components: {
    TodoBoard
  }
}
</script>
