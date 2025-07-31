import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('renders the initial count as 0', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toBe('0')
  })

  it('increments count when button is clicked', async () => {
    const wrapper = mount(App)
    const button = wrapper.find('button')
    
    // Initial count should be 0
    expect(wrapper.find('h1').text()).toBe('0')
    
    // Click the button
    await button.trigger('click')
    
    // Count should now be 1
    expect(wrapper.find('h1').text()).toBe('1')
  })

  it('increments count multiple times', async () => {
    const wrapper = mount(App)
    const button = wrapper.find('button')
    
    // Click the button 3 times
    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')
    
    // Count should now be 3
    expect(wrapper.find('h1').text()).toBe('3')
  })

  it('displays the correct button text', () => {
    const wrapper = mount(App)
    const button = wrapper.find('button')
    expect(button.text()).toBe('Click me!')
  })
})