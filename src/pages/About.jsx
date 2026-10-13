import { useState } from "react";

const team = [
  { name: "Arun Kumar", role: "Head Chef", bio: "20 years of experience in South Indian and fusion cuisine." },
  { name: "Meera Devi", role: "Pastry Chef", bio: "Creates desserts inspired by traditional sweets." },
  { name: "Karthik R", role: "Restaurant Manager", bio: "Makes sure every guest leaves happy." },
];

export default function About() {
  const [open, setOpen] = useState(null);
  return (
    <div className="page">
      <h1>About Us</h1>
      <p className="lead">Spice Route started in 2010 with one idea: great food brings people together. Today we serve guests from every corner of the city with fresh ingredients and warm hospitality.</p>
      <h2>Meet the Team</h2>
      <div className="grid">
        {team.map((t, i) => (
          <div className="card" key={t.name}>
            <div className="big">👨‍🍳</div>
            <h3>{t.name}</h3>
            <small>{t.role}</small>
            {open === i && <p>{t.bio}</p>}
            <button className="btn small" onClick={() => setOpen(open === i ? null : i)}>{open === i ? "Hide" : "Read bio"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
