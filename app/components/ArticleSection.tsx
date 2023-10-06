"use client";

import Productcard from "./ProductCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useItemStore } from "../zustand/zustandStore";

interface ProductData {
  id: string;
  title: string;
  manufacturer: string;
  size: string;
  price: number;
  image: string;
  category: string;
}

const ArticleSection: React.FC = () => {
  //To get the category from zustand
  const category = useItemStore((state) => state.category);
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
      .then(function (response) {
        const filterdproducts = response.data.filter(
          (product: ProductData) => product.category === category
        );
        setProducts(filterdproducts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [category]);

  return (
    <>
      <section className="p-4 bg-blue-200">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Sök artikel"
            className="border rounded-full w-80 p-2 m-4"
          />
          <button className="hover:text-blue-500">Sök</button>
        </div>
        <div className="productContainer grid grid-cols-4 gap-4">
          {products.map((product) => (
            <Productcard
              key={product.id} // Use a unique key for each Productcard
              title={product.title}
              manufacturer={product.manufacturer}
              size={product.size}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ArticleSection;
