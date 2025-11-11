import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  let consoleSpy

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('renders the component with a message prop', () => {
    const testMessage = 'Hello Vue 3'
    const wrapper = mount(HelloWorld, {
      props: {
        msg: testMessage,
      },
    })
    expect(wrapper.find('h1').text()).toBe(testMessage)
  })

  it('renders without props', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.exists()).toBe(true)
  })

  it('increments count when button is clicked', async () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Test',
      },
    })
    const button = wrapper.find('button')
    expect(button.text()).toContain('count is 0')

    await button.trigger('click')
    expect(button.text()).toContain('count is 1')
  })

  it('logs console messages on component load', () => {
    mount(HelloWorld, {
      props: {
        msg: 'Test',
      },
    })
    expect(consoleSpy).toHaveBeenCalledWith('test')
    expect(consoleSpy).toHaveBeenCalledWith('test again')
    expect(consoleSpy).toHaveBeenCalledWith('test again again')
  })
})