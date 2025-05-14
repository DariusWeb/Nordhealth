import { beforeAll } from 'vitest'
import { ref } from 'vue'

beforeAll(() => {
  ;(globalThis as any).useState = (key: string, init: () => any) => ref(init())
})

import { vi } from 'vitest'

const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
global.fetch = mockFetch

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))