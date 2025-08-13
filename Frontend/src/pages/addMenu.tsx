import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import BackgroundFader from "../components/Homepage/BackgroundFader";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [category, setCategory] = useState("principal");
  const [origin, setOrigin] = useState("dominicana");
  const [specialty, setSpecialty] = useState("tradicional");
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const navigate = useNavigate();

  const resizeImage = (
    file: File,
    maxWidth = 600,
    maxHeight = 600
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              reject(new Error("No se pudo redimensionar la imagen"));
            }
          }, file.type);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !price.trim() || !imagen) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      // Redimensiona la imagen antes de convertirla
      const resizedImage = await resizeImage(imagen);
      const imagenBase64 = await convertToBase64(resizedImage);

      await api.post("/menu", {
        name,
        description,
        price: parseFloat(price),
        imagenBase64,
        category,
        origin,
        specialty,
      });

      toast.success("Item agregado al menú");
      navigate("/menu");

      // Reiniciar
      setName("");
      setDescription("");
      setPrice("");
      setImagen(null);
      setCategory("principal");
      setOrigin("dominicana");
      setSpecialty("tradicional");
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el item");
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
      <div className="">
        <form className="max-w-[800px] w-full flex flex-col text-base sm:text-xl gap-4 mx-auto p-2 sm:p-4 mt-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Agregar Item al Menú
          </h2>

          <input
            type="text"
            placeholder="Nombre del plato"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <input
            type="file"
            onChange={(e) => setImagen(e.target.files?.[0] || null)}
            accept="image/*"
            className="bg-slate-500 p-3 rounded-md text-white"
            required
          />

          <div className="max-h-48 overflow-y-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-500 p-3 rounded-md text-white w-full"
            >
              <option value="principal">Plato principal</option>
              <option value="ensaladas">Ensaladas / aperitivos</option>
              <option value="comidaRapida">Comida rápida</option>
              <option value="guarniciones">Guarniciones</option>
              <option value="postres">Postres</option>
              <option value="bebidas">Bebidas</option>
            </select>
          </div>

          <div className="max-h-48 overflow-y-auto">
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-slate-500 p-3 rounded-md text-white w-full"
            >
              <option value="dominicana">Dominicana</option>
              <option value="mexicana">Mexicana</option>
              <option value="italiana">Italiana</option>
              <option value="japonesa">Japonesa</option>
              <option value="china">China</option>
              <option value="peruana">Peruana</option>
            </select>
          </div>

          <div className="max-h-48 overflow-y-auto">
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="bg-slate-500 p-3 rounded-md text-white w-full"
            >
              <option value="tradicional">Tradicional</option>
              <option value="vegano">Vegano</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="sinGluten">Sin gluten</option>
              <option value="sinLactosa">Sin lactosa</option>
              <option value="keto">Keto</option>
              <option value="bajoEnCalorias">Bajo en calorías</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
            onClick={handleSubmit}
          >
            {loading ? "Agregando..." : "Agregar al menú"}
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

export default AddMenuItem;
