import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Link, useNavigate } from "react-router";
import BackgroundFader from "../components/Homepage/BackgroundFader";
import { ArrowLeft } from "lucide-react";

const today = new Date().toISOString().split("T")[0];



const CreateReservation = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [table, setTable] = useState("");
  const [persons, setPersons] = useState("");
  const [preferences, setPreferences] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const hours = [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(e.target.value);
    // Si la hora de finalización es menor, la resetea
    if (endTime && hours.indexOf(e.target.value) >= hours.indexOf(endTime)) {
      setEndTime("");
    }
  };



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      lastName,
      phoneNumber,
      email,
      date,
      startTime,
      endTime,
      persons,
      preferences,
      note,
      table,
    };

    if (
      !name.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !date.trim() ||
      !startTime.trim() ||
      !endTime.trim() ||
      !table.trim() ||
      !persons.trim() ||
      !preferences.trim()
    ) {
      toast.error("all fields required");
      return;
    }

    setLoading(true);

    try {
      console.log("Creating reservation with data:", data);
      await api.post("/reservas", data);
      toast.success("reservation send successfully!");
      navigate(-1);
    } catch (error: any) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundFader>
      <div className="absolute top-4 left-4 bg-amber-950/70 text-white p-2 rounded z-10">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      <div className="mt-80 sm:mt-0">
        <form className="max-w-[800px] w-full flex flex-col text-base sm:text-xl gap-4 mx-auto p-2 sm:p-4 mt-4">
          <h2 className="text-2xl font-bold text-center mb-6">Crear Reserva</h2>

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />
          <select
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
          >
            <option value="">Preferencias del espacio (opcional)</option>
            <option value="zona tranquila">Zona tranquila</option>
            <option value="cerca del bar">Cerca del bar</option>
            <option value="zona familiar">Zona familiar</option>
            <option value="terraza">Terraza</option>
            <option value="interior con aire">
              Interior con aire acondicionado
            </option>
            <option value="zona para fumadores">Zona para fumadores</option>
            <option value="área con buena vista">Área con buena vista</option>
            <option value="mesa accesible">
              Mesa accesible (movilidad reducida)
            </option>
            <option value="cumpleaños o celebración">
              Cumpleaños o celebración
            </option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
            min={today}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col flex-1">
              <label className="text-white mb-1">Hora de inicio</label>
              <select
                value={startTime}
                onChange={handleStartTimeChange}
                className="bg-slate-500 p-3 rounded-md text-white"
                required
              >
                <option value="">Seleccione hora</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-white mb-1">Hora de finalización</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-slate-500 p-3 rounded-md text-white"
                required
                disabled={!startTime}
              >
                <option value="">Seleccione hora</option>
                {hours
                  .filter((hour) =>
                    startTime
                      ? hours.indexOf(hour) > hours.indexOf(startTime)
                      : true
                  )
                  .map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <input
            type="text"
            placeholder="ID de mesa"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <select
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          >
            <option value="">Seleccione cantidad</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40+">40+</option>
          </select>

          <textarea
            placeholder="Nota adicional"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white resize-y"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
          >
            {loading ? "Creando..." : "Crear reserva"}
            {loading && (
              <div className="flex justify-center items-center mb-2">
                <span className="loader mr-2"></span>
                <span>Procesando...</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </BackgroundFader>
  );
};

export default CreateReservation;
