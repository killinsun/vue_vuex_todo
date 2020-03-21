<template>
  <div class="todo-info">
    <div class="todo-info-wrapper">
      <div class="todo-info-close">
        <span @click="closeInfo()">X</span>
      </div>
      <div class="todo-info-title" v-if="!todoItem.inputting" @click="focusTask">
        <span>{{ todoItem.title }}</span>
      </div>
      <div class="todo-info-description" v-if="!todoItem.inputting" @click="focusTask">
        <p>{{ todoItem.description }}</p>
      </div>
      <form v-on:submit.prevent="updateTask" v-if="todoItem.inputting">
        <div class="todo-info-title">
          <input type="text" v-model="todoItem.title" placeholder="Input a new todo title" />
        </div>
        <div class="todo-info-description">
          <textarea name="description" rows="10" v-model="todoItem.description"></textarea>
        </div>
      </form>
      <div class="todo-info-priority">
        <span>Priority</span>
        <select name="priorities" v-model="innerSelected">
          <option disabled value></option>
          <option v-for="priority in priorities" :key="priority">{{ priority }}</option>
        </select>
      </div>
      <div class="todo-info-tag">
        <p>Tags</p>
        <label v-for="tag in tags" :key="tag.tagId">
          <input type="checkbox" name="tags" :value="tag.tagId" v-model="innerCheckedTags" />
          {{ tag.tagName }}
        </label>
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
    tags () {
      return this.$store.state.tags
    },
    innerSelected: {
      get () {
        return this.priorities[this.todoItem.priorityId]
      },
      set (val) {
        const priorityId = this.priorities.indexOf(val)
        this.$store.commit('updateTaskPriority', {
          id: this.todoItem.id,
          priorityId: priorityId
        })
      }
    },
    innerCheckedTags: {
      get () {
        return this.todoItem.tagIds
      },
      set (checkedTags) {
        this.$store.commit('updateTaskTags', {
          id: this.todoItem.id,
          checkedTags: checkedTags
        })
      }
    }
  },
  methods: {
    closeInfo () {
      this.updateTask() // 閉じると同時に入力中ステータスもfalseにする
      // タグのチェック状態もコミットする
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
  min-height: 50vh;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.todo-info-wrapper {
  padding: 1em 2em 2em 2em;
  font-size: 2rem;
}
.todo-info-close {
  margin-bottom: 2em;
  text-align: right;
}
.todo-info-title > input {
  font-size: 2rem;
}
.todo-info-description {
  min-height: 15rem;
  font-size: 1.5rem;
}
.todo-info-description > textarea {
  min-height: 15rem;
  font-size: 1.5rem;
}
</style>
