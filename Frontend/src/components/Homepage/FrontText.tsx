import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const FrontText = () => {
  return (
    <div className="flex flex-col text-center items-center">
      <h1 className="italiana text-8xl md:text-9xl lg:text-[190px]">Arcadia</h1>
      <p className="pioret text-2xl md:text-4xl lg:text-3xl">Made with pure Love</p>
      <Link
        to="/reservations/create"
        className="text-xl md:text-2xl lg:text-3xl translate-y-20 pioret flex items-center justify-center gap-2 border-amber-100 border w-fit p-3 rounded-2xl bg-black/70 hover:scale-110 transition duration-500 hover:bg-black/30"
      >
        <PlusIcon className="w-5 h-5" />
        Create a reservation
      </Link>
    </div>
  );
};

export default FrontText;
