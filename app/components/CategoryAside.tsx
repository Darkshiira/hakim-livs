'use client'

import Dropdown from './Dropdown';
import axios from 'axios';
import { create } from 'zustand';

type State = {
  items:Map<string, string>;
}

type Action = {
  updateItems: (items: State['items']) => void
}

const useItemStore = create<State & Action>((set) => ({
  items: new Map<string, string>(),
  updateItems: (items: Map<string, string>) => set(() => ({ items: items }))
}))

// Aside på första sidan där matkategorierna finns

const CategoryAside = () => {
    const items = useItemStore((state) => state.items)
    const updateItems = useItemStore((state) => state.updateItems)
    const itemsitr = items.entries()


        axios.get('http://localhost:3001/api/categories', {})
            .then(function (response) {
                response.data.forEach((item: { id: string; name: string; }) => {
                    items.set(item.id, item.name)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    
  return (
    <>
      <aside className="p-4 bg-purple-200 w-52">
        <h2 className="text-center font-bold text-lg">Kategorier</h2>
        {Array.from(itemsitr).map(([key, value]) => (

<Dropdown props = {value} key={key} />
))}
      </aside>
    </>
  );
};

export default CategoryAside;
