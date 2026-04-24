import { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone) {
      return "All fields are required";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Invalid email address";
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return "Phone number must be 10 digits";
    }
    return "";
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 🔗 replace with your backend endpoint
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      alert("Our designer will contact you soon!");
      setForm({ name: "", email: "", phone: "" });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form">
      <h3>Talk to an Interior Designer</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "SUBMITTING..." : "GET FREE QUOTE"}
      </button>

      <style>{`
        .lead-form {
          width: 360px;
          padding: 28px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          box-shadow:
            0 30px 70px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.5);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .lead-form h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }

        .lead-form input {
          height: 44px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
        }

        .lead-form input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
          outline: none;
        }

        .lead-form button {
          height: 46px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-weight: 700;
          letter-spacing: 0.4px;
          box-shadow: 0 16px 40px rgba(239,68,68,0.4);
          transition: all 0.25s ease;
        }

        .lead-form button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 48px rgba(239,68,68,0.55);
        }

        .lead-form button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error {
          color: #dc2626;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .lead-form {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
