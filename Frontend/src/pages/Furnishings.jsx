// src/pages/Furnishings.jsx
import React from "react";

export default function Furnishings() {
  return (
    <>
      {/* Scoped styles – same layout as Interiors */}
      <style>{`
        .offer-page {
          background: #0b0f14;
          color: #eaf1ff;
          min-height: 100vh;
        }

        /* HERO SECTION */
        .offer-hero {
          position: relative;
          height: 420px;
          overflow: hidden;
          border-bottom: 1px solid #1c2635;
        }

        .offer-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }

        .offer-hero-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 80px;
        }

        .offer-hero-overlay h1 {
          font-size: 40px;
          margin: 0 0 10px;
        }

        .offer-hero-overlay p {
          color: #cfd8ea;
          font-size: 18px;
        }

        /* MAIN SECTIONS */
        .offer-section {
          padding: 50px 80px;
        }

        .offer-section h2 {
          font-size: 28px;
          margin-bottom: 26px;
        }

        /* Cards */
        .offer-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 26px;
        }

        .offer-card {
          background: #111820;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #233044;
          box-shadow: 0 0 20px rgba(0,0,0,0.25);
        }

        .offer-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .offer-card .card-body {
          padding: 16px;
        }

        .offer-card h3 {
          margin-top: 0;
          font-size: 20px;
        }

        .offer-card p {
          margin-top: 6px;
          color: #adb9cd;
        }

        /* JOURNEY SECTION */
        .offer-journey {
          padding: 50px 80px;
        }

        .journey-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 26px;
          margin-top: 26px;
        }

        .step {
          background: #111820;
          border: 1px solid #233044;
          padding: 18px;
          border-radius: 12px;
        }

        .step h4 {
          margin: 0 0 10px;
        }

        /* Responsive tweaks */
        @media (max-width: 900px) {
          .offer-hero-overlay {
            padding-left: 40px;
          }

          .offer-section,
          .offer-journey {
            padding: 40px 32px;
          }
        }

        @media (max-width: 600px) {
          .offer-hero {
            height: 340px;
          }

          .offer-hero-overlay {
            padding-left: 20px;
          }

          .offer-hero-overlay h1 {
            font-size: 28px;
          }

          .offer-hero-overlay p {
            font-size: 15px;
          }

          .offer-section,
          .offer-journey {
            padding: 32px 18px;
          }
        }
      `}</style>

      <div className="offer-page">
        {/* HERO */}
        <section className="offer-hero">
        <img
          className="offer-hero-img"
          src="/images/furnishings/hero-furnishings.jpeg"
          alt="Home furnishings"
        />

          <div className="offer-hero-overlay">
            <h1>Furnishings & Decor</h1>
            <p>
              Sofas, curtains, rugs and more — finish your home with warm, cozy
              furnishings.
            </p>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="offer-section">
          <h2>What We Offer</h2>

          <div className="offer-cards">
            <article className="offer-card">
            <img src="/images/furnishings/living-room.jpeg" alt="" />
              <div className="card-body">
                <h3>Living Room Furnishings</h3>
                <p>
                  Sofas, coffee tables, cushions and accent chairs designed to
                  match your interiors.
                </p>
              </div>
            </article>

            <article className="offer-card">
              <img src="/images/furnishings/bedroom-upholstery.jpeg" alt="" />
              <div className="card-body">
                <h3>Bedroom & Upholstery</h3>
                <p>
                  Beds, headboards, mattresses and soft furnishings for a
                  restful sleep.
                </p>
              </div>
            </article>

            <article className="offer-card">
              <img src="/images/furnishings/curtains-accessories.jpeg" alt="" />
              <div className="card-body">
                <h3>Curtains & Accessories</h3>
                <p>
                  Custom curtains, blinds, carpets and decor pieces that tie
                  everything together.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="offer-journey">
          <h2>Your Furnishings Journey</h2>

          <div className="journey-steps">
            <div className="step">
              <h4>1. Style Discovery</h4>
              <p>Share your moodboard, colors and lifestyle preferences.</p>
            </div>

            <div className="step">
              <h4>2. Curation</h4>
              <p>
                We shortlist furniture, fabrics and decor that match your budget
                and taste.
              </p>
            </div>

            <div className="step">
              <h4>3. Ordering</h4>
              <p>
                All items are ordered and quality checked by our team before
                delivery.
              </p>
            </div>

            <div className="step">
              <h4>4. Styling Day</h4>
              <p>Our experts set up and style the complete space for you.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
