// Nested routing: /menu, /menu/:category, /menu/meal/:id
import { NavLink, Outlet, Link, useParams, useSearchParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useFetch } from "../hooks";
import { useApp } from "../context";

const API = "https://www.themealdb.com/api/json/v1/1";
const priceOf = (id) => 150 + (Number(id) % 10) * 20; // demo price in ₹

export default function Menu() {
  const { data, loading, error } = useFetch(`${API}/categories.php`);
  return (
    <div className="page">
      <h1>Our Menu</h1>
      {loading && <p className="muted">Loading categories…</p>}
      {error && <p className="error">Could not load menu: {error}</p>}
      <div className="tabs">
        {data?.categories?.map((c) => (
          <NavLink key={c.idCategory} to={`/menu/${c.strCategory}`}>{c.strCategory}</NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export function MenuIntro() {
  return <p className="lead center">👆 Choose a category to see today's dishes.</p>;
}

export function CategoryMeals() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const inputRef = useRef(null);
  const { dispatch } = useApp();
  const { data, loading, error } = useFetch(`${API}/filter.php?c=${category}`);

  useEffect(() => { inputRef.current?.focus(); }, [category]);

  const meals = (data?.meals || []).filter((m) => m.strMeal.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <input ref={inputRef} className="input" placeholder={`Search in ${category}…`} value={q}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})} />
      {loading && <p className="muted">Loading dishes…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && meals.length === 0 && <p className="muted">No dishes found.</p>}
      <div className="grid">
        {meals.map((m) => (
          <div className="card" key={m.idMeal}>
            <img src={m.strMealThumb} alt={m.strMeal} loading="lazy" />
            <h3>{m.strMeal}</h3>
            <p className="price">₹{priceOf(m.idMeal)}</p>
            <div className="row">
              <Link className="btn ghost small" to={`/menu/meal/${m.idMeal}`}>Details</Link>
              <button className="btn small" onClick={() => dispatch({ type: "ADD", item: { id: m.idMeal, name: m.strMeal, price: priceOf(m.idMeal) } })}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function MealDetail() {
  const { id } = useParams();
  const { dispatch } = useApp();
  const { data, loading, error } = useFetch(`${API}/lookup.php?i=${id}`);
  const meal = data?.meals?.[0];
  if (loading) return <p className="muted">Loading…</p>;
  if (error || !meal) return <p className="error">Dish not found.</p>;
  return (
    <div className="detail">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div>
        <h2>{meal.strMeal}</h2>
        <p><span className="tag">{meal.strCategory}</span> <span className="tag">{meal.strArea}</span></p>
        <p className="price">₹{priceOf(meal.idMeal)}</p>
        <p>{meal.strInstructions.slice(0, 350)}…</p>
        <div className="row">
          <button className="btn" onClick={() => dispatch({ type: "ADD", item: { id: meal.idMeal, name: meal.strMeal, price: priceOf(meal.idMeal) } })}>Add to cart</button>
          <Link className="btn ghost" to={`/menu/${meal.strCategory}`}>← Back</Link>
        </div>
      </div>
    </div>
  );
}
