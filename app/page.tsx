import Link from 'next/link';
import Dropdown from './components/Dropdown';
import Productcard from './components/ProductCard';

export default function Home() {
  return (
    <>
      <nav className="p-4 w-full bg-green-200 flex justify-between">
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
      <section className="hero bg-black text-red-400 h-52 w-full flex items-center justify-center">HERO</section>
      <main className="flex justify-center w-full">
        <aside className="p-4 bg-purple-200 w-52">
          <h2 className="text-center font-bold text-lg">Kategorier</h2>
          <Dropdown />
        </aside>
        <section className="p-4 bg-blue-200">
          <div className="flex">
            <input type="text" placeholder="Sök artikel" className="border rounded-full p-2 m-4" />
            <button className="hover:text-blue-500">Sök</button>
          </div>
          <div className="productContainer grid grid-cols-4 gap-4">
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
            <Productcard />
          </div>
        </section>
      </main>
      <footer className="bg-black text-red-400 h-40 flex items-center justify-center w-full">
        <p className="justify-self-center">Footer</p>
      </footer>
    </>
  );
}
