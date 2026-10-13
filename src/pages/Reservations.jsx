// CRUD with Redux + form validation
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReservation, updateReservation, deleteReservation } from "../store";

const empty = { name: "", phone: "", date: "", guests: 2 };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 3) e.name = "Name must be at least 3 characters";
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (!v.date) e.date = "Choose a date";
  else if (new Date(v.date) < new Date(new Date().toDateString())) e.date = "Date cannot be in the past";
  if (v.guests < 1 || v.guests > 12) e.guests = "Guests must be between 1 and 12";
  return e;
}

export default function Reservations() {
  const list = useSelector((s) => s.reservations);
  const dispatch = useDispatch();
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const data = { ...form, guests: Number(form.guests) };
    dispatch(editId ? updateReservation({ ...data, id: editId }) : addReservation(data));
    setForm(empty);
    setEditId(null);
  };

  const edit = (r) => { setForm({ name: r.name, phone: r.phone, date: r.date, guests: r.guests }); setEditId(r.id); setErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="page">
      <h1>Table Reservations</h1>
      <form className="form" onSubmit={submit} noValidate>
        <h3>{editId ? "Edit Reservation" : "New Reservation"}</h3>
        {[["name", "Full name", "text"], ["phone", "Mobile number", "tel"], ["date", "Date", "date"], ["guests", "Guests", "number"]].map(([n, label, type]) => (
          <label key={n}>{label}
            <input className="input" name={n} type={type} value={form[n]} onChange={change} />
            {errors[n] && <span className="error">{errors[n]}</span>}
          </label>
        ))}
        <div className="row">
          <button className="btn" type="submit">{editId ? "Update" : "Reserve"}</button>
          {editId && <button type="button" className="btn ghost" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
        </div>
      </form>

      <h2>Your Bookings ({list.length})</h2>
      {list.length === 0 && <p className="muted">No reservations yet.</p>}
      <div className="list">
        {list.map((r) => (
          <div className="list-item" key={r.id}>
            <div><strong>{r.name}</strong><br /><small>{r.date} · {r.guests} guests · {r.phone}</small></div>
            <div className="row">
              <button className="btn ghost small" onClick={() => edit(r)}>Edit</button>
              <button className="btn danger small" onClick={() => dispatch(deleteReservation(r.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
