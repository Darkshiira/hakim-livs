import Link from 'next/link';

const Nav = () => {
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
    </>
  );
};

export default Nav;
