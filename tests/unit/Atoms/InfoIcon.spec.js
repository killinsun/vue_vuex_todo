import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Atoms/InfoIcon.vue'

describe('ShowInfoButton.vue', () => {
  describe('Properties', () => {
    describe('Events', () => {
      describe('Click', () => {
        it('should be emmited', () => {
          const wrapper = shallowMount(Component)
          wrapper.trigger('click')
          expect(wrapper.emitted().click.length).to.equal(1)
        })
      })
    })
  })
})
