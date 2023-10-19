//Dropdown used in CategoryAside.tsx
//In the future it can be used to display subcategories
"use client";
import { Menu } from "@headlessui/react";
import { useItemStore } from "../app/zustand/zustandStore";

function Dropdown({ props = {} }: { props?: any }) {
  const category = useItemStore((state) => state.category);
  const updateCategory = useItemStore((state) => state.updateCategory);
  const updateSearch = useItemStore((state) => state.updateSearch);

  const sendCategory = () => {
    updateCategory(props);
    updateSearch("");
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
