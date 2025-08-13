import { useEffect, useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface Reservation {
  _id: string;
  name: string;
  description: string;
  price: number;
  imagenBase64: string;
  category: string;
  origin: string;
  specialty: string;
  available: boolean;
}

interface MenuItemsProps {
  categoria: string;
  origen: string;
  precio: string;
  especialidad: string;
}

const MenuItems = ({
  categoria,
  origen,
  precio,
  especialidad,
}: MenuItemsProps) => {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [valor, setValor] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = valor;

  const formatearCategoria = (cat: string) => {
    const map: Record<string, string> = {
      principal: "Plato principal",
      ensaladas: "Ensalada / Aperitivo",
      comidaRapida: "Comida rápida",
      guarniciones: "Guarnición",
      postres: "Postre",
      bebidas: "Bebida",
    };
    return map[cat] || cat;
  };

  const formatearEspecialidad = (esp: string) => {
    const map: Record<string, string> = {
      tradicional: "Tradicional",
      vegano: "Vegano",
      vegetariano: "Vegetariano",
      sinGluten: "Sin gluten",
      sinLactosa: "Sin lactosa",
      keto: "Keto",
      bajoEnCalorias: "Bajo en calorías",
    };
    return map[esp] || esp;
  };

  const capitalizar = (txt: string) =>
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get<Reservation[]>("/menu");
        setItems(res.data);
      } catch (error) {
        toast.error("No se pudo cargar el menú");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const actualizarValor = () => {
      if (window.innerWidth < 768) {
        setValor(5);
      } else {
        setValor(10);
      }
    };

    actualizarValor();
    window.addEventListener("resize", actualizarValor);

    return () => window.removeEventListener("resize", actualizarValor);
  }, []);

  const filteredItems = items.filter((itm) => {
    const matchCategoria = categoria === "todos" || itm.category === categoria;
    const matchOrigen = origen === "todos" || itm.origin === origen;
    const matchEspecialidad =
      especialidad === "todos" || itm.specialty === especialidad;

    const matchPrecio =
      precio === "todos" ||
      (precio === "menos10" && itm.price < 10) ||
      (precio === "10a20" && itm.price >= 10 && itm.price <= 20) ||
      (precio === "20a35" && itm.price > 20 && itm.price <= 35) ||
      (precio === "mas35" && itm.price > 35);

    return matchCategoria && matchOrigen && matchEspecialidad && matchPrecio;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/menu/${id}`);
      setItems((prev) => prev.filter((itm) => itm._id !== id));
      toast.success("Plato eliminado");
    } catch (error) {
      toast.error("No se pudo eliminar el plato");
      console.error(error);
    }
  };

  return (
    <div className="h-fit px-4 mb-3">
      <div className="w-full max-w-5xl mx-auto mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Cargando menú...</div>
        ) : filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedItems.map((itm) => (
                <div
                  key={itm._id}
                  className="w-full bg-amber-950/90 p-4 rounded shadow flex flex-col relative"
                >
                  <button
                    onClick={() => handleDelete(itm._id)}
                    className="absolute top-2 right-2 bg-red-900/80 text-white p-2 rounded-full hover:bg-red-800 transition"
                    aria-label="Eliminar plato"
                  >
                    <Trash2 size={18} />
                  </button>
                  <img
                    src={itm.imagenBase64}
                    alt={itm.name}
                    className="w-full h-50 object-cover rounded-md flex-shrink-0 mb-4"
                  />
                  <div className="flex flex-col justify-between flex-1 overflow-hidden w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-white break-words pr-2">
                        {itm.name}
                      </h3>
                      <span className="text-lg font-semibold text-white whitespace-nowrap">
                        ${itm.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-white break-words whitespace-normal mt-1 mb-2 max-w-full overflow-hidden">
                      {itm.description}
                    </p>
                    <div className="text-xs text-white italic mt-auto">
                      {formatearCategoria(itm.category)} /{" "}
                      {capitalizar(itm.origin)} /{" "}
                      {formatearEspecialidad(itm.specialty)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2 text-white flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-amber-800 hover:bg-amber-700 disabled:opacity-40"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-white text-amber-900 font-light text-2xl"
                        : "bg-amber-800 hover:bg-amber-700 font-light text-2xl"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-amber-800 hover:bg-amber-700 disabled:opacity-40"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-300 py-10">
            No hay platos que coincidan con los filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
