import { Link } from "react-router";
import { Home, BookOpen, CalendarCheck } from "lucide-react";

const NavBarDesktop = () => {
  return (
    <div className="flex gap-6 items-center">
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
  );
};

export default NavBarDesktop;
