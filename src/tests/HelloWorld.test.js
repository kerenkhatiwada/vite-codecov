import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders the message prop', () => {
    const msg = 'Hello Vue 3!'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.find('h1').text()).toBe(msg)
  })

  it('renders the initial count as 0', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' }
    })
    expect(wrapper.find('button').text()).toBe('count is 0')
  })

  it('increments count when button is clicked', async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' }
    })
    const button = wrapper.find('button')
    
    // Initial count should be 0
    expect(button.text()).toBe('count is 0')
    
    // Click the button
    await button.trigger('click')
    
    // Count should now be 1
    expect(button.text()).toBe('count is 1')
  })

  it('increments count multiple times', async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' }
    })
    const button = wrapper.find('button')
    
    // Click the button 3 times
    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')
    
    // Count should now be 3
    expect(button.text()).toBe('count is 3')
  })

  it('renders all the expected links', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' }
    })
    
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)
    expect(links[0].attributes('href')).toBe('https://vuejs.org/guide/quick-start.html#local')
    expect(links[1].attributes('href')).toBe('https://vuejs.org/guide/scaling-up/tooling.html#ide-support')
  })

  it('renders the HMR edit instruction', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' }
    })
    
    expect(wrapper.text()).toContain('Edit')
    expect(wrapper.text()).toContain('components/HelloWorld.vue')
    expect(wrapper.text()).toContain('to test HMR')
  })
})
