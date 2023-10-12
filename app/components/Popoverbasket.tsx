import { Popover } from "@headlessui/react";
import { useItemStore } from "../zustand/zustandStore";
import Link from "next/link";

type Basket = { [key: string]: number };

export default function MyPopover() {
  const basket = useItemStore((state) => state.basket);
  function isBasket(obj: any): obj is Basket {
    return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
  }
  return (
    <>
      {isBasket(basket) ? (
        <Popover className="relative ">
          <Popover.Button>Varukorg</Popover.Button>
          <Popover.Panel className="absolute right-0  z-10 bg-blue-200 w-60 text-center">
            <div className="grid grid-cols-1">
              {Object.keys(basket).map((key: string) => (
                <div
                  key={key}
                  className="grid grid-cols-2 gap-6 m-3 bg-slate-200"
                >
                  <p>{key}</p>
                  <p>{basket[key]}</p>
                </div>
              ))}
            </div>
            <Link href="/checkout"> Till kassan</Link>
          </Popover.Panel>
        </Popover>
      ) : null}
    </>
  );
}
