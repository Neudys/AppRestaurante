import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imagenBase64: {
      type: String
    },
    category: {
      type: String,
      required: true,
      enum: [
        "todo",
        "principal",
        "ensaladas",
        "comidaRapida",
        "guarniciones",
        "postres",
        "bebidas",
      ],
      default: "todo",
    },
    origin: {
      type: String,
      enum: [
        "todo",
        "dominicana",
        "mexicana",
        "italiana",
        "japonesa",
        "china",
        "india",
        "árabe",
        "francesa",
        "estadounidense",
        "peruana",
        "mediterranea",
      ],
      default: "todo",
    },
    specialty: {
      type: String,
      enum: [
        "todo",
        "tradicional",
        "vegano",
        "vegetariano",
        "sinGluten",
        "sinLactosa",
        "keto",
        "bajoEnCalorias",
      ],
      default: "todo",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const menuItem = mongoose.model("MenuItem", menuItemSchema);

export default menuItem;