// src/pages/design-ideas/LivingRoom.jsx
import React, { useMemo, useState } from "react";

export default function LivingRoom() {
  const FILTERS = [
    "All",
    "Modern Living Rooms",
    "Compact Spaces",
    "TV Unit Focus",
    "Indian Style",
    "Open-plan",
  ];

  const CARDS = [
    {
      id: 1,
      title: "Modern Living Room with TV Unit & Wall Panels",
      size: "Size: 14 x 18 ft",
      city: "Bangalore",
      tags: ["Modern Living Rooms", "TV Unit Focus"],
      img: "https://images.pexels.com/photos/4792500/pexels-photo-4792500.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 2,
      title: "Compact Living Room with Warm Lighting",
      size: "Size: 10 x 14 ft",
      city: "Mumbai",
      tags: ["Compact Spaces", "Indian Style"],
      img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 3,
      title: "Open-plan Living & Dining with Neutral Palette",
      size: "Size: 16 x 20 ft",
      city: "Gurugram",
      tags: ["Open-plan", "Modern Living Rooms"],
      img: "https://images.pexels.com/photos/1457845/pexels-photo-1457845.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 4,
      title: "Indian Style Living Room with Accent Wall",
      size: "Size: 12 x 16 ft",
      city: "Hyderabad",
      tags: ["Indian Style"],
      img: "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 5,
      title: "Minimal Living Room with Floating TV Unit",
      size: "Size: 11 x 15 ft",
      city: "Pune",
      tags: ["TV Unit Focus", "Modern Living Rooms"],
      img: "https://images.pexels.com/photos/6587830/pexels-photo-6587830.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 6,
      title: "Bright Living Room with Large Windows",
      size: "Size: 13 x 17 ft",
      city: "Delhi",
      tags: ["Open-plan", "Compact Spaces"],
      img: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1200",
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

        .lr-page{
          background:var(--bg);
          color:var(--ink);
          min-height:100vh;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        }

        .lr-hero{
          border-bottom:1px solid var(--ring);
          background:#ffffff;
        }
        .lr-hero-inner{
          max-width:1200px;
          margin:0 auto;
          padding:24px 18px 18px;
        }
        .lr-breadcrumb{
          font-size:12px;
          color:#9ca3af;
          margin-bottom:8px;
        }
        .lr-hero-inner h1{
          margin:0 0 8px;
          font-size:clamp(26px,3vw,34px);
          letter-spacing:.02em;
        }
        .lr-hero-inner p{
          margin:0;
          color:var(--muted);
        }

        /* Lead hero card */
        .lr-lead-wrap{
          max-width:1200px;
          margin:20px auto 0;
          padding:0 18px;
        }
        .lr-lead{
          background:#4b3252;
          border-radius:26px;
          overflow:hidden;
          display:flex;
          box-shadow:0 22px 50px rgba(15,23,42,.28);
        }
        .lr-lead-img{
          flex:1.1;
          min-height:260px;
          background-size:cover;
          background-position:center;
        }
        .lr-lead-card{
          flex:1;
          padding:26px 28px 24px;
          display:flex;
          flex-direction:column;
          gap:12px;
          color:#f9fafb;
        }
        .lr-lead-card h2{
          margin:0;
          font-size:20px;
        }
        .lr-lead-card p{
          margin:0;
          font-size:13px;
          color:#e5e7eb;
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

        /* Filters */
        .lr-filter-wrap{
          max-width:1200px;
          margin:22px auto 0;
          padding:0 18px 6px 18px;
        }
        .lr-filter-wrap h3{
          font-size:18px;
          margin:0 0 10px;
        }
        .lr-filter-row{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }
        .lr-chip{
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
        .lr-chip:hover{
          transform:translateY(-1px);
        }
        .lr-chip.active{
          background:var(--ink);
          color:#ffffff;
          border-color:var(--ink);
        }

        /* Layout */
        .lr-main{
          max-width:1200px;
          margin:10px auto 40px;
          padding:0 18px 24px;
          display:grid;
          grid-template-columns:3fr 1.3fr;
          gap:22px;
        }

        .lr-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
          gap:18px;
        }
        .lr-card{
          background:var(--card);
          border-radius:18px;
          border:1px solid var(--ring);
          box-shadow:0 10px 30px rgba(15,23,42,.06);
          overflow:hidden;
          display:flex;
          flex-direction:column;
        }
        .lr-card img{
          width:100%;
          height:200px;
          object-fit:cover;
          display:block;
        }
        .lr-card-body{
          padding:14px 14px 12px;
        }
        .lr-card-title{
          font-size:15px;
          font-weight:600;
          margin:0 0 4px;
        }
        .lr-card-meta{
          font-size:12px;
          color:var(--muted);
          margin:0 0 10px;
        }
        .lr-card-actions{
          display:flex;
          gap:10px;
          padding:0 14px 14px;
        }
        .lr-btn{
          flex:1;
          border-radius:999px;
          padding:9px 10px;
          font-size:13px;
          font-weight:600;
          border:1px solid var(--ring);
          background:#ffffff;
          cursor:pointer;
        }
        .lr-btn.primary{
          background:var(--brand);
          color:#ffffff;
          border-color:var(--brand);
        }
        .lr-btn.primary:hover{
          filter:brightness(1.05);
        }
        .lr-btn.secondary:hover{
          background:#f3f4f6;
        }

        .lr-side{
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .lr-promise{
          background:#111827;
          color:#f9fafb;
          border-radius:18px;
          padding:18px 18px 16px;
          box-shadow:0 18px 40px rgba(15,23,42,.30);
        }
        .lr-promise h3{
          margin:0 0 10px;
          font-size:18px;
        }
        .lr-promise ul{
          list-style:none;
          padding:0;
          margin:0;
          font-size:13px;
        }
        .lr-promise li{
          margin:4px 0;
        }
        .lr-promise li span{
          font-weight:600;
        }

        .lr-cta-panel{
          background:#ffffff;
          border-radius:16px;
          border:1px solid var(--ring);
          padding:16px;
        }
        .lr-cta-panel h4{
          margin:0 0 6px;
          font-size:15px;
        }
        .lr-cta-panel p{
          margin:0 0 10px;
          font-size:13px;
          color:var(--muted);
        }
        .lr-cta-panel button{
          width:100%;
          border-radius:999px;
          padding:10px 12px;
          background:var(--brand);
          border:none;
          color:#fff;
          font-weight:600;
          cursor:pointer;
        }
        .lr-cta-panel button:hover{
          filter:brightness(1.05);
        }

        @media (max-width: 980px){
          .lr-main{
            grid-template-columns:1fr;
          }
        }
        @media (max-width: 900px){
          .lr-lead{
            flex-direction:column;
          }
          .lr-lead-img{
            min-height:220px;
          }
          .lr-lead-card{
            padding:20px 18px 18px;
          }
        }
      `}</style>

      <div className="lr-page">
        {/* HERO */}
        <section className="lr-hero">
          <div className="lr-hero-inner">
            <div className="lr-breadcrumb">Home / Design Ideas / Living Room</div>
            <h1>Living Room Designs</h1>
            <p>
              Browse living room designs for Indian homes – TV units, seating layouts
              and accent walls that work for everyday family life.
            </p>
          </div>
        </section>

        {/* LEAD HERO CARD */}
        <section className="lr-lead-wrap">
          <div className="lr-lead">
            <div
              className="lr-lead-img"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/6587848/pexels-photo-6587848.jpeg?auto=compress&cs=tinysrgb&w=1600)",
              }}
            />
            <div className="lr-lead-card">
              <h2>Designs for Every Budget</h2>
              <p>
                Get your dream living room with the right mix of comfort, storage and
                style. Our experts can help you plan it end-to-end.
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
      type: "livingroom",
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

        {/* FILTERS */}
        <section className="lr-filter-wrap">
          <h3>What are you looking for?</h3>
          <div className="lr-filter-row">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`lr-chip ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <main className="lr-main">
          <section>
            <div className="lr-grid">
              {visibleCards.map((card) => (
                <article key={card.id} className="lr-card">
                  <img src={card.img} alt={card.title} />
                  <div className="lr-card-body">
                    <h4 className="lr-card-title">{card.title}</h4>
                    <p className="lr-card-meta">
                      {card.size} · {card.city}
                    </p>
                  </div>
                  <div className="lr-card-actions">
                    <button
                      className="lr-btn secondary"
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
                      className="lr-btn primary"
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

          <aside className="lr-side">
            <div className="lr-promise">
              <h3>The HomeAura promise</h3>
              <ul>
                <li>
                  <span>Balanced layouts</span> that work for TV viewing, guests and
                  daily use.
                </li>
                <li>
                  <span>Durable finishes</span> chosen for Indian dust and cleaning
                  routines.
                </li>
                <li>
                  <span>Hidden storage</span> for toys, books and devices.
                </li>
                <li>
                  <span>Lighting plans</span> that make the room feel bigger and warmer.
                </li>
              </ul>
            </div>

            <div className="lr-cta-panel">
              <h4>Get a design for your living room</h4>
              <p>
                Share your contact details in the next step and a HomeAura designer will
                suggest layouts and a budget that match your space.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Get Free Living Room Quote
              </button>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
