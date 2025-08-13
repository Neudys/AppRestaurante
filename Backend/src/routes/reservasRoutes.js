import express from "express";
import {
  createReservations,
  deleteReservations,
  getAllNReservations,
} from "../controllers/reservasController.js";

const router = express.Router();

router.get("/", getAllNReservations);
router.post("/", createReservations);
router.delete("/:id", deleteReservations);

export default router;
