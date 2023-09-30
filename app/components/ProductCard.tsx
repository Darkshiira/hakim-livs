import Image from 'next/image';

const Productcard = () => {
  return (
    <>
      <div className="w-52 h-60 bg-red-200 p-2">
        <Image src="/food.webp" alt="food" width={25} height={25} />
        <h1 className="product-title text-center">Titel</h1>
        <div className="flex justify-center space-x-1">
          <p className="product-manufacturer">Tillverkare</p>
          <p>|</p>
          <p className="product-size">Storlek</p>
        </div>
        <h2 className="text-center">399:-</h2>
        <div className="amountAndPurchase flex bg-green-100 justify-between p-2">
          <div className="flex p-2">
            <button className="decreaseAmount">-</button>
            <p className="amount">0</p>
            <button className="increaseAmount">+</button>
          </div>
          <button className="purchaseButton border p-1">KÖP</button>
        </div>
      </div>
    </>
  );
};

export default Productcard;
