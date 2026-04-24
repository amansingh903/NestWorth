export default function Reviews() {
  const reviews = [
    {
      name: "Daniel",
      city: "Agra",
      text: "Smooth experience from start to finish. The design team understood our needs perfectly.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Rose",
      city: "Delhi",
      text: "Designs matched exactly what we wanted. Very professional execution and quality.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rohit Mehta",
      city: "Jaipur",
      text: "Professional team and timely delivery. The entire process was stress-free.",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <section className="reviews-section">
      <h2>What homeowners say</h2>

      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <img src={r.img} alt={r.name} />
            <p className="review-text">“{r.text}”</p>
            <h4>{r.name}</h4>
            <span>{r.city}</span>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        .reviews-section {
          padding: 90px 6%;
          background: linear-gradient(180deg, #ffffff, #f8fafc);
        }

        .reviews-section h2 {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 50px;
          color: #0f172a;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .review-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 22px;
          padding: 32px 26px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .review-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(239,68,68,0.15),
            rgba(255,255,255,0.2)
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        .review-card:hover::before {
          opacity: 1;
        }

        .review-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 35px 70px rgba(239,68,68,0.25);
        }

        .review-card img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 16px;
          border: 4px solid #ffffff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          position: relative;
          z-index: 1;
        }

        .review-text {
          font-size: 16px;
          color: #334155;
          line-height: 1.7;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }

        .review-card h4 {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }

        .review-card span {
          font-size: 14px;
          color: #64748b;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 640px) {
          .reviews-section h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}
