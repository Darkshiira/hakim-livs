'use client';
import Image from 'next/image';
import { Popover } from '@headlessui/react';
import { FC, CSSProperties } from 'react';

const imageStyle: CSSProperties = {
  objectFit: 'cover',
  overflow: 'hidden',
  height: '500px',
  width: '800px',
};

const BigProductCard = (props: any) => {
  return (
    <>
      <Popover>
        <Popover.Button>Info</Popover.Button>

        <Popover.Panel className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl bg-white border rounded-lg shadow-md p-2 z-50">
          <div>
            <div className="flex ">
              <Image src={props.image} alt="product" width={800} height={600} style={imageStyle}></Image>
              <div className="flex flex-col justify-evenly bg-red-300 p-2 w-full">
                <h1 className="font-extrabold text-4xl text-center">{props.title}</h1>
                <div className="flex bg-blue-400 justify-evenly">
                  <p>{props.manufacturer}</p>|<p>{props.size}</p>
                </div>
                <h2 className="text-center text-5xl font-extrabold">{props.price}:-</h2>
                <div className="flex justify-evenly">
                  <div className="flex justify-evenly text-xl bg-blue-400 border border-black w-32">
                    <button className="w-full">-</button>
                    <p>0</p>
                    <button className="w-full">+</button>
                  </div>
                  <button className="p-1 w-20 bg-green-500 rounded-md hover:text-white w-32">KÖP</button>
                </div>
              </div>
            </div>
            <div className="bg-yellow-300">
              <h2 className="font-bold">Produktinformation</h2>
              <p>{props.description}</p>
            </div>
            <div className="bg-blue-300">
              <h2 className="font-bold">Innehållsförteckning</h2>
              <p>{props.ingredients}</p>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
};

export default BigProductCard;
