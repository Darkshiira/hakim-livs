import { Popover } from "@headlessui/react";
import { useItemStore } from "../app/zustand/zustandStore";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Basket } from "@/components/BasketType";

export default function MyPopover() {
  const basket = useItemStore((state) => state.basket);
  const updateBasket = useItemStore((state) => state.updateBasket);

  const increaseAmount = (title: string) => {
    const newBasket = basket.map((item) => {
      if (item.title === title) {
        return {
          ...item,
          amount: item.amount + 1,
          price: (item.price / item.amount) * (item.amount + 1),
        };
      }
      return item;
    });
    updateBasket(newBasket);
  };

  const decreaseAmount = (title: string) => {
    const newBasket = basket.map((item) => {
      if (item.amount === 0) {
        return item;
      }
      if (item.title === title) {
        return {
          ...item,
          amount: item.amount - 1,
          price: (item.price / item.amount) * (item.amount - 1),
        };
      }
      return item;
    });
    const updatedBasket = newBasket.filter((item) => item.amount > 0);
    updateBasket(updatedBasket);
  };

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
                <div className="grid grid-cols-3">
                  <button
                    onClick={(e) => {
                      decreaseAmount(item.title);
                    }}
                  >
                    -
                  </button>
                  <p className="text-center">{item.amount}</p>
                  <button
                    onClick={(e) => {
                      increaseAmount(item.title);
                    }}
                  >
                    +
                  </button>
                </div>
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
