<template>
  <input
    type='checkbox'
    :checked='checked'
    :class='classes'
    @click='handleClick'
  />
</template>

<script>
export default {
  name: 'checkButton',
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    checked: {
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
      this.$store.commit('toggleTaskStatus', {
        id: this.id
      })
    }
  }
}
</script>
