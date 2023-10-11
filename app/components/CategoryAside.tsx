"use client";

import Dropdown from "./Dropdown";
import { useItemStore } from "../zustand/zustandStore";
import axios from "axios";
import { useEffect } from "react";

// Aside på första sidan där matkategorierna finns

const CategoryAside = () => {
  const items = useItemStore((state) => state.items);
  const updateItems = useItemStore((state) => state.updateItems);
  const update = useItemStore((state) => state.update);
  const updateUpdate = useItemStore((state) => state.updateUpdate);
  const itemsitr = items.entries();
  const storeID = "000603d5-70de-4d0c-b60b-eb8025ab7edc";//TODO FIXA RÄTT STOREID
  // Get the categories from the database and add them to the dropdown

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/categories`, //TODO FIXA RÄTT STOREID
        {}
      )
      .then(function (response) {
        response.data.forEach((item: { id: string; title: string }) => {
          items.set(item.id, item.title);
          updateUpdate(!update);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="p-4 bg-purple-200 w-52">
        <h2 className="text-center font-bold text-lg">Kategorier</h2>
        {update
          ? Array.from(itemsitr).map(([key, value]) => (
              <Dropdown props={value} key={key} />
            ))
          : null}
      </div>
    </>
  );
};

export default CategoryAside;
