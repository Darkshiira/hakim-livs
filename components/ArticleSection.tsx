"use client";

import Productcard from "./ProductCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useItemStore } from "../app/zustand/zustandStore";

interface ProductData {
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
  isfeatured: boolean;
  stock: number;
  isarchived: boolean;
}

const ArticleSection: React.FC = () => {
  //To get the category from zustand
  const category = useItemStore((state) => state.category);
  const [products, setProducts] = useState<ProductData[]>([]);
  const search = useItemStore((state) => state.search);

  useEffect(() => {
    const id = "active";
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${process.env.NEXT_PUBLIC_STOREID}/products/${id}`
      ) //TODO FIXA RÄTT STOREID
      .then(function (response) {
        if (search !== "") {
          const filterdproducts = response.data.filter(
            (product: ProductData) =>
              product.title.toLowerCase().includes(search.toLowerCase()) ||
              product.manufacturer.toLowerCase().includes(search.toLowerCase())
          );
          const sortproducts = filterdproducts.sort(
            (a: ProductData, b: ProductData) =>
              Number(b.isfeatured) - Number(a.isfeatured)
          );
          const stockedproducts = sortproducts.filter(
            (product: ProductData) => {
              return product.stock > 0;
            }
          );
          setProducts(stockedproducts);
          return;
        }

        if (category === "Alla" || category === "") {
          const sortproducts = response.data.sort(
            (a: ProductData, b: ProductData) =>
              Number(b.isfeatured) - Number(a.isfeatured)
          );
          const stockedproducts = sortproducts.filter(
            (product: ProductData) => {
              return product.stock > 0;
            }
          );
          setProducts(stockedproducts);

          return;
        } else {
          const filterdproducts = response.data.filter(
            (product: ProductData) => product.category === category
          );
          const sortproducts = filterdproducts.sort(
            (a: ProductData, b: ProductData) =>
              Number(b.isfeatured) - Number(a.isfeatured)
          );
          const stockedproducts = sortproducts.filter(
            (product: ProductData) => {
              return product.stock > 0;
            }
          );
          setProducts(stockedproducts);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [category, search]);
  return (
    <>
      <section className="p-4 bg-blue-200">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Sök artikel"
            className="border rounded-full w-80 p-2 m-4"
            onChange={(e) => {
              useItemStore.setState({ search: e.target.value });
            }}
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
              isfeatured={product.isfeatured}
              stock={product.stock}
              ingredients={product.ingredients}
              description={product.description}
              category={product.category}
              color={product.color}
              id={product.id}
              storeId={product.storeId}
              isarchived={product.isarchived}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ArticleSection;
