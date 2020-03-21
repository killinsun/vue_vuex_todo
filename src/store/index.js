import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 0,
        title: 'hoge',
        done: false,
        description: 'No description',
        priorityId: 0,
        tagIds: [],
        inputting: false
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
    nextTaskId: 1,
    infoVisible: false
  },
  mutations: {
    // タスクの追加
    addTask (state, { title }) {
      state.tasks.push({
        id: state.nextTaskId,
        title,
        done: false,
        description: '',
        priorityId: null,
        tagIds: [],
        inputting: true
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
        task.inputting = false
      })
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.inputting = action
      })
    },

    // タスク情報の表示非表示を変更する
    toggleTaskInfo (state, { id }) {
      state.currentFocusId = id
      state.infoVisible = !state.infoVisible
    },

    // タスクの優先度を更新する
    updateTaskPriority (state, { id, priorityId }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.priorityId = priorityId
      })
    },

    // チェックしたタグをタスクに紐付ける
    updateTaskTags (state, { id, checkedTags }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.tagIds = checkedTags
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
