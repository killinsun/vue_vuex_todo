import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'hoge',
        done: false,
        description: '',
        priority: null,
        labels: null,
        inputing: false

      }
    ],
    currentFocusId: null,
    nextTaskId: 2
  },
  mutations: {
    // タスクの追加
    addTask (state, { title }) {
      state.tasks.push({
        id: state.nextTaskId,
        title,
        done: false,
        description: '',
        priority: null,
        labels: null,
        inputing: true
      })

      state.nextTaskId++
    },

    // タスクの完了状態を変更する
    toggleTaskStatus (state, { id }) {
      // task.idに一致するidを抽出する。
      // task.id と入力されたidは１対１なので、返される配列は一つだけの想定
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.done = !task.done
      })
    },

    // タスク名の入力ステータスを変更する
    changeTaskInputStatus (state, { id, action }) {
      state.tasks.forEach(task => {
        task.inputing = false
      })
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.inputing = action
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
