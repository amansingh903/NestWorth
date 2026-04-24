export default function CityStyles() {
  return (
    <style>{`
      /* ================== GLOBAL RESET ================== */
      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: Inter, system-ui, Arial, sans-serif;
        background: #ffffff;
        color: #1f2937;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      h1 { font-size: 44px; margin-bottom: 12px; }
      h2 { font-size: 32px; margin-bottom: 12px; }
      h3 { font-size: 22px; margin-bottom: 8px; }

      p {
        color: #4b5563;
        line-height: 1.6;
        margin: 0;
      }

      /* ❌ REMOVE HUGE DEFAULT SPACING */
        section { margin: 0; }          /* remove gap */
        section { margin-bottom: 1px; } /* controlled spacing */


      /* ================== HERO ================== */
      .hero {
        position: relative;
        height: 640px;
        background: url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c")
          center / cover no-repeat;
        display: flex;
        align-items: center;
      }

      .hero::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          rgba(15,23,42,.25),
          rgba(15,23,42,.45)
        );
      }

      .hero-inner {
        position: relative;
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 60px;
        color: white;
        z-index: 2;
      }

      .hero h1 {
        font-size: clamp(38px,5vw,56px);
        font-weight: 800;
        letter-spacing: -0.03em;
      }

      /* ================== LEAD FORM ================== */
      .form-box {
        background: rgba(255,255,255,.97);
        backdrop-filter: blur(12px);
        padding: 32px;
        border-radius: 18px;
        box-shadow: 0 30px 80px rgba(0,0,0,.35);
        color: #0f172a;
      }

      .form-box input {
        width: 100%;
        padding: 14px;
        margin-bottom: 14px;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
      }

      /* ================== SECTION HEADER (ONLY SPACING CONTROLLER) ================== */
      .section-header {
        max-width: 1200px;
        margin: 64px auto 32px;
        padding: 0 24px;
      }

      .section-header h2 {
        font-size: clamp(30px, 4vw, 42px);
        font-weight: 800;
        letter-spacing: -0.03em;
        color: #0f172a;
      }

      .section-header h2::after {
        content: "";
        display: block;
        width: 64px;
        height: 4px;
        margin-top: 12px;
        border-radius: 4px;
        background: linear-gradient(90deg,#ef4444,#fb7185);
      }

      .section-header p {
        font-size: 16px;
        color: #64748b;
        margin-top: 12px;
        max-width: 520px;
      }

      /* ================== CARDS ================== */
      .grid-3 {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 28px;
        padding: 0 24px;
        margin-bottom: 40px;
      }

      .card {
        background: white;
        border-radius: 18px;
        padding: 24px;
        box-shadow: 0 14px 36px rgba(0,0,0,.10);
        transition: transform .35s ease, box-shadow .35s ease;
      }

      .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 30px 80px rgba(0,0,0,.18);
      }

      /* ================== REVIEWS ================== */
      .review {
        font-size: 15px;
        line-height: 1.6;
        color: #334155;
      }

      /* ================== FAQ ================== */
      .faq {
        border: 1px solid #e5e7eb;
        padding: 20px;
        border-radius: 14px;
        margin-bottom: 12px;
        transition: box-shadow .3s ease;
      }

      .faq:hover {
        box-shadow: 0 12px 30px rgba(0,0,0,.08);
      }

      /* ================== RESPONSIVE ================== */
      @media (max-width: 900px) {
        .hero-inner { grid-template-columns: 1fr; }
        .grid-3 { grid-template-columns: 1fr; }
        .hero { height: auto; padding: 80px 0; }
      }
    `}</style>
  );
}
