import { shallowMount } from '@vue/test-utils'
import CreateUser from '@/components/CreateUser.vue'

describe('CreateUser.vue', () => {

  it('Has a button', () => {
    const wrapper = shallowMount(CreateUser,{})
    expect(wrapper.contains('button')).toBe(true);
  })
  
  
})
