'use client';
import { Menu } from '@headlessui/react';

function Dropdown() {
  return (
    <section className="flex flex-col">
      <Menu>
        <Menu.Button className="text-left font-bold">Snacks & Godis</Menu.Button>
        <Menu.Items className="flex flex-col">
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href="/account-settings">
                Choklad
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href="/account-settings">
                Chips
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
      </Menu>
      {/* --------------------------- */}
      <Menu>
        <Menu.Button className="text-left font-bold">Skafferi</Menu.Button>
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
      </Menu>
    </section>
  );
}

export default Dropdown;
