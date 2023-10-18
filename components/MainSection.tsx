//Main section of the page, contains the article section and the category aside

import ArticleSection from "./ArticleSection";
import CategoryAside from "./CategoryAside";

const MainSection = () => {
  return (
    <>
      <div className="flex justify-center w-full flex-grow min-h-screen">
        <CategoryAside />
        <ArticleSection />
      </div>
    </>
  );
};

export default MainSection;
