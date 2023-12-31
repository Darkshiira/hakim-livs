//This is a hero that fetches the billboard from the CMS and displays it.
// It is featured in the landingpage page.tsx.

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CSSProperties } from "react";

const Hero = () => {
  const [billboardurl, setBillboardurl] = useState("");
  const [billboardTitle, setBillboardTitle] = useState("");
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    const id = "active";
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${process.env.NEXT_PUBLIC_STOREID}/billboards/${id}`,
        {}
      )
      .then((res) => {
        setBillboardurl(res.data.image);
        setBillboardTitle(res.data.text);
        setBanner(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const imageStyle: CSSProperties = {
    objectFit: "cover",
    height: "300px",
    width: "full",
  };

  return (
    <section>
      {banner ? (
        <div className="hero bg-green-100 flex justify-center items-center overflow-hidden ">
          <Image
            src={billboardurl}
            alt="food"
            width="1800"
            height="228"
            style={imageStyle}
          />
          <p className="absolute bg-transparent text-white text-6xl z-20">
            {billboardTitle}
          </p>
        </div>
      ) : (
        <div className="hero bg-black text-white-400 h-80 flex w-full content-center justify-center items-center overflow-hidden ">
          <p>Reklam kommer snart!</p>
        </div>
      )}
    </section>
  );
};

export default Hero;
