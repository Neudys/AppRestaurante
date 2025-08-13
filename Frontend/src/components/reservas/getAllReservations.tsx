import { useEffect, useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface Reservation {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
  table: string;
  persons: number | string;
  preferences: string;
  note?: string;
}



const GetAllReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);

  useEffect(() => {
    const handlePerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(5);
      else setItemsPerPage(10);
    };
    handlePerPage();
    window.addEventListener("resize", handlePerPage);
    return () => window.removeEventListener("resize", handlePerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, reservations.length]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get<Reservation[]>("/reservas");
        setReservations(res.data);
      } catch (error) {
        toast.error("No se pudieron cargar las reservas");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/reservas/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
      toast.success("Reserva eliminada");
    } catch (error) {
      toast.error("No se pudo eliminar la reserva");
      console.error(error);
    }
  };

  // Evitar división por 0 mientras itemsPerPage aún es 0 en el primer render
  const safeItemsPerPage = itemsPerPage || Math.max(1, reservations.length);
  const totalPages = Math.max(
    1,
    Math.ceil(reservations.length / safeItemsPerPage)
  );

  const startIndex = (currentPage - 1) * safeItemsPerPage;
  const endIndex = startIndex + safeItemsPerPage;
  const paginatedReservations = reservations.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="h-screen mt-70 text-lg px-4 mb-10">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold text-center mb-6">
          Todas las Reservas
        </h1>
        <Link to="/reservations/create">
          <div className="ml-4 bg-amber-950/70 p-3 rounded text-amber-50 hover:scale-105 transition duration-500 cursor-pointer">
            create a reservation
          </div>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">
            Cargando reservas...
          </div>
        ) : reservations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedReservations.map((reserva) => (
                <div
                  key={reserva._id}
                  className="bg-amber-950/70 p-4 rounded shadow relative"
                >
                  <h3 className="font-bold mb-2">
                    {reserva.name} {reserva.lastName}
                  </h3>
                  <div className="h-[1px] mb-5 bg-amber-50 "></div>
                  <p>
                    <strong>Email:</strong> {reserva.email}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {reserva.date}
                  </p>
                  <p>
                    <strong>Hora:</strong> {reserva.startTime} -{" "}
                    {reserva.endTime}
                  </p>
                  <p>
                    <strong>Personas:</strong> {reserva.persons}
                  </p>
                  <p>
                    <strong>Preferencias:</strong> {reserva.preferences}
                  </p>
                  <p>
                    <strong>Mesa:</strong> {reserva.table}
                  </p>
                  <button
                    onClick={() => handleDelete(reserva._id)}
                    className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800 transition text-xs"
                    aria-label="Eliminar reserva"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            {/* Controles de paginado */}
            <div className="flex justify-center mt-6 gap-2 text-white flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-amber-800 hover:bg-amber-700 disabled:opacity-40"
                aria-label="Página anterior"
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
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-amber-800 hover:bg-amber-700 disabled:opacity-40"
                aria-label="Página siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No hay reservas registradas.
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllReservations;
