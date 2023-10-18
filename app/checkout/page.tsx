//The page for the checkout page, here we call for the CheckoutForm component and pass in the basket and subtotal as props.

//We also use the useItemStore hook to get the basket and subtotal from the zustand store.
//We also use the Image component from next/image to display the images of the items in the basket.
//We also use the CheckoutForm component to display the form for the user to fill in their information.

//TODO HARDCODED SHIPPING COSTS AND PAYMENT METHOD

"use client";
import React from "react";
import Image from "next/image";
import { useItemStore } from "../zustand/zustandStore";
import { CheckoutForm } from "../../components/CheckoutForm";

const CheckoutPage = () => {
  const basket = useItemStore((state) => state.basket);
  const subtotal = basket.reduce((acc, item) => acc + item.price, 0);
  const updateSearch = useItemStore((state) => state.updateSearch);

  let content;
  updateSearch("");
  if (basket.length === 0) {
    content = (
      <div className="p-48 bg-white">
        <h1 className="text-2xl">Checkout</h1>
        <p>Din varukorg är tom</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="w-1/2 space-y-8">
          <h1 className="text-2xl">Checkout</h1>
          {CheckoutForm(basket, subtotal)}
        </div>

        <div className="w-1/2 space-y-4 border-l pl-12">
          <h1 className="text-2xl">Din Varukorg</h1>
          {basket.map((item) => (
            <div
              key={item.title}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <Image width={100} height={100} src={item.image} alt="food" />
                <p className="ml-4">{item.title}</p>
              </div>
              <p>
                {item.amount} a {item.size} :{" "}
                {item.price.toString().slice(0, -6) +
                  " " +
                  item.price.toString().slice(-6, -3) +
                  " " +
                  item.price.toString().slice(-3)}
                Sek
              </p>
            </div>
          ))}
          <div>
            <p className="text-right">
              Subtotal:
              {subtotal.toString().slice(0, -6) +
                " " +
                subtotal.toString().slice(-6, -3) +
                " " +
                subtotal.toString().slice(-3)}{" "}
              Sek
            </p>
            <p className="text-right">Shipping: 50 Sek</p>
            <p className="text-right font-bold">
              Total:{" "}
              {(subtotal + 50).toString().slice(0, -6) +
                " " +
                (subtotal + 50).toString().slice(-6, -3) +
                " " +
                (subtotal + 50).toString().slice(-3)}{" "}
              Sek
            </p>
          </div>
          <div className={"border w-98"}></div>
          <div className="text-center ">
            <h1>Betalning:</h1>
            <p>Swisha nummer: 073 777 777 7</p>
            <p>Eller betala kontant vid leverans.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="p-24 flex flex-row justify-around border">{content}</div>
  );
};

export default CheckoutPage;
