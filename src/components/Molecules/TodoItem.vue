<template>
  <div class="todo-item">
    <Checker :id="todoItem.id" :checked="todoItem.done" v-if="!todoItem.inputting" />
    <div class="todo-item-input-area">
      <form v-on:submit.prevent="updateTask" v-if="todoItem.inputting">
        <input
          type="text"
          ref="inputTodoTitle"
          v-model="todoItem.title"
          placeholder="Input a new todo title"
          class="classes"
        >
      </form>
      <span v-if="!todoItem.inputting" @click="focusTask"> {{ todoItem.id }} {{ todoItem.title }}</span>
      <InfoIcon  v-if="!todoItem.inputting" @click='showInformation()' />
    </div>
  </div>
</template>

<script>
import Checker from '@/components/Atoms/Checker.vue'
import InfoIcon from '@/components/Atoms/InfoIcon.vue'

export default {
  name: 'TodoItem',
  components: {
    Checker,
    InfoIcon
  },
  props: {
    todoItem: {
      type: Object
    }
  },
  mounted () {
    if (this.todoItem.inputting) {
      this.$nextTick(() => this.$refs.inputTodoTitle.focus())
    }
  },
  methods: {
    updateTask () {
      // 入力中ステータスをfalseにする
      this.$store.commit('changeTaskInputStatus', {
        id: this.id,
        action: false
      })
    },

    focusTask () {
      // 入力中ステータスをtrueにする
      this.$store.commit('changeTaskInputStatus', {
        id: this.todoItem.id,
        action: true
      })
      this.$nextTick(() => this.$refs.inputTodoTitle.focus())
    },

    showInformation () {
      this.$store.commit('toggleTaskInfo', { id: this.todoItem.id })
    }
  }
}
</script>

<style scoped>
.todo-item {
  width: 100%;
}
.todo-item > div {
  display: inline-block;
  width: 60vw;
  margin-bottom: 1vh;
  margin-left: 1vw;
  text-align: left;
}
.todo-item > button {
  font-size: 2rem;
}
.todo-item > div > span{
  font-size: 2rem;
  margin-right: 1rem;
}

form > input {
  font-size: 2rem;
  width: 100%;
}
</style>
