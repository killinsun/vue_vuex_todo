import Vuex from 'vuex'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Organisms/TodoInfo.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
chai.use(sinonChai)

describe('TodoInfo.vue', () => {
  const state = {
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
    currentFocusId: 0
  }

  const mutations = {
    toggleTaskInfo: sinon.stub(),
    changeTaskInputStatus: sinon.stub(),
    updateTaskTags: sinon.stub(),
    updateTaskPriority: sinon.stub()
  }

  describe('Properties', () => {
    describe('close icon', () => {
      let store
      beforeEach(() => {
        store = new Vuex.Store({
          state: state,
          mutations: mutations
        })
      })
      describe('default', () => {
        it('should be exist close icon', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-close').contains('span')).to.equal(true)
        })

        describe('Click close icon', () => {
          it('should be triggered mutations', () => {
            const wrapper = shallowMount(Component, { store, localVue })
            wrapper.find('.todo-info-close > span ').trigger('click')
            expect(mutations.changeTaskInputStatus.called).to.equal(true)
            expect(mutations.toggleTaskInfo.called).to.equal(true)
          })
        })
      })
    })

    describe('todo-info-title span', () => {
      describe('default', () => {
        let store
        beforeEach(() => {
          store = new Vuex.Store({
            state: state,
            mutations: mutations
          })
        })
        it('should have todo title', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-title > span').text()).to.be.equal('hoge')
        })
      })

      describe('when inputting', () => {
        let store
        beforeEach(() => {
          state.tasks[0].inputting = true
          store = new Vuex.Store({
            state: state,
            mutations: mutations
          })
        })
        afterEach(() => {
          state.tasks[0].inputting = false
        })
        it('should be not exist', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-title > span').exists()).to.be.equal(false)
        })
      })
    })

    describe('todo-info-description p', () => {
      describe('default', () => {
        let store
        beforeEach(() => {
          store = new Vuex.Store({
            state: state,
            mutations: mutations
          })
        })
        it('should have todo description', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-description > p').text()).to.be.equal('No description')
        })
      })

      describe('when inputting', () => {
        let store
        beforeEach(() => {
          state.tasks[0].inputting = true
          store = new Vuex.Store({
            state: state,
            mutations: mutations
          })
        })
        afterEach(() => {
          state.tasks[0].inputting = false
        })
        it('should be not exist', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-description > p').exists()).to.be.equal(false)
        })
      })
    })

    describe('form', () => {
      let store
      beforeEach(() => {
        state.tasks[0].inputting = true
        store = new Vuex.Store({
          state: state,
          mutations: mutations
        })
      })
      afterEach(() => {
        state.tasks[0].inputting = false
      })

      it('should be triggered when type the enter key', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        wrapper.find('form').trigger('submit.prevent')
        expect(mutations.changeTaskInputStatus.called).to.be.equal(true)
      })

      describe('input todo title', () => {
        it('should be exist', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-title > input').exists()).to.be.equal(true)
        })
      })
      describe('input todo description', () => {
        it('should be exist', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          expect(wrapper.find('.todo-info-description > textarea').exists()).to.be.equal(true)
        })
      })
    })

    describe('todo-info-priority', () => {
      let store
      beforeEach(() => {
        const updateTaskPriorityMock = function () {
          state.tasks[0].priorityId = 2
        }
        mutations.updateTaskPriority = updateTaskPriorityMock
        store = new Vuex.Store({
          state: state,
          mutations: mutations
        })
      })

      it('should have priorities in selectbox', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        expect(wrapper.find('.todo-info-priority > select').text()).to.be.equal('LowMiddleHigh')
      })
      it('should be changed innnerSelected when select a value', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        const options = wrapper.find('select').findAll('option')
        options.at(2).setSelected()
        expect(wrapper.vm.innerSelected).to.be.equal('High')
      })
    })

    describe('todo-info-tag', () => {
      let store
      beforeEach(() => {
        store = new Vuex.Store({
          state: state,
          mutations: mutations
        })
      })

      it('shoud have all tags', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        const allLabelElements = wrapper.findAll('.todo-info-tag > label')
        expect(allLabelElements.at(0).text()).to.equal('Buying')
        expect(allLabelElements.at(1).text()).to.equal('Reading')
      })
    })

    describe('Computed', () => {
      let store
      beforeEach(() => {
        store = new Vuex.Store({
          state: state,
          mutations: mutations
        })
      })
      it('should have a todoItem', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        expect(wrapper.vm.todoItem).to.be.an('object')
      })
      it('should have priorities', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        expect(wrapper.vm.priorities).to.be.an('Array')
      })
      it('should have tags', () => {
        const wrapper = shallowMount(Component, { store, localVue })
        expect(wrapper.vm.tags).to.be.an('Array')
      })
    })
  })
})