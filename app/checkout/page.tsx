"use client";
import React from "react";
import Image from "next/image";
import { useItemStore } from "../zustand/zustandStore";
import { CheckoutForm } from "../../components/CheckoutForm";

const CheckoutPage = () => {
  const basket = useItemStore((state) => state.basket);
  const subtotal = basket.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {basket.length === 0 ? (
        <div className="p-48">
          <h1 className="text-2xl">Checkout</h1>
          <p>Din varukorg är tom</p>
          <p>Vi omdirigerar dig tillbaka till butiken...</p>
        </div>
      ) : (
        <div className="p-24 flex flex-row justify-around border">
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
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
