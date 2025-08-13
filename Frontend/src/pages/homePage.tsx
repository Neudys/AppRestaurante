import NavBar from "../components/navBar/navBar";
import BackgroundFader from "../components/Homepage/BackgroundFader";
import FrontText from "../components/Homepage/FrontText";

const homePage = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <BackgroundFader>
        <FrontText />
      </BackgroundFader>
    </div>
  );
};

export default homePage;
