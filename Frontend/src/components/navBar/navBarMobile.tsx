import { useState } from "react";
import { Link } from "react-router";
import { Home, BookOpen, CalendarCheck, Menu } from "lucide-react";

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white flex items-center gap-2"
        aria-label="Toggle menu"
      >
        <Menu size={28} />
        <span className="text-sm">Menú</span>
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-amber-950/70 text-white w-56 rounded shadow-lg py-4 px-6 flex flex-col gap-4 z-50">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <Home size={20} /> <span>Home</span>
          </Link>
          <Link
            to="/menu"
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <BookOpen size={20} /> <span>Menu</span>
          </Link>
          <Link
            to="/reservations"
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <CalendarCheck size={20} /> <span>Reservas</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBarMobile;
