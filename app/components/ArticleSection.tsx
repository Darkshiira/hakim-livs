import Productcard from './ProductCard';

const ArticleSection = () => {
  return (
    <>
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
    </>
  );
};

export default ArticleSection;
