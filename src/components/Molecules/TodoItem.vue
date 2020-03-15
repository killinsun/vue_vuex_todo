<template>
  <div class="todo-item">
    <CheckButton :id="$attrs.todoItem.id" :checked="$attrs.todoItem.done" v-if="!$attrs.todoItem.inputing" />
    <div class="todo-item-input-area">
      <form v-on:submit.prevent="updateTask" v-if="$attrs.todoItem.inputing">
        <input
          type="text"
          v-model="$attrs.todoItem.title"
          placeholder="Input a new todo title"
          class="classes"
        >
      </form>
      <span v-if="!$attrs.todoItem.inputing" @click="focusTask"> {{ id }} {{ $attrs.todoItem.title }}</span>
      <ShowInfoButton  v-if="!$attrs.todoItem.inputing" />
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/Atoms/CheckButton.vue'
import ShowInfoButton from '@/components/Atoms/ShowInfoButton.vue'

export default {
  name: 'TodoItem',
  data: function () {
    return {
      id: this.$attrs.todoItem.id
    }
  },
  components: {
    CheckButton,
    ShowInfoButton
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
        id: this.id,
        action: true
      })
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
  font-size: 2vw;
}
.todo-item > div > span{
  font-size: 2vw;
  margin-right: 1vw;
}

form > input {
  font-size: 2vw;
  width: 100%;
}
</style>
