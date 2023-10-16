"use client";
import Image from "next/image";
import { Popover } from "@headlessui/react";
import { CSSProperties } from "react";
import { useItemStore } from "../app/zustand/zustandStore";
import { useState } from "react";
import toast from "react-hot-toast";

const BigProductCard = (props: any) => {
  const updateBasket = useItemStore((state) => state.updateBasket);
  const basket = useItemStore((state) => state.basket);
  const [amount, setAmount] = useState(1);

  const minusOne = () => {
    if (amount === 1) {
      return;
    } else {
      setAmount(amount - 1);
    }
  };

  const plusOne = () => {
    setAmount(amount + 1);
  };

  const resetAmount = () => {
    setAmount(1);
  };

  function buy(price: number) {
    const newItem = {
      title: props.title,
      amount,
      price: props.price * amount,
      image: props.image,
      size: props.size,
      id: props.id,
      stock: props.stock,
    };
    if (amount === 0) {
      console.log("You need to buy at least one item");
    }
    if (basket.some((item) => item.title === props.title)) {
      const index = basket.findIndex((item) => item.title === props.title);
      const newBasket = [...basket];
      newBasket[index].amount = newBasket[index].amount + newItem.amount;
      newBasket[index].price = newBasket[index].price + newItem.price;
      updateBasket(newBasket);
      setAmount(1);
      toast.success("Added to cart!");
      return;
    }
    updateBasket([...basket, newItem]);
    toast.success("Added to cart!");
    resetAmount();
  }

  const imageStyle: CSSProperties = {
    objectFit: "cover",
    overflow: "hidden",
    height: "500px",
    width: "800px",
  };

  return (
    <>
      <Popover>
        <Popover.Button className="underline hover:text-blue-600">
          Info
        </Popover.Button>

        <Popover.Panel className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-3xl bg-white border rounded-lg shadow-md p-2 z-50">
          <div>
            <div className="flex ">
              <Image
                src={props.image}
                alt="product"
                width={800}
                height={600}
                style={imageStyle}
              ></Image>
              <div className="flex flex-col justify-evenly bg-red-300 p-2 w-full">
                <h1 className="font-extrabold text-4xl text-center">
                  {props.title}
                </h1>
                <div className="flex bg-blue-400 justify-evenly">
                  <p>{props.manufacturer}</p>|<p>{props.size}</p>
                </div>
                <h2 className="text-center text-5xl font-extrabold">
                  {props.price * amount}:-
                </h2>
                <div className="flex justify-evenly">
                  <div className="flex justify-evenly text-xl bg-blue-400 border border-black w-32">
                    <button className="w-full" onClick={minusOne}>
                      -
                    </button>
                    <p id="bigCardPrice">{amount}</p>
                    <button className="w-full" onClick={plusOne}>
                      +
                    </button>
                  </div>
                  <Popover.Button
                    className="p-1 w-20 bg-green-500 rounded-md hover:text-white w-32"
                    onClick={() => buy(props.price * amount)}
                  >
                    KÖP
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="bg-yellow-300">
              <h2 className="font-bold">Produktinformation</h2>
              <p>{props.description}</p>
            </div>
            <div className="bg-blue-300">
              <h2 className="font-bold">Innehållsförteckning</h2>
              <p>{props.ingredients}</p>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
};

export default BigProductCard;
