import { vi } from 'vitest'
import { ref } from 'vue'

// Mock the Nuxt 3 useState composable
vi.mock('#app', () => ({
  useState: (key: string, init: () => any) => {
    return ref(init())
  }
}))

import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue'
import LoginForm from '../../components/loginForm.vue'

const ProvetInputStub = defineComponent({
  props: ['modelValue', 'type', 'placeholder', 'autocomplete'],
  emits: ['update:modelValue'],
  template: `
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autocomplete="autocomplete || 'off'"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  `
});

describe('LoginForm', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      global: {
        stubs: {
          'provet-input': ProvetInputStub,
          'provet-checkbox': true,
          'provet-button': true,
          'provet-icon': true,
          'provet-avatar': true,
        }
      }
    })
  });

  describe('Form Validation', () => {
    it('should show error when email is empty', async () => {
      await wrapper.find('form').trigger('submit')
      expect(wrapper.find('.error').text()).toBe('Email is required')
    })

    it('should show error when email is invalid', async () => {
      await wrapper.find('input[type="email"]').setValue('invalid-email')
      await wrapper.find('form').trigger('submit')
      expect(wrapper.vm.emailError).toBe('Please enter a valid email address')
    })

    it('should show error when password is empty', async () => {
      await wrapper.find('input[type="email"]').setValue('valid@email.com')
      await wrapper.find('form').trigger('submit')
      expect(wrapper.vm.passwordError).toBe('Password is required')
    })

    it('should accept valid form input', async () => {
      await wrapper.find('input[type="email"]').setValue('valid@email.com')
      await wrapper.find('input[type="password"]').setValue('password123')
      await wrapper.find('form').trigger('submit')
      expect(wrapper.vm.emailError).toBe('')
      expect(wrapper.vm.passwordError).toBe('')
    })
  })

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', async () => {
      expect(wrapper.vm.passwordVisible).toBe(false)
      await wrapper.find('.show-password').trigger('click')
      expect(wrapper.vm.passwordVisible).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('should handle successful form submission', async () => {
      const mockResponse = { 
        ok: true, 
        json: () => Promise.resolve({ id: 1 }) 
      };
      
      vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

      await wrapper.find('input[type="email"]').setValue('test@example.com')
      await wrapper.find('input[type="password"]').setValue('password123')
      await wrapper.find('form').trigger('submit')

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        expect.any(Object)
      )
    })

    it('should handle failed form submission', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Login failed. Please try again.' })
      } as Response;
      vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);
      
      await wrapper.find('input[type="email"]').setValue('test@example.com')
      await wrapper.find('input[type="password"]').setValue('password123')
      await wrapper.find('form').trigger('submit')

      expect(wrapper.vm.emailError).toBe('Login failed. Please try again.')
    })
  })
})
