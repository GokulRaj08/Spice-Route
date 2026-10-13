import { useState } from "react";
import { NavLink, Outlet, Route, Routes, Link } from "react-router-dom";
import { useApp } from "./context";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu, { MenuIntro, CategoryMeals, MealDetail } from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

function Layout() {
  const { theme, toggleTheme, cart } = useApp();
  const [open, setOpen] = useState(false);
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const links = [["/", "Home"], ["/about", "About"], ["/menu", "Menu"], ["/reservations", "Reservations"], ["/contact", "Contact"]];
  return (
    <>
      <header className="nav">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>🌶️ Spice Route</Link>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        <nav className={open ? "open" : ""} onClick={() => setOpen(false)}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
          ))}
          <NavLink to="/cart">Cart ({count})</NavLink>
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); toggleTheme(); }} aria-label="Toggle theme">{theme === "light" ? "🌙" : "☀️"}</button>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer className="footer">© 2026 Spice Route · Made with React</footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Menu />}>
          <Route index element={<MenuIntro />} />
          <Route path=":category" element={<CategoryMeals />} />
          <Route path="meal/:id" element={<MealDetail />} />
        </Route>
        <Route path="reservations" element={<Reservations />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<div className="page center"><h1>404</h1><p>Page not found.</p><Link className="btn" to="/">Go home</Link></div>} />
      </Route>
    </Routes>
  );
}
