import { useEffect, useState } from "react";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const NavBar = () => {
  const isMobile = useIsMobile();

  return (
    <div className=" fixed w-full z-50 flex justify-center pointer-events-none ">
      <nav className="backdrop-blur-xl mt-4 pointer-events-auto mx-5 bg-amber-950/70 text-white p-4 flex w-full max-w-6xl justify-between items-center shadow rounded-md">
        <div className="text-3xl font-bold italiana ">Arcadia</div>
        {!isMobile ? <NavBarDesktop /> : <NavBarMobile />}
      </nav>
    </div>
  );
};

export default NavBar;
