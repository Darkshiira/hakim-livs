import ArticleSection from './ArticleSection';
import CategoryAside from './CategoryAside';

// Huvudinnehållet som är mellan navbar och footer på första sidan

const MainSection = () => {
  return (
    <>
      <div className="flex justify-center w-full">
        <CategoryAside />
        <ArticleSection />
      </div>
    </>
  );
};

export default MainSection;