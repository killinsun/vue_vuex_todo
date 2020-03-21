<template>
  <button
    :disabled='disabled'
    :class='classes'
    @click='handleClick'
  >
    +
  </button>
</template>

<script>
export default {
  name: 'addButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      const cls = 'todo-add-button'
      return cls
    }
  },
  methods: {
    handleClick (ev) {
      // 入力中のステータスを解除する。
      this.$store.commit('changeTodoItemInputStatus', {
        id: 1,
        action: false
      })

      // 新しいタスクを追加する
      this.$store.commit('addTodoItem', {
        name: ''
      })
    }
  }
}
</script>
