export default function ProcessSteps() {
  const steps = [
    {
      title: "We Design",
      desc: "Personalised designs crafted to your lifestyle.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      title: "We Curate",
      desc: "Furniture, lighting & decor from premium brands.",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    },
    {
      title: "We Deliver",
      desc: "End-to-end execution with on-time delivery.",
      img: "https://images.unsplash.com/photo-1582582621959-48d27397dc69",
    },
  ];

  return (
    <section className="process-section">
      <h2>Making Home Interiors Easy</h2>

      <div className="process-grid">
        {steps.map((s, i) => (
          <div className="process-card" key={i}>
            <div className="process-image">
              <img src={s.img} alt={s.title} />
            </div>

            <div className="process-content">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .process-section {
          padding: 90px 6%;
          background: #ffffff;
        }

        .process-section h2 {
          font-size: 38px;
          font-weight: 800;
          margin-bottom: 50px;
          color: #0f172a;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 36px;
        }

        .process-card {
          background: #ffffff;
          border-radius: 26px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
          transition: all 0.45s cubic-bezier(.22,.61,.36,1);
          position: relative;
        }

        .process-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(239,68,68,0.18),
            rgba(255,255,255,0.4)
          );
          opacity: 0;
          transition: opacity 0.45s ease;
        }

        .process-card:hover::after {
          opacity: 1;
        }

        .process-card:hover {
          transform: translateY(-14px) scale(1.03);
          box-shadow: 0 40px 80px rgba(239,68,68,0.25);
        }

        .process-image {
          width: 100%;
          height: 220px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .process-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .process-card:hover img {
          transform: scale(1.08);
        }

        .process-content {
          padding: 28px 26px 34px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-grow: 1;
          position: relative;
          z-index: 1;
        }

        .process-content h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #0f172a;
        }

        .process-content p {
          font-size: 16px;
          line-height: 1.6;
          color: #475569;
        }

        @media (max-width: 640px) {
          .process-section h2 {
            font-size: 30px;
          }

          .process-image {
            height: 200px;
          }
        }
      `}</style>
    </section>
  );
}
