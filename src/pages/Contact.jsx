import { useRef, useState } from "react";

export default function Contact() {
  const [v, setV] = useState({ email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const emailRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(v.email)) errs.email = "Enter a valid email";
    if (v.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length) { if (errs.email) emailRef.current.focus(); return; }
    setSent(true);
    setV({ email: "", message: "" });
  };

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <div className="grid two">
        <div className="card">
          <h3>Visit us</h3>
          <p>📍 12 Temple Street, Tiruvannamalai, Tamil Nadu</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hello@spiceroute.example</p>
          <p>🕒 Daily 11:00 AM – 11:00 PM</p>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          {sent && <p className="success">Thanks! We'll get back to you soon.</p>}
          <label>Email
            <input ref={emailRef} className="input" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>Message
            <textarea className="input" rows="4" value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} />
            {errors.message && <span className="error">{errors.message}</span>}
          </label>
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
