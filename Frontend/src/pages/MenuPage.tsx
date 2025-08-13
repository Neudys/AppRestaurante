import NavBar from "../components/navBar/navBar";
import BackgroundFader from "../components/Homepage/BackgroundFader";
import FilterMenu from "../components/MenuPage/FilterMenu";

const MenuPage = () => {
  return (
    <div >
      <NavBar />
      <BackgroundFader >
        <FilterMenu />
      </BackgroundFader>
    </div>
  );
};

export default MenuPage;
