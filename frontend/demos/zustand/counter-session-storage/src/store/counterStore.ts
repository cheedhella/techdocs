import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the shape of our store
interface Counter {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
}

// Create a persisted store
const useCounterStore = create<Counter>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      { name: 'counter-storage', getStorage: () => sessionStorage }
    }
  )
)

export default useCounterStore
