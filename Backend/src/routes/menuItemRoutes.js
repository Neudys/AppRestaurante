import express from "express";
import {
  createMenuItem,
  getAllMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItem);
router.post("/", createMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
