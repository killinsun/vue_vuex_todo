<template>
  <button
    type='button'
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
      const cls = this.type === 'text' ? ('-' + this.type) : ''
      return [`todo-button${cls}`]
    }
  },
  methods: {
    handleClick (ev) {
      // 入力中のステータスを解除する。
      this.$store.commit('changeTaskInputStatus', {
        id: 1,
        action: false
      })

      // 新しいタスクを追加する
      this.$store.commit('addTask', {
        name: ''
      })
    }
  }
}
</script>
