// src/pages/Signup.jsx
import React, { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    if (!agree) {
      alert("Please agree to the terms");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    alert("Demo signup success");
    setLoading(false);
  };

  return (
    <>
      {/* 🔹 Embedded styles – same as Login page */}
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
          -webkit-backdrop-filter: blur(10px);
          padding: 24px 22px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.5);
        }

        .login-title { margin: 0 0 8px; font-weight: 800; font-size: 28px; }
        .login-sub   { margin: 0 0 18px; opacity: 0.9; font-size: 14px; }

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
        .input::placeholder { color: rgba(255,255,255,0.7); }

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
        .btn + .btn { margin-top: 10px; }

        .link {
          color: #c3e0ff;
          text-decoration: none;
        }
      `}</style>

      {/* Background layer */}
      <div className="auth-bg" />

      {/* Content */}
      <div className="login-wrap">
        <form className="login-card" onSubmit={onSubmit}>
          <h1 className="login-title">Create Account</h1>
          <p className="login-sub">Sign up to start planning your dream home</p>

          <input
            className="input"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <div className="row">
            <label>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />{" "}
              I agree to the terms & conditions
            </label>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p style={{ marginTop: 10, fontSize: 13 }}>
            Already have an account?{" "}
            <a className="link" href="/login">
              Log in
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
