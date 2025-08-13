import express from "express";
import { connectDB } from "./src/config/db.js";
import reservasRoutes from "./src/routes/reservasRoutes.js"
import menuRoutes from "./src/routes/menuItemRoutes.js"

import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json({ limit: "5mb" })); // para acceder al res.body

app.use("/api/menu", menuRoutes);
app.use("/api/reservas", reservasRoutes);


app.listen(PORT, () => {
    console.log("server conectado al puerto:",PORT)
})