import { Link } from "react-router-dom";

function Feature({ icon, title, text }) {
  return <div className="card"><div className="big">{icon}</div><h3>{title}</h3><p>{text}</p></div>;
}

export default function Home() {
  const features = [
    { icon: "🍛", title: "Authentic Recipes", text: "Dishes from around the world, cooked fresh daily." },
    { icon: "🚚", title: "Fast Service", text: "Hot food at your table in minutes." },
    { icon: "📅", title: "Easy Booking", text: "Reserve a table in under a minute." },
  ];
  return (
    <div className="page">
      <section className="hero">
        <h1>Taste the world,<br />one plate at a time.</h1>
        <p>Explore our live menu, add favourites to your cart and book your table online.</p>
        <div className="row">
          <Link className="btn" to="/menu">View Menu</Link>
          <Link className="btn ghost" to="/reservations">Book a Table</Link>
        </div>
      </section>
      <section className="grid">
        {features.map((f) => <Feature key={f.title} {...f} />)}
      </section>
    </div>
  );
}
