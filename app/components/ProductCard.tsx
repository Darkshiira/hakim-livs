'use client';

import Image from 'next/image';
import { FC, CSSProperties } from 'react';

// Mall för produkterna som laddas in på frontpage (kan självklart användas på andra platser där produkter ska in också)
// TODO: lägg till funktion på knapparna

interface ProductCardProps {
  title: string;
  manufacturer: string;
  size: string;
  price: number;
  image: string;
}

const imageStyle: CSSProperties = {
  objectFit: 'cover',
  border: '1px solid #fff',
};

const Productcard: FC<ProductCardProps> = ({ title, manufacturer, size, price, image }) => {
  return (
    <>
      <div className="w-52 h-auto bg-red-200 p-2">
        <div className="bg-yellow-900 p-24 relative">
          <Image src={image} alt="food" layout="fill" style={imageStyle} />
        </div>
        <h1 className="product-title text-center font-bold text-lg">{title}</h1>
        <div className="flex justify-center space-x-1">
          <p className="product-manufacturer">{manufacturer}</p>
          <p>|</p>
          <p className="product-size">{size}</p>
        </div>
        <h2 className="text-center">{price}:-</h2>
        <div className="amountAndPurchase flex bg-green-100 justify-between p-2 items-center">
          <div className="flex w-20 justify-between">
            <button className="decreaseAmount w-full bg-blue-200">-</button>
            <p className="amount">0</p>
            <button className="increaseAmount w-full bg-blue-200">+</button>
          </div>
          <button className="purchaseButton p-1 w-20 bg-blue-200 rounded-md">KÖP</button>
        </div>
      </div>
    </>
  );
};

export default Productcard;
