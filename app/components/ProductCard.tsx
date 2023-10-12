"use client";

import Image from "next/image";
import { FC, CSSProperties } from "react";
import { useState } from "react";
import { useItemStore } from "../zustand/zustandStore";

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
    updateBasket([...basket, { title: title, amount: amount, price: price }]);
  };
  return (
    <>
      <div className="w-52 h-auto bg-red-200 p-2 relative">
        {isfeatured === true ? (
          <div className={"absolute z-50"}>
            <p className={"bg-red-800 text-white rotate-6 "}>Featured</p>
          </div>
        ) : null}
        <div className="bg-yellow-900 p-24 relative">
          <Image
            src={image}
            alt="food"
            layout="fill"
            style={imageStyle}
          />
        </div>
        <h1 className="product-title text-center font-bold text-lg">{title}</h1>
        <div className="flex justify-center space-x-1">
          <p className="product-manufacturer">{manufacturer}</p>
          <p>|</p>
          <p className="product-size">{size}</p>
        </div>
        <h2 className="text-center">{price * amount}:-</h2>
        <div className="amountAndPurchase flex bg-green-100 justify-between p-2 items-center">
          <div className="flex w-20 justify-between">
            <button
              className="decreaseAmount w-full bg-blue-200"
              onClick={minusOne}
            >
              -
            </button>
            <p className="amount">{amount}</p>
            <button
              className="increaseAmount w-full bg-blue-200"
              onClick={plusOne}
            >
              +
            </button>
          </div>
          <button
            className="purchaseButton p-1 w-20 bg-blue-200 rounded-md"
            onClick={() => buyStuffz(title)}
          >
            KÖP
          </button>
        </div>
      </div>
    </>
  );
};

export default Productcard;
