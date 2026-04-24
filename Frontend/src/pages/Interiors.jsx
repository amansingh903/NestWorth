import React from "react";

export default function Interiors() {
  return (
    <>
      {/* Embedded Responsive Styles */}
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
        .offer-section,
        .offer-journey {
          padding: 50px 80px;
        }

        .offer-section h2,
        .offer-journey h2 {
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
          transition: transform 0.2s;
        }

        .offer-card:hover {
          transform: translateY(-4px);
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

        /* Journey Steps */
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
          font-size: 18px;
        }

        /* RESPONSIVE STYLES */
        @media (max-width: 900px) {
          .offer-section,
          .offer-journey {
            padding: 40px 40px;
          }

          .offer-hero-overlay {
            padding-left: 30px;
          }

          .offer-hero-overlay h1 {
            font-size: 32px;
          }
        }

        @media (max-width: 600px) {
          .offer-hero-overlay {
            padding-left: 16px;
            padding-right: 16px;
            text-align: center;
            align-items: center;
          }

          .offer-section,
          .offer-journey {
            padding: 30px 20px;
          }

          .offer-hero-overlay h1 {
            font-size: 28px;
          }

          .offer-hero {
            height: 360px;
          }

          .offer-hero-overlay p {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="offer-page">
        {/* HERO */}
        <section className="offer-hero">
          <img
            className="offer-hero-img"
            src="/images/interiors/hero-interior.jpeg"
            alt="Modern Interior Design"
            loading="lazy"
          />
          <div className="offer-hero-overlay">
            <h1>Interior Solutions for Every Home</h1>
            <p>Create beautiful, functional spaces that reflect your lifestyle.</p>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="offer-section">
          <h2>What We Offer</h2>
          <div className="offer-cards">
            {[
              {
                title: "Modular Kitchen",
                img: "/images/interiors/modular-kitchen.jpeg",
                desc: "Experience the perfect blend of beauty and utility with premium modular kitchens designed for Indian homes."
              },
              {
                title: "Wardrobe Designs",
                img: "/images/interiors/modular-kitchen.jpeg",
                desc: "Sliding, hinged or walk-in wardrobes — fully customisable to match your storage needs."
              },
              {
                title: "Living Space Interiors",
                img: "/images/interiors/wardrobe-design.jpeg",
                desc: "Elevate your living room with TV units, bookshelves, wall panels, lighting and more."
              }
            ].map((item, i) => (
              <article className="offer-card" key={i}>
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="offer-journey">
          <h2>Your Interior Journey</h2>
          <div className="journey-steps">
            {[
              { step: "1. Consultation", desc: "Tell us your style, needs and space details." },
              { step: "2. Design & Planning", desc: "We craft a custom layout, materials selection and 3D visuals." },
              { step: "3. Production", desc: "Your modular units are manufactured with precision." },
              { step: "4. Installation", desc: "Our experts assemble and finish everything on-site." }
            ].map((item, i) => (
              <div className="step" key={i}>
                <h4>{item.step}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
