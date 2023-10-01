import ArticleSection from './ArticleSection';
import CategoryAside from './CategoryAside';

const MainSection = () => {
  return (
    <>
      <main className="flex justify-center w-full">
        <CategoryAside />
        <ArticleSection />
      </main>
    </>
  );
};

export default MainSection;
