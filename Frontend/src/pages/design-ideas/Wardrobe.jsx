// src/pages/design-ideas/Wardrobe.jsx
import React, { useMemo, useState } from "react";

export default function Wardrobe() {
  const FILTERS = [
    "All",
    "Sliding Wardrobes",
    "Hinged Wardrobes",
    "Walk-in Wardrobes",
    "2-Door",
    "3-Door+",
  ];

  const CARDS = [
    {
      id: 1,
      title: "Sliding Wardrobe with Mirror & Loft Storage",
      size: "Size: 6 ft wide",
      city: "Delhi",
      tags: ["Sliding Wardrobes", "3-Door+"],
      img: "https://images.pexels.com/photos/6585762/pexels-photo-6585762.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 2,
      title: "Compact 2-Door Hinged Wardrobe in Ivory Finish",
      size: "Size: 4 ft wide",
      city: "Bangalore",
      tags: ["Hinged Wardrobes", "2-Door"],
      img: "https://images.pexels.com/photos/6585763/pexels-photo-6585763.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 3,
      title: "Walk-in Wardrobe with Open Shelves & Drawers",
      size: "Size: 8 x 10 ft",
      city: "Mumbai",
      tags: ["Walk-in Wardrobes", "3-Door+"],
      img: "https://images.pexels.com/photos/3735917/pexels-photo-3735917.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 4,
      title: "Sliding Wardrobe with Wooden & Glass Shutters",
      size: "Size: 7 ft wide",
      city: "Hyderabad",
      tags: ["Sliding Wardrobes", "3-Door+"],
      img: "https://images.pexels.com/photos/7061448/pexels-photo-7061448.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 5,
      title: "2-Door Wardrobe with Internal Dresser",
      size: "Size: 5 ft wide",
      city: "Pune",
      tags: ["Hinged Wardrobes", "2-Door"],
      img: "https://images.pexels.com/photos/3965534/pexels-photo-3965534.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 6,
      title: "Corner Wardrobe for Small Bedrooms",
      size: "Size: 6 x 6 ft corner",
      city: "Gurugram",
      tags: ["Hinged Wardrobes", "3-Door+"],
      img: "https://images.pexels.com/photos/6585767/pexels-photo-6585767.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const visibleCards = useMemo(
    () =>
      activeFilter === "All"
        ? CARDS
        : CARDS.filter((c) => c.tags.includes(activeFilter)),
    [activeFilter]
  );

  return (
    <>
      <style>{`
        :root{
          --ink:#0f172a;
          --muted:#6b7280;
          --ring:#e5e7eb;
          --bg:#f3f4f6;
          --card:#ffffff;
          --brand:#ef4444;
          --chip-bg:#f9fafb;
        }

        .wd-page{
          background:var(--bg);
          color:var(--ink);
          min-height:100vh;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        }

        .wd-hero{
          border-bottom:1px solid var(--ring);
          background:#ffffff;
        }
        .wd-hero-inner{
          max-width:1200px;
          margin:0 auto;
          padding:24px 18px 18px;
        }
        .wd-breadcrumb{
          font-size:12px;
          color:#9ca3af;
          margin-bottom:8px;
        }
        .wd-hero-inner h1{
          margin:0 0 8px;
          font-size:clamp(26px,3vw,34px);
          letter-spacing:.02em;
        }
        .wd-hero-inner p{
          margin:0;
          color:var(--muted);
        }

        /* Lead hero card */
        .wd-lead-wrap{
          max-width:1200px;
          margin:20px auto 0;
          padding:0 18px;
        }
        .wd-lead{
          background:#433253;
          border-radius:26px;
          overflow:hidden;
          display:flex;
          box-shadow:0 22px 50px rgba(15,23,42,.28);
        }
        .wd-lead-img{
          flex:1.1;
          min-height:260px;
          background-size:cover;
          background-position:center;
        }
        .wd-lead-card{
          flex:1;
          padding:26px 28px 24px;
          display:flex;
          flex-direction:column;
          gap:12px;
          color:#f9fafb;
        }
        .wd-lead-card h2{
          margin:0;
          font-size:20px;
        }
        .wd-lead-card p{
          margin:0;
          font-size:13px;
          color:#e5e7eb;
        }
        .wd-lead-form{
          margin-top:6px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .wd-lead-form input,
        .wd-lead-form select{
          width:100%;
          border-radius:9px;
          border:none;
          padding:10px 11px;
          font-size:14px;
          outline:none;
        }
        .wd-lead-form input::placeholder{
          color:#9ca3af;
        }
        .wd-lead-row{
          display:flex;
          align-items:center;
          gap:8px;
          font-size:12px;
          margin-top:2px;
        }
        .wd-lead-checkbox{
          accent-color:#f97316;
        }
        .wd-lead-btn{
          margin-top:6px;
          border-radius:999px;
          border:none;
          padding:11px 14px;
          font-weight:700;
          font-size:14px;
          background:#f97316;
          color:#ffffff;
          cursor:pointer;
        }
        .wd-lead-btn:hover{
          filter:brightness(1.06);
        }
        .wd-lead-footer{
          margin-top:6px;
          font-size:10px;
          color:#e5e7eb;
        }

        /* Filters */
        .wd-filter-wrap{
          max-width:1200px;
          margin:22px auto 0;
          padding:0 18px 6px 18px;
        }
        .wd-filter-wrap h3{
          font-size:18px;
          margin:0 0 10px;
        }
        .wd-filter-row{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }
        .wd-chip{
          border-radius:999px;
          padding:8px 14px;
          font-size:13px;
          background:var(--chip-bg);
          border:1px solid var(--ring);
          cursor:pointer;
          color:var(--ink);
          transition:background .14s,border-color .14s,transform .14s;
          white-space:nowrap;
        }
        .wd-chip:hover{
          transform:translateY(-1px);
        }
        .wd-chip.active{
          background:var(--ink);
          color:#ffffff;
          border-color:var(--ink);
        }

        /* Layout */
        .wd-main{
          max-width:1200px;
          margin:10px auto 40px;
          padding:0 18px 24px;
          display:grid;
          grid-template-columns:3fr 1.3fr;
          gap:22px;
        }

        .wd-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
          gap:18px;
        }
        .wd-card{
          background:var(--card);
          border-radius:18px;
          border:1px solid var(--ring);
          box-shadow:0 10px 30px rgba(15,23,42,.06);
          overflow:hidden;
          display:flex;
          flex-direction:column;
        }
        .wd-card img{
          width:100%;
          height:200px;
          object-fit:cover;
          display:block;
        }
        .wd-card-body{
          padding:14px 14px 12px;
        }
        .wd-card-title{
          font-size:15px;
          font-weight:600;
          margin:0 0 4px;
        }
        .wd-card-meta{
          font-size:12px;
          color:var(--muted);
          margin:0 0 10px;
        }
        .wd-card-actions{
          display:flex;
          gap:10px;
          padding:0 14px 14px;
        }
        .wd-btn{
          flex:1;
          border-radius:999px;
          padding:9px 10px;
          font-size:13px;
          font-weight:600;
          border:1px solid var(--ring);
          background:#ffffff;
          cursor:pointer;
        }
        .wd-btn.primary{
          background:var(--brand);
          color:#ffffff;
          border-color:var(--brand);
        }
        .wd-btn.primary:hover{
          filter:brightness(1.05);
        }
        .wd-btn.secondary:hover{
          background:#f3f4f6;
        }

        .wd-side{
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .wd-promise{
          background:#111827;
          color:#f9fafb;
          border-radius:18px;
          padding:18px 18px 16px;
          box-shadow:0 18px 40px rgba(15,23,42,.30);
        }
        .wd-promise h3{
          margin:0 0 10px;
          font-size:18px;
        }
        .wd-promise ul{
          list-style:none;
          padding:0;
          margin:0;
          font-size:13px;
        }
        .wd-promise li{
          margin:4px 0;
        }
        .wd-promise li span{
          font-weight:600;
        }

        .wd-cta-panel{
          background:#ffffff;
          border-radius:16px;
          border:1px solid var(--ring);
          padding:16px;
        }
        .wd-cta-panel h4{
          margin:0 0 6px;
          font-size:15px;
        }
        .wd-cta-panel p{
          margin:0 0 10px;
          font-size:13px;
          color:var(--muted);
        }
        .wd-cta-panel button{
          width:100%;
          border-radius:999px;
          padding:10px 12px;
          background:var(--brand);
          border:none;
          color:#fff;
          font-weight:600;
          cursor:pointer;
        }
        .wd-cta-panel button:hover{
          filter:brightness(1.05);
        }

        @media (max-width: 980px){
          .wd-main{
            grid-template-columns:1fr;
          }
        }
        @media (max-width: 900px){
          .wd-lead{
            flex-direction:column;
          }
          .wd-lead-img{
            min-height:220px;
          }
          .wd-lead-card{
            padding:20px 18px 18px;
          }
        }
      `}</style>

      <div className="wd-page">
        {/* HERO */}
        <section className="wd-hero">
          <div className="wd-hero-inner">
            <div className="wd-breadcrumb">Home / Design Ideas / Wardrobe</div>
            <h1>Wardrobe Designs</h1>
            <p>
              Explore sliding, hinged and walk-in wardrobe designs with lofts, drawers
              and internal organisers planned for Indian homes.
            </p>
          </div>
        </section>

        {/* LEAD HERO CARD */}
        <section className="wd-lead-wrap">
          <div className="wd-lead">
            <div
              className="wd-lead-img"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/7061441/pexels-photo-7061441.jpeg?auto=compress&cs=tinysrgb&w=1600)",
              }}
            />
            <div className="wd-lead-card">
              <h2>Storage that actually fits your life</h2>
              <p>
                Get wardrobes designed around your clothes, suitcases and everyday
                routines — with clear pricing and timelines.
              </p>

              <form
                className="wd-lead-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks! Our team will contact you shortly.");
                }}
              >
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="tel" placeholder="Phone Number" required />
                <div className="wd-lead-row">
                  <input
                    type="checkbox"
                    id="wd-wa"
                    className="wd-lead-checkbox"
                    defaultChecked
                  />
                  <label htmlFor="wd-wa">Send me updates on WhatsApp</label>
                </div>
                <select defaultValue="">
                  <option value="" disabled>
                    Select City
                  </option>
                  <option>Delhi NCR</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Pune</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Other</option>
                </select>

                <button className="wd-lead-btn" type="submit">
                  GET FREE WARDROBE QUOTE
                </button>

                <div className="wd-lead-footer">
                  By submitting this form, you agree to our terms &amp; privacy policy.
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="wd-filter-wrap">
          <h3>What are you looking for?</h3>
          <div className="wd-filter-row">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`wd-chip ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <main className="wd-main">
          <section>
            <div className="wd-grid">
              {visibleCards.map((card) => (
                <article key={card.id} className="wd-card">
                  <img src={card.img} alt={card.title} />
                  <div className="wd-card-body">
                    <h4 className="wd-card-title">{card.title}</h4>
                    <p className="wd-card-meta">
                      {card.size} · {card.city}
                    </p>
                  </div>
                  <div className="wd-card-actions">
                    <button
                      className="wd-btn secondary"
                      type="button"
                      onClick={() =>
                        alert(
                          `We’ll schedule a free design consultation for: ${card.title}`
                        )
                      }
                    >
                      Book Free Consultation
                    </button>
                    <button
                      className="wd-btn primary"
                      type="button"
                      onClick={() =>
                        alert(`We’ll share a detailed quote for: ${card.title}`)
                      }
                    >
                      Get Quote
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="wd-side">
            <div className="wd-promise">
              <h3>The HomeAura promise</h3>
              <ul>
                <li>
                  <span>Measured to the inch</span> so tall units and lofts use every
                  corner.
                </li>
                <li>
                  <span>Hardware from trusted brands</span> for smooth shutters and
                  drawers.
                </li>
                <li>
                  <span>Internal planning</span> for sarees, suits, everyday wear and
                  accessories.
                </li>
                <li>
                  <span>Clean installation</span> with site protection and post-handover
                  checks.
                </li>
              </ul>
            </div>

            <div className="wd-cta-panel">
              <h4>Get a wardrobe layout for your room</h4>
              <p>
                Share a few details and our designer will suggest layouts that fit your
                wall, ceiling height and storage needs.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Get Free Wardrobe Quote
              </button>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
