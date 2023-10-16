import { Popover } from '@headlessui/react';
import { useItemStore } from '../app/zustand/zustandStore';
import Link from 'next/link';

export default function MyPopover() {
  const basket = useItemStore((state) => state.basket);
  const updateBasket = useItemStore((state) => state.updateBasket);
  const clearBasket = useItemStore((state) => state.clearBasket);

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
        <Popover.Panel className="absolute right-0  z-10 bg-white w-80 rounded-md text-center p-2 border border-black">
          <div className="grid grid-cols-1 mb-2">
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
          <div className="flex justify-evenly">
            <Popover.Button onClick={clearBasket} className="bg-red-600 hover:text-white w-24 rounded-md">
              Töm
            </Popover.Button>
            <Link href="/checkout" className="bg-green-400 hover:text-white p-1 px-4 rounded-md">
              Till kassan
            </Link>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}
