import Dropdown from './Dropdown';

// Aside på första sidan där matkategorierna finns

const CategoryAside = () => {
  return (
    <>
      <aside className="p-4 bg-purple-200 w-52">
        <h2 className="text-center font-bold text-lg">Kategorier</h2>
        <Dropdown />
      </aside>
    </>
  );
};

export default CategoryAside;
