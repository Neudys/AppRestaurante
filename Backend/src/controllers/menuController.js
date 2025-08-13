import menuItem from "../models/Menu.js";
//archivo notesController.js

export async function getAllMenuItem(req, res) {
  try {
    const menuItems = await menuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.log(`there was an error trying to get all resrvations: ${error}`);
  }
}

export async function createMenuItem(req, res) {
  try {
    const {
      name,
      description,
      price,
      imagenBase64,
      category,
      origin,
      specialty,
      available,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !imagenBase64||
      !category ||
      !origin ||
      !specialty
    )
      return res
        .status(400)
        .json({ message: "Campos obligatorios incompletos." });

    if (price < 0) return res.status(400).json({ message: "precio invalido" });

    const newMenuItem = await menuItem.create({
      name,
      description,
      price,
      imagenBase64,
      category,
      origin,
      specialty,
      available,
    });

    res.status(201).json({ message: "item creado correctamente" });
  } catch (error) {
    console.error("Error al crear el item en el menu: ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteMenuItem(req, res) {
  try {
    const deletedMenuItem = await menuItem.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMenuItem)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
