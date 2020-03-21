import Vuex from 'vuex'
import chai, { expect } from 'chai'
// import { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Component from '@/components/Molecules/TodoItem.vue'
import InfoIcon from '@/components/Atoms/InfoIcon.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
chai.use(sinonChai)

describe('TodoItem.vue', () => {
  describe('Properties', () => {
    describe('todoItem', () => {
      it('should have a todoItem', () => {
        const todoItem = {
          description: '',
          done: false,
          id: 0,
          inputting: true,
          labels: null,
          priority: null,
          title: 'hoge title'
        }
        const wrapper = shallowMount(Component, {
          propsData: {
            todoItem: todoItem
          }
        })
        expect(wrapper.vm.$props.todoItem).to.be.a('object')
      })
    })
  })
  describe('Events', () => {
    let store
    const mutations = {
      addTodoItem: sinon.stub(),
      toggleTodoItemStatus: sinon.stub(),
      changeTodoItemInputStatus: sinon.stub(),
      toggleTodoItemInfo: sinon.stub()
    }

    beforeEach(() => {
      store = new Vuex.Store({
        state: {},
        mutations
      })
    })
    describe('Form and input todoItem title', () => {
      describe('Click todo title', () => {
        it('should be triggered mutation', () => {
          const todoItem = {
            description: '',
            done: false,
            id: 0,
            inputting: false,
            labels: null,
            priority: null,
            title: 'hoge title'
          }
          const wrapper = mount(Component, {
            propsData: {
              todoItem: todoItem
            },
            store,
            localVue
          })

          wrapper.find('span').trigger('click')
          expect(mutations.changeTodoItemInputStatus.called).to.be.equal(true)
          expect(wrapper.vm.$props.todoItem.inputting).to.be.equal(false)
        })
      })
      describe('type the enter key when inputting', () => {
        it('should be triggered mutation and', () => {
          const todoItem = {
            description: '',
            done: false,
            id: 0,
            inputting: true,
            labels: null,
            priority: null,
            title: 'hoge title'
          }
          const wrapper = mount(Component, {
            propsData: {
              todoItem: todoItem
            },
            store,
            localVue
          })

          wrapper.find('form').trigger('submit.prevent')
          expect(mutations.changeTodoItemInputStatus.called).to.be.equal(true)
          expect(wrapper.vm.$props.todoItem.inputting).to.be.equal(true)
        })
      })
    })
    describe('InfoIcon', () => {
      describe('showInformation', () => {
        it('should be triggered mutation', () => {
          const todoItem = {
            description: '',
            done: false,
            id: 0,
            inputting: false,
            labels: null,
            priority: null,
            title: 'hoge title'
          }

          const wrapper = mount(Component, {
            propsData: {
              todoItem: todoItem
            },
            store,
            localVue
          })

          wrapper.find(InfoIcon).trigger('click')
          expect(mutations.toggleTodoItemInfo.called).to.be.equal(true)
        })
      })
    })
  })
})
