import { create } from "zustand";

// Zustand store to keep track of the items in the category dropdown
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
