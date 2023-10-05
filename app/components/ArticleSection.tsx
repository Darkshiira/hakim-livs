'use client';

import Productcard from './ProductCard';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface ProductData {
  id: string;
  title: string;
  manufacturer: string;
  size: string;
  price: number;
}

const ArticleSection: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section className="p-4 bg-blue-200">
        <div className="flex">
          <input type="text" placeholder="Sök artikel" className="border rounded-full p-2 m-4" />
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
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ArticleSection;
