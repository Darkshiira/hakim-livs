import Image from 'next/image';
import Link from 'next/link';
import Dropdown from './components/Dropdown';

export default function Home() {
  return (
    <>
      <nav className="p-4 bg-green-200 flex justify-between">
        <h1>Hakim Livs</h1>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-blue-500">
            Logga in
          </Link>
          <Link href="/" className="hover:text-blue-500">
            Varukorg
          </Link>
        </div>
      </nav>
      <section className="hero bg-black text-red-400 h-52 flex items-center justify-center">HERO</section>
      <main className="flex justify-center">
        <aside className="p-4 bg-purple-200 w-52">
          <h2 className="text-center font-bold text-lg">Kategorier</h2>
          <Dropdown />
        </aside>
        <section className="p-4 bg-blue-200">
          <input type="text" placeholder="Sök artikel" className="border rounded-full p-2" />
          <div className="productContainer">
            <div className="produkt">Godis</div>
            <div className="produkt">Bulle</div>
            <div className="produkt">Glass</div>
            <div className="produkt">Pizza</div>
            <div className="produkt">Köttbullar</div>
            <div className="produkt">Pannkaka</div>
            <div className="produkt">Fiskpinnar</div>
            <div className="produkt">Chips</div>
            <div className="produkt">Kycklingsallad</div>
          </div>
        </section>
      </main>
      <footer className="bg-black text-red-400 h-40 flex items-center justify-center absolute bottom-0 w-screen">
        <p className="justify-self-center">Footer</p>
      </footer>
    </>
  );
}
