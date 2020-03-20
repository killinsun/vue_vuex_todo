<template>
  <div class='todo-info'>
    <div class='todo-info-wrapper'>
      <div class="todo-info-close">
        <span @click='closeInfo()'>X</span>
      </div>
      <div class='todo-info-title' v-if='!todoItem.inputting' @click='focusTask'>
        <span> {{ todoItem.title }} </span>
      </div>
      <div class='todo-info-description' v-if='!todoItem.inputting' @click='focusTask'>
        <p>
          {{ todoItem.description }}
        </p>
      </div>
      <form v-on:submit.prevent="updateTask" v-if="todoItem.inputting">
        <div class='todo-info-title'>
          <input
            type="text"
            v-model="todoItem.title"
            placeholder="Input a new todo title"
          >
        </div>
        <div class='todo-info-description'>
          <textarea
            name="description"
            rows="10"
            v-model="todoItem.description"
          >
          </textarea>
        </div>
      </form>
      <div class='todo-info-priority'>
        <span> Priority </span>
        <select name='priorities' v-model='innerSelected'>
          <option disabled value=''></option>
          <option v-for='priority in priorities' :key='priority'> {{ priority }}</option>
        </select>
      </div>
      <div class='todo-info-tag'>
        <span> Tags </span>
        <label><input type='checkbox' name='labels' value='test'>Test Label</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoInfo',
  computed: {
    todoItem () {
      return this.$store.state.tasks[this.$store.state.currentFocusId]
    },
    priorities () {
      return this.$store.state.priorities
    },
    innerSelected: {
      get () {
        const todoItem = this.$store.state.tasks[this.$store.state.currentFocusId]
        return this.priorities[todoItem.priorityId]
      },
      set (val) {
        const priorityId = this.priorities.indexOf(val)
        this.$store.commit('updateTaskPriority', {
          id: this.todoItem.id,
          priorityId: priorityId
        })
      }
    }
  },
  methods: {
    closeInfo () {
      this.updateTask() // 閉じると同時に入力中ステータスもfalseにする
      this.$store.commit('toggleTaskInfo', {
        id: this.todoItem.id
      })
    },
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
    }
  }

}
</script>

<style scoped>
.todo-info {
  background-color: #ffffff;
  border: 1px solid black;
  width: 60vw;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.todo-info-wrapper {
  padding: 1em 2em 2em 2em
}
.todo-info-close{
  margin-bottom: 2em;
  text-align: right;
}
</style>