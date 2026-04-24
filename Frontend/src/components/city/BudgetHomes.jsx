export default function BudgetHomes() {
  const homes = [
    {
      title: "2 BHK Interiors",
      desc: "Smart layouts with functional storage and elegant finishes.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      title: "3 BHK Interiors",
      desc: "Spacious, stylish interiors crafted for modern families.",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    },
    {
      title: "Villa Interiors",
      desc: "Luxury interiors with bespoke designs and premium materials.",
      img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    },
  ];

  return (
    <section className="budget-section">
      <h2>Homes for every budget</h2>

      <div className="budget-grid">
        {homes.map((home, i) => (
          <div className="budget-card" key={i}>
            <div
              className="budget-img"
              style={{ backgroundImage: `url(${home.img})` }}
            />
            <div className="budget-content">
              <h3>{home.title}</h3>
              <p>{home.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        .budget-section {
          padding: 80px 6%;
          background: #ffffff;
        }

        .budget-section h2 {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 40px;
          color: #0f172a;
        }

        .budget-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .budget-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
        }

        .budget-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(239,68,68,0.25);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .budget-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .budget-card:hover::after {
          opacity: 1;
        }

        .budget-img {
          height: 220px;
          background-size: cover;
          background-position: center;
        }

        .budget-content {
          padding: 22px;
        }

        .budget-content h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #111827;
        }

        .budget-content p {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .budget-section h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}
