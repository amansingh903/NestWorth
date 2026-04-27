// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <>
      {/* Embedded Footer CSS */}
      <style>{`
        :root {
          --foot-bg: #1a1a1d;        /* Premium dark grey */
          --text-white: #ffffff;     /* Pure white */
          --text-light: rgba(255,255,255,0.85);
          --tile-bg: rgba(255,255,255,0.10); /* Soft glass effect */
        }

        .foot {
          background: var(--foot-bg);
          color: var(--text-white);
          margin-top: 32px;
          font-family: Inter, system-ui, sans-serif;
        }

        /* --- MAIN GRID --- */
        .foot-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px;
          display: grid;
          grid-template-columns: 2fr repeat(4, 1fr);
          gap: 36px;
        }

        /* --- Footer Logo --- */
        .foot img {
          height: 42px;
          margin-bottom: 12px;
        }

        /* --- Titles --- */
        .foot h4 {
          margin-bottom: 14px;
          font-size: 15px;
          color: var(--text-white);
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        /* --- Links --- */
        .foot a {
          display: block;
          text-decoration: none;
          color: var(--text-light);
          margin: 6px 0;
          font-size: 14px;
          transition: opacity 0.2s, color 0.2s;
        }

        .foot a:hover {
          color: var(--text-white);
          opacity: 1;
        }

        /* --- App Store Buttons --- */
        .foot .apps a {
          display: inline-flex;
          align-items: center;
          background: var(--tile-bg);
          padding: 10px 12px;
          border-radius: 8px;
          margin-right: 10px;
          margin-top: 8px;
        }

        /* --- Bottom Bar --- */
        .foot-bottom {
          border-top: 1px solid rgba(255,255,255,0.12);
          text-align: center;
          padding: 14px;
          font-size: 13px;
          color: var(--text-light);
        }

        /* --- Responsive Footer --- */
        @media (max-width: 900px) {
          .foot-inner {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .foot-inner {
            grid-template-columns: 1fr;
          }
        }

        /* Force white text everywhere when using .footer class (kept for compatibility) */
        .footer,
        .footer a,
        .footer p,
        .footer h3,
        .footer span,
        .footer li {
          color: #ffffff !important;
        }
      `}</style>

      <footer className="foot">
        <div className="foot-inner">
          <div className="foot-brand">
            <img src="/logo.png" alt="NestWorth" className="footer-logo" />
            <p>
              NestWorth helps you plan, design and build beautiful interiors with
              transparent pricing.
            </p>
            <div className="apps">
              <a href="#" aria-label="Google Play">
                📱 Google Play
              </a>
              <a href="#" aria-label="App Store">
                 App Store
              </a>
            </div>
          </div>

          <div>
            <h4>Offerings</h4>
            <a href="#interiors">Interiors</a>
            <a href="#furnish">Furnishings</a>
          </div>

          <div>
            <h4>Get Inspired</h4>
            <a href="#ideas">Design Ideas</a>
            <a href="#journey">The Modular Journey</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#about">About us</a>
            <a href="#contact">Contact us</a>
            <a href="#policies">Policies</a>
            <a href="#terms">Terms &amp; conditions</a>
          </div>

          <div>
            <h4>Contact</h4>
            <p>
              Call us
              <br />
              1800-000-000
            </p>
            <p>
              Email us
              <br />
              care@NestWorth.com
            </p>
          </div>
        </div>
        <div className="foot-bottom">
          © 2025 NestWorth. All rights reserved.
        </div>
      </footer>
    </>
  );
}
