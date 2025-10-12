import { create } from 'zustand'

// 1️⃣ Define the store's shape - store contains both state and actions;
interface CounterStoreType {
  count: number;
  getCount: () => number;
  increase: () => void;
  decrease: () => void;
}

// 2️⃣ create() is used to create the store;
// set function is used to set initial state and actions;
const useCounterStore = create<CounterStoreType>((set, get) => ({
  count: 0,
  getCount: () => get().count,
/*
When you call set((state) => ({ count: state.count + 1 })), Zustand:
  Reads the current state.
  Applies your update.
  Notifies all React components using the store, so they re-render automatically.
*/
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}))

export default useCounterStore
