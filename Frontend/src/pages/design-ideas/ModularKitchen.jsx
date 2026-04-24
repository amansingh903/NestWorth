// src/pages/design-ideas/ModularKitchen.jsx
import React, { useMemo, useState } from "react";

export default function ModularKitchen() {
  const FILTERS = [
    "All",
    "L-Shaped Kitchens",
    "U-Shaped Kitchens",
    "Parallel Kitchens",
    "Open Kitchens",
    "Island Kitchens",
    "Indian Kitchens",
  ];

  const KITCHEN_CARDS = [
    {
      id: 1,
      title: "Modern L-Shaped Kitchen with Quartz Top",
      size: "Size: 10 x 14 ft",
      city: "Delhi",
      tags: ["L-Shaped Kitchens", "Indian Kitchens"],
      img: "https://images.pexels.com/photos/3735414/pexels-photo-3735414.jpeg",
    },
    {
      id: 2,
      title: "Champagne Parallel Kitchen with Glossy Cabinets",
      size: "Size: 8 x 12 ft",
      city: "Mumbai",
      tags: ["Parallel Kitchens", "Indian Kitchens"],
      img: "https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg",
    },
    {
      id: 3,
      title: "Warm U-Shaped Kitchen with Corner Storage",
      size: "Size: 9 x 11 ft",
      city: "Bangalore",
      tags: ["U-Shaped Kitchens"],
      img: "https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg",
    },
    {
      id: 4,
      title: "Open Kitchen with Breakfast Counter",
      size: "Size: 11 x 15 ft",
      city: "Hyderabad",
      tags: ["Open Kitchens", "Island Kitchens"],
      img: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
    },
    {
      id: 5,
      title: "Compact Parallel Kitchen for Indian Homes",
      size: "Size: 7 x 10 ft",
      city: "Pune",
      tags: ["Parallel Kitchens", "Indian Kitchens"],
      img: "https://images.pexels.com/photos/2079237/pexels-photo-2079237.jpeg",
    },
    {
      id: 6,
      title: "Island Kitchen with Wooden Finish & Spotlights",
      size: "Size: 12 x 16 ft",
      city: "Gurugram",
      tags: ["Island Kitchens", "Open Kitchens"],
      img: "https://images.pexels.com/photos/3735413/pexels-photo-3735413.jpeg",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const visibleCards = useMemo(
    () =>
      activeFilter === "All"
        ? KITCHEN_CARDS
        : KITCHEN_CARDS.filter((c) => c.tags.includes(activeFilter)),
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

        .mk-page{
          background:var(--bg);
          color:var(--ink);
          min-height:100vh;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        }

        /* HERO */
        .mk-hero{
          border-bottom:1px solid var(--ring);
          background:#ffffff;
        }
        .mk-hero-inner{
          max-width:1200px;
          margin:0 auto;
          padding:24px 18px 18px;
        }
        .mk-breadcrumb{
          font-size:12px;
          color:#9ca3af;
          margin-bottom:8px;
        }
        .mk-hero-inner h1{
          margin:0 0 8px;
          font-size:clamp(26px,3vw,34px);
          letter-spacing:.02em;
        }
        .mk-hero-inner p{
          margin:0;
          color:var(--muted);
        }

        /* 🎯 LEAD HERO CARD (Designs for Every Budget) */
        .mk-lead-wrap{
          max-width:1200px;
          margin:20px auto 0;
          padding:0 18px;
        }
        .mk-lead{
          background:#4c314d;
          border-radius:26px;
          overflow:hidden;
          display:flex;
          box-shadow:0 22px 50px rgba(15,23,42,.28);
        }
          .lr-lead-form{
          margin-top:6px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .lr-lead-form input,
        .lr-lead-form select{
          width:100%;
          border-radius:9px;
          border:none;
          padding:10px 11px;
          font-size:14px;
          outline:none;
        }
        .lr-lead-form input::placeholder{
          color:#9ca3af;
        }
        .lr-lead-row{
          display:flex;
          align-items:center;
          gap:8px;
          font-size:12px;
          margin-top:2px;
        }
        .lr-lead-checkbox{
          accent-color:#f97316;
        }
        .lr-lead-btn{
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
        .lr-lead-btn:hover{
          filter:brightness(1.06);
        }
        .lr-lead-footer{
          margin-top:6px;
          font-size:10px;
          color:#e5e7eb;
        }
        .mk-lead-img{
          flex:1.1;
          min-height:260px;
          background-size:cover;
          background-position:center;
        }
        .mk-lead-card{
          flex:1;
          padding:26px 28px 24px;
          display:flex;
          flex-direction:column;
          gap:12px;
          color:#f9fafb;
        }
        .mk-lead-card h2{
          margin:0;
          font-size:20px;
        }
        .mk-lead-card p{
          margin:0;
          font-size:13px;
          color:#e5e7eb;
        }
        .mk-lead-form{
          margin-top:6px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .mk-lead-form input,
        .mk-lead-form select{
          width:100%;
          border-radius:9px;
          border:none;
          padding:10px 11px;
          font-size:14px;
          outline:none;
        }
        .mk-lead-form input::placeholder{
          color:#9ca3af;
        }
        .mk-lead-row{
          display:flex;
          align-items:center;
          gap:8px;
          font-size:12px;
          margin-top:2px;
        }
        .mk-lead-checkbox{
          accent-color:#f97316;
        }
        .mk-lead-btn{
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
        .mk-lead-btn:hover{
          filter:brightness(1.06);
        }
        .mk-lead-footer{
          margin-top:6px;
          font-size:10px;
          color:#e5e7eb;
        }

        /* FILTER SECTION (What are you looking for?) */
        .mk-filter-wrap{
          max-width:1200px;
          margin:22px auto 0;
          padding:0 18px 6px 18px;
        }
        .mk-filter-wrap h3{
          font-size:18px;
          margin:0 0 10px;
        }
        .mk-filter-row{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }
        .mk-chip{
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
        .mk-chip:hover{
          transform:translateY(-1px);
        }
        .mk-chip.active{
          background:var(--ink);
          color:#ffffff;
          border-color:var(--ink);
        }

        /* CONTENT LAYOUT */
        .mk-main{
          max-width:1200px;
          margin:10px auto 40px;
          padding:0 18px 24px;
          display:grid;
          grid-template-columns:3fr 1.3fr;
          gap:22px;
        }

        /* CARDS GRID */
        .mk-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
          gap:18px;
        }
        .mk-card{
          background:var(--card);
          border-radius:18px;
          border:1px solid var(--ring);
          box-shadow:0 10px 30px rgba(15,23,42,.06);
          overflow:hidden;
          display:flex;
          flex-direction:column;
        }
        .mk-card img{
          width:100%;
          height:200px;
          object-fit:cover;
          display:block;
        }
        .mk-card-body{
          padding:14px 14px 12px;
        }
        .mk-card-title{
          font-size:15px;
          font-weight:600;
          margin:0 0 4px;
        }
        .mk-card-meta{
          font-size:12px;
          color:var(--muted);
          margin:0 0 10px;
        }
        .mk-card-actions{
          display:flex;
          gap:10px;
          padding:0 14px 14px;
        }
        .mk-btn{
          flex:1;
          border-radius:999px;
          padding:9px 10px;
          font-size:13px;
          font-weight:600;
          border:1px solid var(--ring);
          background:#ffffff;
          cursor:pointer;
        }
        .mk-btn.primary{
          background:var(--brand);
          color:#ffffff;
          border-color:var(--brand);
        }
        .mk-btn.primary:hover{
          filter:brightness(1.05);
        }
        .mk-btn.secondary:hover{
          background:#f3f4f6;
        }

        /* PROMISE / SIDE PANEL */
        .mk-side{
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .mk-promise{
          background:#111827;
          color:#f9fafb;
          border-radius:18px;
          padding:18px 18px 16px;
          box-shadow:0 18px 40px rgba(15,23,42,.30);
        }
        .mk-promise h3{
          margin:0 0 10px;
          font-size:18px;
        }
        .mk-promise ul{
          list-style:none;
          padding:0;
          margin:0;
          font-size:13px;
        }
        .mk-promise li{
          display:flex;
          align-items:flex-start;
          gap:8px;
          margin:4px 0;
        }
        .mk-promise li span{
          font-weight:600;
        }

        .mk-cta-panel{
          background:#ffffff;
          border-radius:16px;
          border:1px solid var(--ring);
          padding:16px;
        }
        .mk-cta-panel h4{
          margin:0 0 6px;
          font-size:15px;
        }
        .mk-cta-panel p{
          margin:0 0 10px;
          font-size:13px;
          color:var(--muted);
        }
        .mk-cta-panel button{
          width:100%;
          border-radius:999px;
          padding:10px 12px;
          background:var(--brand);
          border:none;
          color:#fff;
          font-weight:600;
          cursor:pointer;
        }
        .mk-cta-panel button:hover{
          filter:brightness(1.05);
        }

        /* RESPONSIVE */
        @media (max-width: 980px){
          .mk-main{
            grid-template-columns:1fr;
          }
        }

        @media (max-width: 900px){
          .mk-lead{
            flex-direction:column;
          }
          .mk-lead-img{
            min-height:220px;
          }
          .mk-lead-card{
            padding:20px 18px 18px;
          }
        }
      `}</style>

      <div className="mk-page">
        {/* HERO */}
        <section className="mk-hero">
          <div className="mk-hero-inner">
            <div className="mk-breadcrumb">Home / Design Ideas / Kitchen</div>
            <h1>Modular Kitchen Designs</h1>
            <p>
              Explore modular kitchen designs tailored for Indian homes. Filter by layout
              and style, then book a free consultation with the HomeAura team.
            </p>
          </div>
        </section>

        {/* 💜 LEAD HERO CARD */}
        <section className="mk-lead-wrap">
          <div className="mk-lead">
            <div
              className="mk-lead-img"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg)",
              }}
            />
            <div className="mk-lead-card">
              <h2>Designs for Every Budget</h2>
              <p>
                Get your dream home today. Let our experts help you with layouts,
                finishes and a clear quote.
              </p>

              <form
  className="lr-lead-form"
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.target;

    const payload = {
      name: form[0].value,
      email: form[1].value,
      phone: form[2].value,
      whatsappUpdates: form[3].checked,
      city: form[4].value,
       type: "kitchen",
    };

    try {
      const res = await fetch("http://localhost:4000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Thanks! Our designer will contact you shortly.");
        form.reset();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Server not reachable");
    }
  }}
>

                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="tel" placeholder="Phone Number" required />
                <div className="lr-lead-row">
                  <input
                    type="checkbox"
                    id="lr-wa"
                    className="lr-lead-checkbox"
                    defaultChecked
                  />
                  <label htmlFor="lr-wa">Send me updates on WhatsApp</label>
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

                <button className="lr-lead-btn" type="submit">
                  GET FREE LIVING ROOM QUOTE
                </button>

                <div className="lr-lead-footer">
                  By submitting this form, you agree to our terms &amp; privacy policy.
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FILTER CHIPS */}
        <section className="mk-filter-wrap">
          <h3>What are you looking for?</h3>
          <div className="mk-filter-row">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`mk-chip ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <main className="mk-main">
          {/* LEFT: cards */}
          <section>
            <div className="mk-grid">
              {visibleCards.map((card) => (
                <article key={card.id} className="mk-card">
                  <img src={card.img} alt={card.title} />
                  <div className="mk-card-body">
                    <h4 className="mk-card-title">{card.title}</h4>
                    <p className="mk-card-meta">
                      {card.size} · {card.city}
                    </p>
                  </div>
                  <div className="mk-card-actions">
                    <button
                      className="mk-btn secondary"
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
                      className="mk-btn primary"
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

          {/* RIGHT: promise + CTA */}
          <aside className="mk-side">
            <div className="mk-promise">
              <h3>The HomeAura promise</h3>
              <ul>
                <li>
                  <span>10-year warranty</span> on core modular units.
                </li>
                <li>
                  <span>45-day move-in guarantee</span> for standard kitchen projects.
                </li>
                <li>
                  <span>Quality-checked materials</span> that suit Indian cooking habits.
                </li>
                <li>
                  <span>Custom storage</span> planned around your appliances and workflow.
                </li>
              </ul>
            </div>

            <div className="mk-cta-panel">
              <h4>Get a design for your kitchen</h4>
              <p>
                Share your contact details in the next step and a HomeAura designer will
                call you back with layout ideas and a budget plan.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Get Free Kitchen Quote
              </button>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
