// Redux Toolkit store: reservations CRUD
import { configureStore, createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("reservations") || "[]");

const reservationSlice = createSlice({
  name: "reservations",
  initialState: saved,
  reducers: {
    addReservation: (s, a) => { s.push({ id: Date.now(), ...a.payload }); },
    updateReservation: (s, a) => {
      const i = s.findIndex((r) => r.id === a.payload.id);
      if (i !== -1) s[i] = a.payload;
    },
    deleteReservation: (s, a) => s.filter((r) => r.id !== a.payload),
  },
});

export const { addReservation, updateReservation, deleteReservation } = reservationSlice.actions;

const store = configureStore({ reducer: { reservations: reservationSlice.reducer } });
store.subscribe(() => localStorage.setItem("reservations", JSON.stringify(store.getState().reservations)));
export default store;
