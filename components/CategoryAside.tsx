//This is an aside component that is used on the landingpage.
//It is used to display the categories of the products, and uses the Dropdown component to display the categories.
//This is to make it able to have subcategories in the future.
//It also has a reload state that is used to reload the categories when switching between links.

"use client";

import Dropdown from "./Dropdown";
import { useItemStore } from "../app/zustand/zustandStore";
import axios from "axios";
import { useEffect } from "react";

const CategoryAside = () => {
  const items = useItemStore((state) => state.items);
  const updateItems = useItemStore((state) => state.updateItems);
  const update = useItemStore((state) => state.update);
  const updateUpdate = useItemStore((state) => state.updateUpdate);
  const itemsitr = items.entries();
  const reload = useItemStore((state) => state.reload);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${process.env.NEXT_PUBLIC_STOREID}/categories`,
        {}
      )
      .then(function (response) {
        response.data.forEach((item: { id: string; title: string }) => {
          items.set(item.id, item.title);
          updateUpdate(true);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reload]);

  return (
    <>
      <div className="p-4 bg-slate-100 w-52 relative">
        <div className="sticky top-24">
          <h2 className="text-center font-bold text-lg">Kategorier</h2>
          <Dropdown props={"Alla"} />
          {update
            ? Array.from(itemsitr).map(([key, value]) => (
                <Dropdown props={value} key={key} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default CategoryAside;
