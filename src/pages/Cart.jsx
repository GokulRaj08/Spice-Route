import { Link } from "react-router-dom";
import { useApp } from "../context";

export default function Cart() {
  const { cart, dispatch } = useApp();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="center"><p className="muted">Your cart is empty.</p><Link className="btn" to="/menu">Browse menu</Link></div>
      ) : (
        <>
          <div className="list">
            {cart.map((i) => (
              <div className="list-item" key={i.id}>
                <div><strong>{i.name}</strong><br /><small>₹{i.price} × {i.qty}</small></div>
                <div className="row"><b>₹{i.price * i.qty}</b>
                  <button className="btn danger small" onClick={() => dispatch({ type: "REMOVE", id: i.id })}>Remove</button></div>
              </div>
            ))}
          </div>
          <h3>Total: ₹{total}</h3>
          <div className="row">
            <button className="btn" onClick={() => { alert("Order placed! 🎉"); dispatch({ type: "CLEAR" }); }}>Place Order</button>
            <button className="btn ghost" onClick={() => dispatch({ type: "CLEAR" })}>Clear</button>
          </div>
        </>
      )}
    </div>
  );
}
