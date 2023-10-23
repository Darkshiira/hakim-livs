// This is the Popoverbasket component, where we import the useItemStore hook to get the basket state.
// It displays the items that are in the basket and the total price of the items.
// It also uses the updateBasket action to update the basket state.
// It also uses the clearBasket action to clear the basket.
// It also uses the Link component from next/link to link to the checkout page.

import { Popover } from "@headlessui/react";
import { useItemStore } from "../app/zustand/zustandStore";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyPopover() {
  const basket = useItemStore((state) => state.basket);
  const updateBasket = useItemStore((state) => state.updateBasket);
  const clearBasket = useItemStore((state) => state.clearBasket);
  const totalItems = basket.reduce((total, item) => total + item.amount, 0);
  const itemincrease = useItemStore((state) => state.itemincrease);
  const updateIncrease = useItemStore((state) => state.updateItemincrease);
  const itemreduce = useItemStore((state) => state.itemreduce);
  const updateItemreduce = useItemStore((state) => state.updateItemreduce);
  const [showall, setShowall] = useState(false);

  const increaseAmount = (title: string) => {
    const newBasket = basket.map((item) => {
      if (item.title === title) {
        if (item.amount >= item.stock) {
          toast.error("Not enough items in stock!");
          return item;
        }
        const newAmount = item.amount + 1;
        updateIncrease(item.title);
        return {
          ...item,
          amount: newAmount,
          price: (item.price / item.amount) * newAmount,
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
        const newAmount = item.amount - 1;
        updateItemreduce(item.title);
        return {
          ...item,
          amount: newAmount,
          price: (item.price / item.amount) * newAmount,
        };
      }
      return item;
    });
    const updatedBasket = newBasket.filter((item) => item.amount > 0);
    updateBasket(updatedBasket);
    if (updatedBasket.length === 0) {
      window.location.reload();
    }
  };

  const clearingBasket = () => {
    clearBasket();
    window.location.reload();
  };

  const showAll = () => {
    setShowall(!showall);
  };

  return (
    <>
      <Popover className="relative z-50 ">
        <Popover.Button className="relative">
          <div className="flex flex-col items-center hover:text-blue-500">
            <AiOutlineShoppingCart className="text-3xl" />
            <p>Varukorg</p>
          </div>
        </Popover.Button>
        <div
          className="flex justify-center items-center right-0 top-0 absolute w-5 h-5 bg-purple-400 text-white text-xs rounded-full"
          style={{ transform: "translate(-20%, -40%)" }}
        >
          {totalItems}
        </div>
        <Popover.Panel className="absolute right-0  z-10 bg-white w-80 rounded-md text-center p-2 border border-black overflow-auto max-h-96">
          <div className="grid grid-cols-1 mb-2">
            <div className="grid grid-cols-3 font-bold">
              <p className="text-left">Produkt</p>
              <p className="text-center">Antal</p>
              <p className="text-right">Pris</p>
            </div>
            {basket.map((item) => (
              <div key={item.title} className="grid grid-cols-3">
                <p className="text-left">
                  {item.title.length > 14 ? (
                    <span onClick={showAll}>
                      {showall
                        ? item.title
                        : ((item.title.slice(0, 7) + "...") as string)}
                    </span>
                  ) : (
                    item.title
                  )}{" "}
                </p>
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
                <p className="text-right">
                  {item.price.toString().includes(".")
                    ? item.price.toFixed(2).toString().slice(0, -6) +
                      " " +
                      item.price.toFixed(2).toString().slice(-6)
                    : item.price.toFixed(2).toString().slice(0, -6) +
                      " " +
                      item.price.toFixed(2).toString().slice(-6)}
                  :-{" "}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-evenly">
            <Popover.Button
              onClick={() => {
                clearingBasket();
              }}
              className="bg-red-600 hover:text-white w-24 rounded-md"
            >
              Töm
            </Popover.Button>
            <Link
              href="/checkout"
              className="bg-green-400 hover:text-white p-1 px-4 rounded-md"
            >
              Till kassan
            </Link>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}
