'use client';

import Image from 'next/image';
import { FC } from 'react';

// Mall för produkterna som laddas in på frontpage (kan självklart användas på andra platser där produkter ska in också)
// TODO: lägg till funktion på knapparna, få bilden att ladda in

// TODO: Ska även ta in en image sen.
interface ProductCardProps {
  title: string;
  manufacturer: string;
  size: string;
  price: number;
}

const Productcard: FC<ProductCardProps> = ({ title, manufacturer, size, price }) => {
  return (
    <>
      <div className="w-52 h-60 bg-red-200 p-2">
        <Image src="/food.webp" alt="food" width={25} height={25} />
        <h1 className="product-title text-center">{title}</h1>
        <div className="flex justify-center space-x-1">
          <p className="product-manufacturer">{manufacturer}</p>
          <p>|</p>
          <p className="product-size">{size}</p>
        </div>
        <h2 className="text-center">{price}:-</h2>
        <div className="amountAndPurchase flex bg-green-100 justify-between p-2">
          <div className="flex p-2">
            <button className="decreaseAmount">-</button>
            <p className="amount">0</p>
            <button className="increaseAmount">+</button>
          </div>
          <button className="purchaseButton border p-1">KÖP</button>
        </div>
      </div>
    </>
  );
};

export default Productcard;
