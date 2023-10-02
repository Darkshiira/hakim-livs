"use client"

import Dropdown from './Dropdown';
import { useItemStore } from '../zustand/zustandStore';
import axios from 'axios';
import { useEffect} from 'react'



// Aside på första sidan där matkategorierna finns

const CategoryAside = () => {
    const items = useItemStore((state) => state.items)
    const updateItems = useItemStore((state) => state.updateItems)
    const update = useItemStore((state) => state.update)
    const updateUpdate = useItemStore((state) => state.updateUpdate)
    
    const itemsitr = items.entries()

    useEffect(() => {
        axios.get('http://localhost:3001/api/categories', {})
            .then(function (response) {
                response.data.forEach((item: { id: string; name: string; }) => {
                    items.set(item.id, item.name)
                    updateUpdate(!update)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    } , [])

    
  return (
    <>
      <div className="p-4 bg-purple-200 w-52">
        <h2 className="text-center font-bold text-lg">Kategorier</h2>
        {update ? Array.from(itemsitr).map(([key, value]) => (
  <Dropdown props={value} key={key} />
)): null}
      </div>
    </>
  );
};

export default CategoryAside;
