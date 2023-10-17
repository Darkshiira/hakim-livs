'use client';
import { Menu } from '@headlessui/react';
import { useItemStore } from '../app/zustand/zustandStore';

// Dropdown menyn som visar de olika kategorierna i aside på första sidan
// TODO: Ändra så länkarna går till rätt produkter

function Dropdown({ props = {} }: { props?: any }) {
  //saves the category in zustand
  const category = useItemStore((state) => state.category);
  const updateCategory = useItemStore((state) => state.updateCategory);

  //onclick function that saves the category in zustand
  const sendCategory = () => {
    updateCategory(props);
  };

  return (
    <section className="flex flex-col hover:bg-blue-200 rounded p-2">
      <Menu>
        <Menu.Button className="text-left font-bold" onClick={sendCategory}>
          {props.toUpperCase()}
        </Menu.Button>
        <Menu.Items className="flex flex-col "></Menu.Items>
      </Menu>
    </section>
  );
}

export default Dropdown;
