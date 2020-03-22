<template>
  <div class="todo-info">
    <div class="todo-info-wrapper">
      <div class="todo-info-close">
        <span @click="closeInfo()">X</span>
      </div>
      <div class="todo-info-title" v-if="!todoItem.inputting" @click="focusTodoItem">
        <span>{{ todoItem.title }}</span>
      </div>
      <div class="todo-info-description" v-if="!todoItem.inputting" @click="focusTodoItem">
        <p>{{ todoItem.description }}</p>
      </div>
      <form v-on:submit.prevent="updateTodoItem" v-if="todoItem.inputting">
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
      <div class="todo-info-delete-item">
        <button
          class='danger-element'
          type='button'
          @click='deleteTodoItem'
        >
        Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoInfo',
  computed: {
    todoItem () {
      return this.$store.state.todoItems[this.$store.state.currentFocusId]
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
        this.$store.commit('updateTodoItemPriority', {
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
        this.$store.commit('updateTodoItemTags', {
          id: this.todoItem.id,
          checkedTags: checkedTags
        })
      }
    }
  },
  methods: {
    closeInfo () {
      this.updateTodoItem() // 閉じると同時に入力中ステータスもfalseにする
      // タグのチェック状態もコミットする
      this.$store.commit('toggleTodoItemInfo', {
        id: this.todoItem.id
      })
    },
    updateTodoItem () {
      // 入力中ステータスをfalseにする
      this.$store.commit('changeTodoItemInputStatus', {
        id: this.id,
        action: false
      })
    },
    focusTodoItem () {
      // 入力中ステータスをtrueにする
      this.$store.commit('changeTodoItemInputStatus', {
        id: this.todoItem.id,
        action: true
      })
    },
    deleteTodoItem () {
      this.closeInfo() // 削除と同時に入力中ステータスもfalseにする
      // タスクに削除フラグをつける
      this.$store.commit('deleteTodoItem', {
        id: this.todoItem.id
      })

      // TODO: 確認ポップアップを表示させる
      // TODO: 完了ポップアップを表示させる
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
  width: 70%;
}
.todo-info-description {
  min-height: 15rem;
  font-size: 1.5rem;
}
.todo-info-description > p {
  background-color: #eeeeee;
}
.todo-info-description > textarea {
  min-height: 15rem;
  font-size: 1.5rem;
  width: 70%;
}
</style>
