<template>
  <span
    type='button'
    :disabled='disabled'
    :class='classes'
    @click='handleClick'
  >
    <i class="fas fa-info-circle" />
  </span>
</template>

<script>
export default {
  name: 'showInfoButton',
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
      console.log(ev)
      this.$emit('click', ev)
    }
  }
}
</script>
