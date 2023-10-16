"use client";

import Image from "next/image";
import { FC, CSSProperties } from "react";
import { useState } from "react";
import { useItemStore } from "../app/zustand/zustandStore";
import toast, { Toaster } from "react-hot-toast";
import BigProductCard from "./BigProductCard";

// Mall för produkterna som laddas in på frontpage (kan självklart användas på andra platser där produkter ska in också)
// TODO: lägg till funktion på knapparna

interface ProductCardProps {
  id: string;
  storeId: string;
  title: string;
  description: string;
  ingredients: string;
  price: number;
  image: string;
  manufacturer: string;
  category: string;
  size: string;
  color: string;
  isarchived: boolean;
  isfeatured: boolean;
  stock: number;
}

const imageStyle: CSSProperties = {
  objectFit: "cover",
  border: "1px solid #fff",
};

const Productcard: FC<ProductCardProps> = ({
  id,
  storeId,
  title,
  description,
  ingredients,
  price,
  image,
  manufacturer,
  category,
  size,
  color,
  isfeatured,
  isarchived,
  stock,
}) => {
  const basket = useItemStore((state) => state.basket);
  const updateBasket = useItemStore((state) => state.updateBasket);
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

  const buyStuffz = (title: string) => {
    if (amount === 0) {
      console.log("You need to buy at least one item");
    }
    if (basket.some((item) => item.title === title)) {
      const index = basket.findIndex((item) => item.title === title);
      const newBasket = [...basket];
      newBasket[index].amount = newBasket[index].amount + amount;
      newBasket[index].price = newBasket[index].price + price * amount;
      updateBasket(newBasket);
      setAmount(1);
      toast.success("Added to cart!");
      return;
    }
    updateBasket([
      ...basket,
      {
        title: title,
        amount: amount,
        price: price * amount,
        image: image,
        size: size,
        id: id,
        stock: stock,
      },
    ]);
    setAmount(1);
    toast.success("Added to cart!");
  };
  return (
    <div className={"flex flex-col content-around"}>
      <div className="w-52 h-auto bg-slate-100 p-2 relative">
        {isfeatured === true ? (
          <div className={"absolute z-20"}>
            <p className={"bg-red-800 text-white rotate-6 "}>Featured</p>
          </div>
        ) : null}
        <div className="bg-slate-900 p-24 relative">
          <Image src={image} alt="food" layout="fill" style={imageStyle} />
        </div>
        <h1 className="product-title text-center font-bold text-lg">{title}</h1>
        <div className="flex justify-center space-x-1 h-8">
          <p className="product-manufacturer">{manufacturer}</p>
          <p>|</p>
          <p className="product-size">{size}</p>
        </div>
        <h2 className="text-center">
          {(price * amount).toString().slice(0, -6) +
            " " +
            (price * amount).toString().slice(-6, -3) +
            " " +
            (price * amount).toString().slice(-3)}
          :-
        </h2>
        <BigProductCard
          image={image}
          title={title}
          manufacturer={manufacturer}
          size={size}
          price={price}
          description={description}
          ingredients={ingredients}
        />

        <div className="amountAndPurchase flex bg-slate-200 justify-between p-2 items-center ">
          <div className="flex w-20 justify-between">
            <button
              className="decreaseAmount w-full bg-slate-400"
              onClick={minusOne}
            >
              -
            </button>
            <p className="amount">{amount}</p>
            <button
              className="increaseAmount w-full bg-slate-400"
              onClick={plusOne}
            >
              +
            </button>
          </div>
          <button
            className="purchaseButton p-1 w-20 bg-slate-400 rounded-md"
            onClick={() => buyStuffz(title)}
          >
            KÖP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
