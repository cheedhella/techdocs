import { create } from 'zustand'

// 1️⃣ Define the store's shape - store contains both state and actions;
interface Counter {
  count: number
  increase: () => void
  decrease: () => void
}

// 2️⃣ Create the store with type inference
const useCounterStore = create<Counter>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}))

export default useCounterStore
