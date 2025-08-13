import { useState } from "react";
import Filter from "./Filter";
import MenuItems from "./menuItems";

const FilterMenu = () => {
  const [categoria, setCategoria] = useState("todos");
  const [origen, setOrigen] = useState("todos");
  const [precio, setPrecio] = useState("todos");
  const [especialidad, setEspecialidad] = useState("todos");
  
  return (
    <div className="mx-5 flex self-start flex-col w-full max-w-7xl items-center justify-center text-white text-4xl font-bold ">
      <nav className="mt-40 pointer-events-auto  bg-amber-950/80 text-white p-4 flex w-full max-w-7xl justify-between items-center shadow rounded-md text-[16px] font-[400]">
        <Filter
          categoria={categoria}
          setCategoria={setCategoria}
          origen={origen}
          setOrigen={setOrigen}
          precio={precio}
          setPrecio={setPrecio}
          especialidad={especialidad}
          setEspecialidad={setEspecialidad}
        />
      </nav>
      <MenuItems
          categoria={categoria}
          origen={origen}
          precio={precio}
          especialidad={especialidad}
        />
    </div>
  );
};

export default FilterMenu;
