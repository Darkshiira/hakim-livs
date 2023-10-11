"use client";
import { Menu } from "@headlessui/react";
import { useItemStore } from "../zustand/zustandStore";

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
    <section className="flex flex-col">
      <Menu>
        <Menu.Button className="text-left font-bold" onClick={sendCategory}>
          {props}
        </Menu.Button>
        <Menu.Items className="flex flex-col">
          {/* <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Choklad
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Chips
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Lakrits
              </a>
            )}
          </Menu.Item> */}
        </Menu.Items>
      </Menu>
      {/* --------------------------- */}
      {/* <Menu>
        <Menu.Button className="text-left font-bold">{props}</Menu.Button>
        <Menu.Items className="flex flex-col">
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href="/account-settings">
                Kaffe och Te
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href="/account-settings">
                Pasta, ris och havregryn
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href="/account-settings">
                Lakris
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu> */}
    </section>
  );
}

export default Dropdown;
