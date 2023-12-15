import { SearchForm } from "..";

const Header = ({ saveLocation }: any) => {
  return (
    <div className="mt-[-48px]">
      <div className="hidden md:block md:h-[70vh] md:w-full md:bg-cover md:bg-[url('https://food.grab.com/static/page-home/TH-new-3.jpg')]"></div>
      <div className="xl:ml-[15%]">
        <SearchForm saveLocation={saveLocation} />
      </div>
    </div>
  );
};

export default Header;
