import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Atoms/AddButton.vue'

describe('AddButton.vue', () => {
  describe('Properties', () => {
    describe('Type', () => {
      describe('Default type', () => {
        it('should be a button when its type was not selected', () => {
          const wrapper = shallowMount(Component)
          expect(wrapper.is('button')).to.equal(true)
        })
      })
      describe('Button', () => {
        it('should be a button', () => {
          const wrapper = shallowMount(Component, {
            propsData: { type: 'button' }
          })
          expect(wrapper.is('button')).to.equal(true)
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
  })
})
