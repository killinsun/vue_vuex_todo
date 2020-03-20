<template>
  <span
    :class='classes'
    @click='handleClick'
  >
    <i class="fas fa-info-circle" />
  </span>
</template>

<script>
export default {
  name: 'InfoIcon',
  computed: {
    classes () {
      const cls = 'todo-show-info-txt-button'
      return cls
    }
  },
  methods: {
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>
