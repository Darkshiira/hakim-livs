import {create} from 'zustand'

// Zustand store to keep track of the items in the category dropdown
type State = {
    items:Map<string, string>;
    update: boolean;
  }
  type Action = {
    updateItems: (items: State['items']) => void
    updateUpdate: (update: State['update']) => void
  }
  
  export const useItemStore = create<State & Action>((set) => ({
    items: new Map<string, string>(),
    updateItems: (items: Map<string, string>) => set(() => ({ items: items })),
    update: false,
    updateUpdate: (update: boolean) => set(() => ({ update: update }))
  }))
