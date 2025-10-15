import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewComponent from '../components/NewComponent.vue'

describe('NewComponent.vue', () => {
  it('renders the title prop', () => {
    const title = 'Test Counter'
    const wrapper = mount(NewComponent, {
      props: { title }
    })
    expect(wrapper.find('h2').text()).toBe(title)
  })

  it('initializes with default value of 0', () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test' }
    })
    expect(wrapper.text()).toContain('Count: 0')
    expect(wrapper.text()).toContain('Doubled: 0')
  })

  it('initializes with custom initial value', () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test', initialValue: 5 }
    })
    expect(wrapper.text()).toContain('Count: 5')
    expect(wrapper.text()).toContain('Doubled: 10')
  })

  it('increments counter when + button is clicked', async () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test' }
    })
    
    await wrapper.find('.btn-increment').trigger('click')
    expect(wrapper.text()).toContain('Count: 1')
    expect(wrapper.text()).toContain('Doubled: 2')
  })

  it('decrements counter when - button is clicked', async () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test', initialValue: 5 }
    })
    
    await wrapper.find('.btn-decrement').trigger('click')
    expect(wrapper.text()).toContain('Count: 4')
    expect(wrapper.text()).toContain('Doubled: 8')
  })

  it('resets counter when reset button is clicked', async () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test', initialValue: 3 }
    })
    
    // Increment a few times
    await wrapper.find('.btn-increment').trigger('click')
    await wrapper.find('.btn-increment').trigger('click')
    expect(wrapper.text()).toContain('Count: 5')
    
    // Reset
    await wrapper.find('.btn-reset').trigger('click')
    expect(wrapper.text()).toContain('Count: 3')
    expect(wrapper.text()).toContain('Doubled: 6')
  })

  it('computed property updates correctly', async () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test' }
    })
    
    // Test multiple increments
    for (let i = 1; i <= 3; i++) {
      await wrapper.find('.btn-increment').trigger('click')
      expect(wrapper.text()).toContain(`Count: ${i}`)
      expect(wrapper.text()).toContain(`Doubled: ${i * 2}`)
    }
  })
})
