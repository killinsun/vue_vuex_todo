import Vuex from 'vuex'
import chai, { expect, assert } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Atoms/Checker.vue'

chai.use(sinonChai)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Checker.vue', () => {
  describe('Properties', () => {
    describe('Type', () => {
      describe('Default type', () => {
        it('should be a button when its type was not selected', () => {
          const wrapper = shallowMount(Component, { propsData: { id: 1 } })
          expect(wrapper.is('input')).to.equal(true)
          expect(wrapper.classes()).to.include('todo-check-button')
        })
      })
    })

    describe('id', () => {
      describe('defined', () => {
        it('should have an id which is a number', () => {
          const wrapper = shallowMount(Component, {
            propsData: {
              id: 1,
              type: 'checkbox',
              checked: false
            }
          })
          expect(wrapper.vm.id).to.equal(1)
          expect(wrapper.vm.id).to.be.a('number')
        })
      })
    })

    describe('checked', () => {
      it('should have a boolean value', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            id: 1,
            type: 'checkbox',
            checked: false
          }
        })
        expect(wrapper.vm.checked).to.be.a('boolean')
      })
    })

    describe('Events', () => {
      describe('Click', () => {
        let store

        const mutations = {
          addTask: sinon.stub(),
          toggleTaskStatus: sinon.stub(),
          changeTaskInputStatus: sinon.stub()
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
          assert(mutations.toggleTaskStatus.called)
        })
      })
    })
  })
})
