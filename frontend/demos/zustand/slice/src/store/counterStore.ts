import { create } from 'zustand'

interface CounterStoreType {
  count1: number;
  count2: number;
  getCount1: () => number;
  increase1: () => void;
  decrease1: () => void;
  getCount2: () => number;
  increase2: () => void;
  decrease2: () => void;
}

const useCounterStore = create<CounterStoreType>((set, get) => ({
  count1: 0,
  count2: 0,
  getCount1: () => get().count1,
  increase1: () => set((state) => ({ count1: state.count1 + 1 })),
  decrease1: () => set((state) => ({ count1: state.count1 - 1 })),
  getCount2: () => get().count2,
  increase2: () => set((state) => ({ count2: state.count2 + 1 })),
  decrease2: () => set((state) => ({ count2: state.count2 - 1 })),
}))

export default useCounterStore
