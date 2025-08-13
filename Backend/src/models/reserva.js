import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    persons: {
      type: String,
      required: true,
    },
    preferences: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    table: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const reservation = mongoose.model("reservation", reservationSchema);

export default reservation;
