import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoItems: [
      {
        id: 0,
        title: 'hoge',
        done: false,
        description: 'No description',
        priorityId: 0,
        tagIds: [],
        inputting: false,
        deleted: false
      }
    ],
    priorities: [
      'Low',
      'Middle',
      'High'
    ],
    tags: [
      {
        tagId: 0,
        tagName: 'Buying',
        checked: false
      },

      {
        tagId: 1,
        tagName: 'Reading',
        checked: false
      }
    ],
    currentFocusId: 0,
    nextTodoId: 1,
    infoVisible: false
  },
  getters: {
    filteredAvailableTodoItems (state) {
      return state.todoItems.filter(todoItem => todoItem.deleted === false)
    }
  },
  mutations: {
    // タスクの追加
    addTodoItem (state, { title }) {
      state.todoItems.push({
        id: state.nextTodoId,
        title,
        done: false,
        description: '',
        priorityId: null,
        tagIds: [],
        inputting: true,
        deleted: false
      })

      state.nextTodoId++
    },

    // タスクの完了状態を変更する
    toggleTodoItemStatus (state, { id }) {
      // todoItem.idに一致するidを抽出する。
      // todoItem.id と入力されたidは１対１なので、返される配列は一つだけの想定
      const filtered = state.todoItems.filter(todoItem => {
        return todoItem.id === id
      })

      filtered.forEach(todoItem => {
        todoItem.done = !todoItem.done
      })
    },

    // タスク名の入力ステータスを変更する
    changeTodoItemInputStatus (state, { id, action }) {
      state.todoItems.forEach(todoItem => {
        todoItem.inputting = false
      })
      const filtered = state.todoItems.filter(todoItem => {
        return todoItem.id === id
      })

      filtered.forEach(todoItem => {
        todoItem.inputting = action
      })
    },

    // タスク情報の表示非表示を変更する
    toggleTodoItemInfo (state, { id }) {
      state.currentFocusId = id
      state.infoVisible = !state.infoVisible
    },

    // タスクの優先度を更新する
    updateTodoItemPriority (state, { id, priorityId }) {
      const filtered = state.todoItems.filter(todoItem => {
        return todoItem.id === id
      })

      filtered.forEach(todoItem => {
        todoItem.priorityId = priorityId
      })
    },

    // チェックしたタグをタスクに紐付ける
    updateTodoItemTags (state, { id, checkedTags }) {
      const filtered = state.todoItems.filter(todoItem => {
        return todoItem.id === id
      })

      filtered.forEach(todoItem => {
        todoItem.tagIds = checkedTags
      })
    },

    // タスクに削除フラグを付ける
    deleteTodoItem (state, { id }) {
      const filtered = state.todoItems.filter(todoItem => {
        return todoItem.id === id
      })

      filtered.forEach(todoItem => {
        todoItem.deleted = true
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
