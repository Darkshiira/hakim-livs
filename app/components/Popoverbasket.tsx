import { Popover } from "@headlessui/react";
import { useItemStore } from "../zustand/zustandStore";
import Link from "next/link";

type Basket = { title: string; amount: number; price: number }[];

export default function MyPopover() {
  const basket = useItemStore((state) => state.basket);
  return (
    <>
      <Popover className="relative z-50 ">
        <Popover.Button>Varukorg</Popover.Button>
        <Popover.Panel className="absolute right-0  z-10 bg-blue-200 w-60 text-center">
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-3 font-bold">
              <p className="text-left">Produkt</p>
              <p className="text-center">Antal</p>
              <p className="text-right">Pris</p>
            </div>
            {basket.map((item) => (
              <div key={item.title} className="grid grid-cols-3">
                <p className="text-left">{item.title}</p>
                <p className="text-center">{item.amount}</p>
                <p className="text-right">{item.price}</p>
              </div>
            ))}
          </div>
          <Link href="/checkout"> Till kassan</Link>
        </Popover.Panel>
      </Popover>
    </>
  );
}
