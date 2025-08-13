import { Beef, DollarSign, Earth, LeafyGreen } from "lucide-react";
import { Link } from "react-router";

interface FilterProps {
  categoria: string;
  setCategoria: (val: string) => void;
  origen: string;
  setOrigen: (val: string) => void;
  precio: string;
  setPrecio: (val: string) => void;
  especialidad: string;
  setEspecialidad: (val: string) => void;
}

const Filter = ({
  categoria,
  setCategoria,
  origen,
  setOrigen,
  precio,
  setPrecio,
  especialidad,
  setEspecialidad,
}: FilterProps) => {
  return (
    <>
      <div className="hidden lg:flex justify-between w-full">
        <div>
          <p className="mb-2 ml-1 flex gap-2">
            <Beef size={20} />
            Tipo de plato
          </p>
          <select
            className="bg-black/30 p-3 rounded-md text-white"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option className="bg-amber-950 text-white" value="todos">
              Todos
            </option>
            <option className="bg-amber-950 text-white" value="principal">
              Plato principal
            </option>
            <option className="bg-amber-950 text-white" value="ensaladas">
              Ensaladas / aperitivos
            </option>
            <option className="bg-amber-950 text-white" value="comidaRapida">
              Comida rapida
            </option>
            <option className="bg-amber-950 text-white" value="guarniciones">
              Guarniciones
            </option>
            <option className="bg-amber-950 text-white" value="postres">
              Postres
            </option>
            <option className="bg-amber-950 text-white" value="bebidas">
              Bebidas
            </option>
          </select>
        </div>

        <div>
          <p className="mb-2 ml-1 flex gap-2">
            <Earth size={20} />
            Origen
          </p>
          <select
            className="bg-black/30 p-3 rounded-md text-white"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            required
          >
            <option className="bg-amber-950 text-white" value="todos">
              Todos
            </option>
            <option className="bg-amber-950 text-white" value="dominicana">
              Dominicana
            </option>
            <option className="bg-amber-950 text-white" value="mexicana">
              Mexicana
            </option>
            <option className="bg-amber-950 text-white" value="italiana">
              Italiana
            </option>
            <option className="bg-amber-950 text-white" value="japonesa">
              Japonesa
            </option>
            <option className="bg-amber-950 text-white" value="china">
              China
            </option>
            <option className="bg-amber-950 text-white" value="india">
              India
            </option>
            <option className="bg-amber-950 text-white" value="árabe">
              Árabe
            </option>
            <option className="bg-amber-950 text-white" value="francesa">
              Francesa
            </option>
            <option className="bg-amber-950 text-white" value="estadounidense">
              Estadounidense
            </option>
            <option className="bg-amber-950 text-white" value="peruana">
              Peruana
            </option>
            <option className="bg-amber-950 text-white" value="mediterranea">
              Mediterránea
            </option>
          </select>
        </div>
        <div>
          <p className="mb-2 ml-1 flex gap-2">
            <DollarSign size={20} /> Precio
          </p>
          <select
            className="bg-black/30 p-3 rounded-md text-white"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          >
            <option className="bg-amber-950 text-white" value="todos">
              Todos
            </option>
            <option className="bg-amber-950 text-white" value="menos10">
              Menos de $10
            </option>
            <option className="bg-amber-950 text-white" value="10a20">
              $10 - $20
            </option>
            <option className="bg-amber-950 text-white" value="20a35">
              $20 - $35
            </option>
            <option className="bg-amber-950 text-white" value="mas35">
              Más de $35
            </option>
          </select>
        </div>
        <div>
          <p className="mb-2 ml-1 flex gap-2">
            <LeafyGreen /> Especialidad
          </p>
          <select
            className="bg-black/30 p-3 rounded-md text-white"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          >
            <option className="bg-amber-950 text-white" value="todos">
              Todos
            </option>
            <option className="bg-amber-950 text-white" value="vegano">
              Vegano
            </option>
            <option className="bg-amber-950 text-white" value="vegetariano">
              Vegetariano
            </option>
            <option className="bg-amber-950 text-white" value="sinGluten">
              Sin gluten
            </option>
            <option className="bg-amber-950 text-white" value="sinLactosa">
              Sin lactosa
            </option>
            <option className="bg-amber-950 text-white" value="bajoEnCalorias">
              Bajo en calorías
            </option>
            <option className="bg-amber-950 text-white" value="keto">
              Keto
            </option>
            <option className="bg-amber-950 text-white" value="tradicional">
              Tradicional
            </option>
          </select>
          <Link
            to="/menu/addMenu"
            className="ml-4 bg-black/30 p-3 rounded text"
          >
            Create a menu item
          </Link>
        </div>
      </div>

      <div className="block lg:hidden space-y-4">
        <details className="bg-black/30 rounded-md text-white p-3 cursor-pointer">
          <summary className="font-semibold text-lg mb-2">Filtros</summary>

          <div className="gap-3 mt-2 flex flex-wrap justify-around">
            {/* CATEGORÍA */}
            <div>
              <p className="mb-2 flex gap-2 items-center">
                <Beef size={20} /> Tipo de plato
              </p>
              <select
                className="bg-amber-950 text-white p-2 rounded-md w-full"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="principal">Plato principal</option>
                <option value="ensaladas">Ensaladas / aperitivos</option>
                <option value="comidaRapida">Comida rápida</option>
                <option value="guarniciones">Guarniciones</option>
                <option value="postres">Postres</option>
                <option value="bebidas">Bebidas</option>
              </select>
            </div>

            {/* ORIGEN */}
            <div>
              <p className="mb-2 flex gap-2 items-center">
                <Earth size={20} /> Origen
              </p>
              <select
                className="bg-amber-950 text-white p-2 rounded-md w-full"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="dominicana">Dominicana</option>
                <option value="mexicana">Mexicana</option>
                <option value="italiana">Italiana</option>
                <option value="japonesa">Japonesa</option>
                <option value="china">China</option>
                <option value="india">India</option>
                <option value="árabe">Árabe</option>
                <option value="francesa">Francesa</option>
                <option value="estadounidense">Estadounidense</option>
                <option value="peruana">Peruana</option>
                <option value="mediterranea">Mediterránea</option>
              </select>
            </div>

            {/* PRECIO */}
            <div>
              <p className="mb-2 flex gap-2 items-center">
                <DollarSign size={20} /> Precio
              </p>
              <select
                className="bg-amber-950 text-white p-2 rounded-md w-full"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="menos10">Menos de $10</option>
                <option value="10a20">$10 - $20</option>
                <option value="20a35">$20 - $35</option>
                <option value="mas35">Más de $35</option>
              </select>
            </div>

            {/* ESPECIALIDAD */}
            <div>
              <p className="mb-2 flex gap-2 items-center">
                <LeafyGreen size={20} /> Especialidad
              </p>
              <select
                className="bg-amber-950 text-white p-2 rounded-md w-full"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="vegano">Vegano</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="sinGluten">Sin gluten</option>
                <option value="sinLactosa">Sin lactosa</option>
                <option value="bajoEnCalorias">Bajo en calorías</option>
                <option value="keto">Keto</option>
                <option value="tradicional">Tradicional</option>
              </select>
              <div>
                <Link
                to="/menu/addMenu"
                className="mb-2 mt-2 flex gap-2 items-center bg-amber-950 text-white p-2 rounded-md w-full"
              >
                Create a menu item
              </Link>
              </div>
              
            </div>
          </div>
        </details>
      </div>
    </>
  );
};

export default Filter;
