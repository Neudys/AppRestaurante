import reservation from "../models/reserva.js";
// controladores

export async function getAllNReservations(req, res) {
  try {
    const reservations = await reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.log(`there was an error trying to get all resrvations: ${error}`);
  }
}

export async function createReservations(req, res) {
  try {
    const {
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
    } = req.body;

    if (
      !name ||
      !lastName ||
      !email ||
      !date ||
      !startTime ||
      !endTime ||
      !persons ||
      !table ||
      !preferences
    ) {
      return res
        .status(400)
        .json({ message: "Campos obligatorios incompletos." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido." });
    }

    // Validar cantidad mínima de personas
    if (persons < 1) {
      return res
        .status(400)
        .json({ message: "Debe haber al menos 1 persona." });
    }

    if (startTime >= endTime) {
      return res
        .status(400)
        .json({ message: "La hora de inicio debe ser anterior a la de fin." });
    }

    // Validar que la fecha no sea pasada
    const today = new Date();
    const inputDate = new Date(date);
    if (inputDate < today.setHours(0, 0, 0, 0)) {
      return res
        .status(400)
        .json({ message: "No puedes hacer reservas para fechas pasadas." });
    }

    // TODO: Agregar validación de límite de reservas por día y reservas duplicadas

    // Crear reserva
    const newReservation = await reservation.create({
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
    });

    res
      .status(201)
      .json({ message: "Reserva creada correctamente", data: newReservation });
  } catch (error) {
    console.error("Error al crear la reserva: ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteReservations(req, res) {
  try {
    const deletedReservation = await reservation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
