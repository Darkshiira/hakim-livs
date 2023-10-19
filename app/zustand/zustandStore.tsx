// Here we create a zustand store to store the items, the update state, the reload state, the category, the basket and the search state.
// We also create actions to update the items, update the update state, update the reload state, update the category, update the basket and update the search state.
// We also create a function to clear the basket.

import { create } from "zustand";

type State = {
  items: Map<string, string>;
  update: boolean;
  reload: boolean;
  category: string;
  basket: {
    title: string;
    amount: number;
    price: number;
    image: string;
    size: string;
    id: string;
    stock: number;
  }[];
  search: string;
};
type Action = {
  updateItems: (items: State["items"]) => void;
  updateUpdate: (update: State["update"]) => void;
  updateReload: (reload: State["reload"]) => void;
  updateCategory: (category: State["category"]) => void;
  updateBasket: (basket: State["basket"]) => void;
  updateSearch: (search: State["search"]) => void;
  clearBasket: () => void;
};

export const useItemStore = create<State & Action>((set) => ({
  items: new Map<string, string>(),
  updateItems: (items: Map<string, string>) => set(() => ({ items: items })),
  update: false,
  updateUpdate: (update: boolean) => set(() => ({ update: update })),
  reload: false,
  updateReload: (reload: boolean) => set(() => ({ reload: reload })),
  category: "",
  updateCategory: (category: string) => set(() => ({ category: category })),
  basket: [],
  updateBasket: (
    basket: {
      title: string;
      amount: number;
      price: number;
      image: string;
      size: string;
      id: string;
      stock: number;
    }[]
  ) => set((state) => ({ ...state, basket: basket })),
  search: "",
  updateSearch: (search: string) => set(() => ({ search: search })),
  clearBasket: () => set((state) => ({ ...state, basket: [] })),
}));
