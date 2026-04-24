import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* ⬇ CSS INSIDE JSX ⬇ */}
      <style>{`
        :root{
          --ink:#0f172a;
          --muted:#475569;
          --ring:#d9dee5;
          --brand:#ef4444;
          --card:#fafafa;
          --bg:#f3f4f6;
        }

        .home{ background:var(--bg); color:var(--ink); }

        /* HERO */
        .hero{
          position:relative;
          min-height:62vh;
          display:grid;
          place-items:center;
          overflow:hidden;
        }
        .hero-bg{
          position:absolute; inset:0;
          width:100%; height:100%;
          object-fit:cover;
        }
        .hero-overlay{
          position:absolute; inset:0;
          background:linear-gradient(180deg,rgba(0,0,0,.38),rgba(0,0,0,.58));
        }
        .hero-inner{
          position:relative; z-index:1;
          text-align:center; color:#fff;
          padding:48px 16px;
          text-shadow:0 2px 16px rgba(0,0,0,.35);
        }
        .hero-inner h1{
          font-size:clamp(28px,4.5vw,56px);
          margin:0 0 8px; line-height:1.05;
        }
        .hero-inner p{ opacity:.92; margin:0 0 18px; }

        .cta{
          display:inline-block;
          padding:12px 18px;
          border-radius:999px;
          background:var(--brand);
          color:#fff;
          font-weight:700;
          text-decoration:none;
          box-shadow:0 8px 18px rgba(239,68,68,.25);
          transition:transform .18s,box-shadow .18s;
        }
        .cta:hover{
          transform:translateY(-1px);
          box-shadow:0 10px 22px rgba(239,68,68,.30);
        }
        .cta.ghost{
          background:#fff;
          color:var(--ink);
          border:1px solid var(--ring);
        }

        /* STEPS */
        .steps{ max-width:1200px; margin:40px auto; padding:0 16px; }
        .steps h2{ text-align:center; margin-bottom:18px; }
        .steps-grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:16px;
        }
        .step{
          background:var(--card);
          border:1px solid var(--ring);
          border-radius:16px;
          padding:18px;
          text-align:center;
          box-shadow:0 6px 18px rgba(0,0,0,.06);
          transition:transform .18s,box-shadow .18s;
        }
        .step:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 22px rgba(0,0,0,.10);
        }

        /* ESTIMATES */
        .estimates{ max-width:1200px; margin:40px auto; padding:0 16px; }
        .title-row{
          display:flex; justify-content:space-between; align-items:center;
          gap:16px; margin-bottom:14px;
        }
        .cards{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:18px;
        }
        .card{
          background:var(--card);
          border:1px solid var(--ring);
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 6px 18px rgba(0,0,0,.06);
          transition:transform .18s,box-shadow .18s;
        }
        .card:hover{
          transform:translateY(-2px);
          box-shadow:0 12px 24px rgba(0,0,0,.12);
        }
        .card img{ width:100%; height:220px; object-fit:cover; display:block; }
        .card-body{ padding:14px; color:var(--muted); }
        .card-body h4{ margin:0 0 6px; color:var(--ink); }

        /* EXPLAINER */
        .explainer{ max-width:1200px; margin:40px auto; padding:0 16px; text-align:center; }
        .exp-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:18px; margin:16px 0 24px;
        }
        .exp-grid>div{
          background:var(--card);
          border:1px solid var(--ring);
          border-radius:14px;
          padding:16px;
          box-shadow:0 6px 18px rgba(0,0,0,.06);
        }

        /* REVIEWS SECTION */
        .reviews{
          max-width:1200px;
          margin:40px auto;
          padding:0 16px 8px;
        }
        .reviews-header{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom:20px;
        }
        .reviews-header h2{
          font-size:30px;
          letter-spacing:.02em;
        }
        .reviews-viewmore{
          font-size:14px;
          font-weight:600;
          color:#ef4444;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:6px;
        }

        .review-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
        }
        .review-card{
          background:#fff;
          border-radius:24px;
          box-shadow:0 18px 40px rgba(15,23,42,.10);
          border:1px solid #e5e7eb;
          overflow:hidden;
          position:relative;
        }
        .review-card::before,
        .review-card::after{
          content:"“";
          position:absolute;
          font-size:46px;
          color:rgba(148,163,184,0.25);
        }
        .review-card::before{
          top:4px; left:10px;
        }
        .review-card::after{
          content:"”";
          bottom:6px; right:12px;
        }

        .review-media{
          position:relative;
          border-radius:18px;
          overflow:hidden;
          margin:18px 18px 0;
        }
        .review-media img{
          width:100%;
          height:210px;
          object-fit:cover;
          display:block;
        }
        .review-overlay{
          position:absolute;
          inset:0;
          background:linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.75));
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          padding:16px;
          color:#fff;
        }
        .review-play{
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%, -50%);
          width:54px;
          height:54px;
          border-radius:999px;
          background:rgba(255,255,255,0.92);
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 10px 28px rgba(15,23,42,.35);
          font-size:20px;
        }
        .review-names{
          font-weight:700;
          font-size:15px;
        }
        .review-city{
          font-size:13px;
          opacity:.9;
        }
        .review-text{
          padding:16px 26px 20px;
          font-size:15px;
          color:#4b5563;
          text-align:center;
          font-style:italic;
        }

        /* FAQ */
        .faq{ max-width:900px; margin:40px auto 24px; padding:0 16px; }
        .faq h2{ margin-bottom:12px; }
        .faq details{
          background:var(--card);
          border:1px solid var(--ring);
          border-radius:12px;
          padding:12px 16px;
          margin-bottom:10px;
          box-shadow:0 4px 12px rgba(0,0,0,.05);
        }
        .faq summary{
          font-weight:700;
          cursor:pointer;
          color:var(--ink);
        }

        /* ABOUT / CLOSING SECTION */
        .about-section{
          max-width:900px;
          margin:0 auto 56px;
          padding:0 16px 10px;
          color:#1f2933;
        }
        .about-section h2{
          font-size:24px;
          margin-bottom:10px;
        }
        .about-section p{
          margin-bottom:8px;
          color:#4b5563;
          line-height:1.5;
        }
        .about-highlights{
          margin-top:8px;
          padding-left:18px;
          color:#4b5563;
        }
        .about-highlights li{
          margin:4px 0;
        }

        @media (max-width: 1000px){
          .steps-grid{ grid-template-columns:1fr 1fr; }
          .cards{ grid-template-columns:1fr; }
          .exp-grid{ grid-template-columns:1fr; }
          .review-grid{ grid-template-columns:1fr; }
        }
      `}</style>
      {/* ⬆ END CSS ⬆ */}

      {/* JSX MARKUP STARTS */}
      <div className="home">

        {/* HERO */}
        <section className="hero">
          <img className="hero-bg" src="/images/hero/hero-bg.jpg" alt="" />
          <div className="hero-overlay" />
          <div className="hero-inner">
            <h1>Curious about your dream home price?</h1>
            <p>Get an accurate estimate based on size, location and key home details.</p>
            <a className="cta" href="#price-calculators">Get Started</a>
          </div>
        </section>

        {/* STEPS */}
        <section className="steps" id="price-calculators">
          <h2>Estimate your home value in 4 easy steps</h2>

          <div className="steps-grid">
            <div className="step">
              <img src="/images/illustrations/illus-bhk.svg" alt="" />
              <h3>Select home type</h3>
              <p>Choose whether your property is 1/2/3 BHK or an independent house.</p>
            </div>

            <div className="step">
              <img src="/images/illustrations/illus-size.svg" alt="" />
              <h3>Enter property size</h3>
              <p>Provide approximate built-up or carpet area for fair valuation.</p>
            </div>

            <div className="step">
              <img src="/images/illustrations/illus-rooms.svg" alt="" />
              <h3>Choose key features</h3>
              <p>Mention floor, age of the property, amenities and other parameters.</p>
            </div>

            <div className="step">
              <img src="/images/illustrations/illus-package.svg" alt="" />
              <h3>Get price estimate</h3>
              <p>Our model evaluates the data and predicts an accurate market value.</p>
            </div>
          </div>
        </section>

        {/* ESTIMATES */}
        <section className="estimates">
          <div className="title-row">
            <h2>Estimates for every type of home</h2>
            <Link className="cta ghost" to="/price-calculator">Check Now</Link>
          </div>

          <div className="cards">
            {[
              {
                title: "2 BHK",
                desc: "Get a realistic market price for a typical 2 BHK apartment in your city.",
                img: "/images/estimates/bhk-2.jpeg"
              },
              {
                title: "1 BHK",
                desc: "Find out how size, location and amenities affect 1 BHK home pricing.",
                img: "/images/estimates/bhk-1.jpeg"
              },
              {
                title: "3 BHK",
                desc: "Get accurate valuation for spacious homes based on current trends.",
                img: "/images/estimates/bhk-3.jpeg"
              }
            ].map((c, i) => (
              <article key={i} className="card">
                <img src={c.img} alt="" />
                <div className="card-body">
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EXPLAINER */}
        <section className="explainer">
          <h2>How does our home price estimator work?</h2>

          <div className="exp-grid">
            <div>
              <h3>Home type</h3>
              <p>Our model identifies property category and structures valuation rules accordingly.</p>
            </div>
            <div>
              <h3>Size & area</h3>
              <p>Price per sq. ft. is calculated using location trends and property age.</p>
            </div>
            <div>
              <h3>Key features</h3>
              <p>Amenities, floor level, connectivity and more help refine the final estimate.</p>
            </div>
          </div>

          <Link className="cta" to="/price-calculator">Calculate Now</Link>
        </section>

        {/* ⭐ CUSTOMER REVIEWS (above FAQ) */}
        <section className="reviews">
          <div className="reviews-header">
            <h2>Check out some of our customer reviews</h2>
            <a href="#more-reviews" className="reviews-viewmore">
              View More <span>›</span>
            </a>
          </div>

          <div className="review-grid">
            {/* Card 1 – use same image as 2 BHK card (works already) */}
            <article className="review-card">
              <div className="review-media">
                <img
                  src="/images/reviews/review-rohit.jpeg"
                  alt="Rohit & Shveta in their HomeAura kitchen"
                />
                <div className="review-overlay">
                  <div className="review-play">▶</div>
                  <div className="review-names">Rohit & Shveta</div>
                  <div className="review-city">Gurugram</div>
                </div>
              </div>
              <p className="review-text">
                “HomeAura’s team was super organised and transparent. Our 3 BHK
                interiors were completed ahead of the move-in date.”
              </p>
            </article>

            {/* Card 2 – this one was already working, keep as is */}
            <article className="review-card">
              <div className="review-media">
                <img
                  src="/images/reviews/review-swati.jpeg"
                  alt="Swati & Gaurav in their living room"
                />
                <div className="review-overlay">
                  <div className="review-play">▶</div>
                  <div className="review-names">Swati & Gaurav</div>
                  <div className="review-city">Bangalore</div>
                </div>
              </div>
              <p className="review-text">
                “The price estimator gave us clarity on budget and the designers
                helped us stick to it without compromising on look.”
              </p>
            </article>

            {/* Card 3 – use same image as 3 BHK card (works already) */}
            <article className="review-card">
              <div className="review-media">
                <img
                    src="/images/reviews/review-puja.jpeg"
                  alt="Puja Bhatia in her HomeAura bedroom"
                />
                <div className="review-overlay">
                  <div className="review-play">▶</div>
                  <div className="review-names">Puja Bhatia</div>
                  <div className="review-city">Mumbai</div>
                </div>
              </div>
              <p className="review-text">
                “From first call to final handover, HomeAura kept us updated on
                costs, timelines and materials. The result feels premium and homely.”
              </p>
            </article>
          </div>
        </section>


        {/* FAQ */}
        <section className="faq">
          <h2>FAQs</h2>

          {[
            ["Will the estimate change based on location?", "Yes. Market prices vary widely across cities and neighborhoods."],
            ["Does it use house size and features?", "Yes. The more details you provide, the more accurate the prediction."],
            ["Can I estimate for an under-construction property?", "Yes. Our system factors in project status and expected completion timelines."],
            ["Is the predicted price accurate?", "It’s a strong approximation based on real market data and trained ML models."]
          ].map(([q, a], i) => (
            <details key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>

        {/* 🔻 ABOUT / DESCRIPTION (below FAQ) */}
        <section className="about-section" id="more-reviews">
          <h2>Why homeowners love HomeAura</h2>
          <p>
            HomeAura combines intelligent price prediction with end-to-end interior
            design services. You get a realistic budget for your home, and a team
            that actually delivers within that budget.
          </p>
          <p>
            Our platform uses city trends, home size and key features to estimate a
            fair price band. Once you’re ready, our designers step in to convert
            that number into a detailed plan, 3D designs and a clear execution
            schedule.
          </p>
          <ul className="about-highlights">
            <li>Transparent costing with no hidden “site surprises”.</li>
            <li>Designs tailored to Indian homes, storage needs and lifestyle.</li>
            <li>Single team for design, manufacturing and on-site installation.</li>
          </ul>
        </section>

      </div>
    </>
  );
}