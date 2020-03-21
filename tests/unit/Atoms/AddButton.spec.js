import Vuex from 'vuex'
import chai, { expect, assert } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Atoms/AddButton.vue'

chai.use(sinonChai)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AddButton.vue', () => {
  describe('Properties', () => {
    describe('Type', () => {
      describe('Default type', () => {
        it('should be a button when its type was not selected', () => {
          const wrapper = shallowMount(Component)
          expect(wrapper.is('button')).to.equal(true)
          expect(wrapper.classes()).to.include('todo-add-button')
        })
      })
    })

    describe('Disabled', () => {
      describe('Default status', () => {
        it('should be undefined when component is default', () => {
          const wrapper = shallowMount(Component)
          expect(wrapper.attributes().disabled).to.be.an('undefined')
        })
      })
      describe('true', () => {
        it('should be true when component is disabled', () => {
          const wrapper = shallowMount(Component, {
            propsData: { disabled: true }
          })
          expect(wrapper.attributes().disabled).to.equal('disabled')
        })
      })
    })

    describe('Events', () => {
      describe('Click', () => {
        let store

        const mutations = {
          addTodoItem: sinon.stub(),
          toggleTodoItemStatus: sinon.stub(),
          changeTodoItemInputStatus: sinon.stub()
        }

        beforeEach(() => {
          store = new Vuex.Store({
            state: {},
            mutations
          })
        })

        it('should be triggered mutations', () => {
          const wrapper = shallowMount(Component, { store, localVue })
          wrapper.trigger('click')
          assert(mutations.addTodoItem.called)
          assert(mutations.changeTodoItemInputStatus.called)
        })
      })
    })
  })
})
