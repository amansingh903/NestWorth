// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token
      if (remember) {
        localStorage.setItem("adminToken", data.token);
      } else {
        sessionStorage.setItem("adminToken", data.token);
      }

      // ✅ Redirect to admin leads
      navigate("/admin/leads");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Embedded Login CSS */}
      <style>{`
        .auth-bg {
          position: fixed;
          inset: 0;
          background: url("/images/hero/hero-bg.jpg") center center / cover no-repeat fixed;
          z-index: 0;
        }
        .auth-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }
        .login-wrap {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          position: relative;
          z-index: 1;
        }
        .login-card {
          width: min(460px, 92vw);
          color: #fff;
          background: rgba(0, 0, 0, 0.40);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          padding: 24px 22px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.5);
        }
        .login-title {
          margin: 0 0 8px;
          font-weight: 800;
          font-size: 28px;
        }
        .login-sub {
          margin: 0 0 18px;
          opacity: 0.9;
          font-size: 14px;
        }
        .input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          color: #fff;
          outline: none;
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0 14px;
          font-size: 13px;
        }
        .btn {
          width: 100%;
          padding: 12px;
          font-weight: 700;
          border-radius: 10px;
          border: none;
          background: #111827;
          color: #fff;
          cursor: pointer;
        }
        .error {
          background: rgba(239,68,68,0.2);
          border: 1px solid rgba(239,68,68,0.5);
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 10px;
        }
      `}</style>

      <div className="auth-bg" />

      <div className="login-wrap">
        <form className="login-card" onSubmit={onSubmit}>
          <h1 className="login-title">Admin Login</h1>
          <p className="login-sub">
            Sign in to manage leads and enquiries
          </p>

          {error && <div className="error">{error}</div>}

          <input
            className="input"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="row">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              Remember me
            </label>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>
      </div>
    </>
  );
}
