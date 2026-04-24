import LeadForm from "./LeadForm";

export default function Hero({ city }) {
  return (
    <section className="hero">
      {/* Background image */}
      <div className="hero-bg" />

      {/* Premium gradient overlay */}
      <div className="hero-gradient" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>Interior Designers in {city}</h1>
          <p>
            Transform your home with premium interior solutions crafted for {city}.
          </p>
        </div>

        <LeadForm />
      </div>

      <style>{`
        .hero {
        position: relative;
        height: 720px; /* increased height */
        min-height: 85vh; /* large screens premium feel */
        overflow: hidden;
        }


        /* BACKGROUND IMAGE (PREVIOUS PIC) */
        .hero-bg {
        position: absolute;
        inset: 0;
        background-image: url("/images/hero-house.jpg");
        background-size: cover;
        background-position: center top; /* more vertical detail */
        transform: scale(1.05); /* premium depth */
        z-index: 1;
        }


        /* PREMIUM GRADIENT (CURRENT PIC FEEL) */
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(15,23,42,0.88) 0%,
            rgba(15,23,42,0.75) 35%,
            rgba(15,23,42,0.45) 65%,
            rgba(15,23,42,0.15) 100%
          );
          z-index: 2;
        }

        .hero-content {
        position: relative;
        z-index: 3;
        max-width: 1280px; /* wider */
        height: 100%;
        margin: auto;
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 64px;
        }


        .hero-text {
          max-width: 520px;
        }

        .hero-text h1 {
          font-size: 46px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          line-height: 1.2;
          text-shadow: 0 6px 24px rgba(0,0,0,0.6);
        }

        .hero-text p {
          font-size: 16px;
          color: #e5e7eb;
          line-height: 1.6;
          max-width: 460px;
          text-shadow: 0 3px 14px rgba(0,0,0,0.5);
        }

        @media (max-width: 900px) {
          .hero {
            height: auto;
            padding: 80px 0;
          }

          .hero-content {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-text h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
