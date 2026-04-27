// src/pages/design-ideas/Bathroom.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";

/**
 * Bathroom.jsx
 * - Parity with ModularKitchen page: premium light theme, filters, search, sort, modal, booking
 * - Add sample stable images from Pexels
 *
 * Route: <Route path="/design-ideas/bathroom" element={<Bathroom />} />
 */

export default function Bathroom() {
  const FILTERS = [
    "All",
    "Luxury Bathrooms",
    "Compact Spaces",
    "Modern Bathrooms",
    "Indian Style",
    "Wet/Dry",
  ];

  const SORTS = [
    { id: "relevance", label: "Relevance" },
    { id: "newest", label: "Newest" },
    { id: "smallest", label: "Smallest" },
    { id: "largest", label: "Largest" },
  ];

  const CARDS = [
    {
      id: 201,
      title: "Luxury Marble Bathroom with Glass Shower",
      size: "8 x 10 ft",
      sizeSq: 80,
      city: "Mumbai",
      tags: ["Luxury Bathrooms", "Modern Bathrooms"],
      img: "https://images.pexels.com/photos/6438751/pexels-photo-6438751.jpeg?auto=compress&cs=tinysrgb&w=1400",
      gallery: [
        "https://images.pexels.com/photos/6438751/pexels-photo-6438751.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4033189/pexels-photo-4033189.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      desc:
        "Polished marble, frameless glass shower and premium fixtures for a hotel-like finish.",
      priceIndicative: "₹1.8L - ₹3.5L",
    },
    {
      id: 202,
      title: "Compact Bathroom with Vanity Storage",
      size: "6 x 8 ft",
      sizeSq: 48,
      city: "Bangalore",
      tags: ["Compact Spaces", "Indian Style"],
      img: "https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=1400",
      gallery: [
        "https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      desc:
        "Space-optimized vanity, corner shower and anti-skid flooring — built for Indian bathrooms.",
      priceIndicative: "₹80k - ₹1.6L",
    },
    {
      id: 203,
      title: "Modern Bathroom with Wooden Cabinetry",
      size: "9 x 12 ft",
      sizeSq: 108,
      city: "Hyderabad",
      tags: ["Modern Bathrooms"],
      img: "https://images.pexels.com/photos/6620652/pexels-photo-6620652.jpeg?auto=compress&cs=tinysrgb&w=1400",
      gallery: [
        "https://images.pexels.com/photos/6620652/pexels-photo-6620652.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      desc:
        "Warm wood cabinetry, concealed cisterns and accent mirror lighting for modern living.",
      priceIndicative: "₹2.0L - ₹3.8L",
    },
    {
      id: 204,
      title: "Indian Style Bathroom with Vitrified Tiles",
      size: "7 x 9 ft",
      sizeSq: 63,
      city: "Delhi",
      tags: ["Indian Style"],
      img: "https://images.pexels.com/photos/3954637/pexels-photo-3954637.jpeg?auto=compress&cs=tinysrgb&w=1400",
      gallery: [
        "https://images.pexels.com/photos/3954637/pexels-photo-3954637.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      desc:
        "Hardwearing tiles and smart wet/dry zoning for Indian usage patterns and cleaning convenience.",
      priceIndicative: "₹1.0L - ₹2.2L",
    },
    {
      id: 205,
      title: "Contemporary Wet & Dry Layout with Glass Partition",
      size: "8 x 11 ft",
      sizeSq: 88,
      city: "Gurugram",
      tags: ["Wet/Dry", "Modern Bathrooms"],
      img: "https://images.pexels.com/photos/3735461/pexels-photo-3735461.jpeg?auto=compress&cs=tinysrgb&w=1400",
      gallery: [
        "https://images.pexels.com/photos/3735461/pexels-photo-3735461.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      desc:
        "Wet-dry zoning with glass partition and wall-mounted vanities for a contemporary finish.",
      priceIndicative: "₹1.6L - ₹2.8L",
    },
  ];

  // state
  const [filter, setFilter] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  // computed
  const visible = useMemo(() => {
    let items = CARDS.filter((c) => (filter === "All" ? true : c.tags.includes(filter)));
    if (searchQ.trim()) {
      const q = searchQ.trim().toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          (c.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sortBy === "newest") items = [...items].sort((a, b) => b.id - a.id);
    if (sortBy === "smallest") items = [...items].sort((a, b) => a.sizeSq - b.sizeSq);
    if (sortBy === "largest") items = [...items].sort((a, b) => b.sizeSq - a.sizeSq);
    return items;
  }, [filter, searchQ, sortBy]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight")
        setModalIndex((i) => Math.min(i + 1, (selected?.gallery?.length || 1) - 1));
      if (e.key === "ArrowLeft") setModalIndex((i) => Math.max(i - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => modalRef.current?.focus?.(), 60);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, selected]);

  const openPreview = (card) => {
    setSelected(card);
    setModalIndex(0);
    setModalOpen(true);
  };

  const handleRequest = (type, card) => {
    if (type === "consult") alert(`Consultation booked for: ${card.title}`);
    else if (type === "quote") alert(`Quote requested for: ${card.title}`);
  };

  return (
    <>
      <style>{BATH_CSS}</style>
      <div className="bath-page">
        <header className="bath-hero">
          <div className="bath-hero-inner">
            <div className="bath-crumb">Home / Design Ideas / Bathroom</div>
            <h1>Bathroom Designs</h1>
            <p>Functional, water-safe and beautiful bathroom designs curated for Indian homes.</p>
          </div>
        </header>

        {/* Lead card */}
        <section className="bath-lead-wrap">
          <div className="bath-lead">
            <div
              className="bath-lead-img"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/6438751/pexels-photo-6438751.jpeg?auto=compress&cs=tinysrgb&w=1600)",
              }}
            />
            <div className="bath-lead-card">
              <h2>Designs that last — waterproofed & tested</h2>
              <p>Choose layout, finishes and accessories; our team executes with water-safe detailing.</p>
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
       type: "bathroom",
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
                  GET FREE BATHROOM QUOTE
                </button>

                <div className="lr-lead-footer">
                  By submitting this form, you agree to our terms &amp; privacy policy.
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* controls */}
        <section className="bath-controls">
          <div className="bath-filter-chips">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`bath-chip ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="bath-tools">
            <input
              placeholder="Search title, city or tag..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="bath-view">
              <button onClick={() => setView("grid")}>Grid</button>
              <button onClick={() => setView("list")}>List</button>
            </div>
          </div>
        </section>

        <main className="bath-main">
          <section>
            {visible.length === 0 ? (
              <div className="bath-empty">No bathroom designs found.</div>
            ) : view === "grid" ? (
              <div className="bath-grid">
                {visible.map((c) => (
                  <article className="bath-card" key={c.id}>
                    <div className="bath-media" onClick={() => openPreview(c)}>
                      <img src={c.img} alt={c.title} loading="lazy" />
                    </div>
                    <div className="bath-body">
                      <h3>{c.title}</h3>
                      <p className="bath-meta">{c.size} · {c.city} · <strong>{c.priceIndicative}</strong></p>
                      <p className="bath-desc">{c.desc}</p>
                    </div>
                    <div className="bath-actions">
                      <button onClick={() => handleRequest("consult", c)}>Book Consultation</button>
                      <button className="primary" onClick={() => handleRequest("quote", c)}>Get Quote</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bath-list">
                {visible.map((c) => (
                  <article key={c.id} className="bath-list-item">
                    <img src={c.img} alt={c.title} />
                    <div>
                      <h3>{c.title}</h3>
                      <p className="bath-meta">{c.size} · {c.city}</p>
                      <p className="bath-desc">{c.desc}</p>
                      <div style={{ marginTop: 8 }}>
                        <button onClick={() => handleRequest("consult", c)}>Book</button>
                        <button className="primary" onClick={() => handleRequest("quote", c)}>Quote</button>
                        <button onClick={() => openPreview(c)}>Preview</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="bath-side">
            <div className="bath-promise">
              <h4>Why choose NestWorth for bathrooms?</h4>
              <ul>
                <li>Waterproofing as per best practices</li>
                <li>Anti-skid & stain-resistant finishes</li>
                <li>End-to-end execution & warranty</li>
              </ul>
            </div>

            <div className="bath-cta">
              <h4>Get a free site visit</h4>
              <p>Our team will measure and propose a detailed estimate.</p>
              <button onClick={() => alert("Site visit requested (mock).")}>Request Visit</button>
            </div>
          </aside>
        </main>

        <section className="bath-faq">
          <h4>Bathroom FAQs</h4>
          <details><summary>Can I convert a wet bathroom to wet/dry?</summary><p>Yes — with minor layout changes and a glass partition we can create wet/dry zones.</p></details>
          <details><summary>Do you handle plumbing reroutes?</summary><p>We can coordinate with licensed plumbers — please request during consultation.</p></details>
        </section>

        {/* Modal */}
        {modalOpen && selected && (
          <div className="bath-modal" role="dialog" aria-modal="true">
            <div className="bath-modal-inner" ref={modalRef} tabIndex={-1}>
              <button className="bath-modal-close" onClick={() => setModalOpen(false)}>✕</button>
              <div className="bath-modal-grid">
                <div className="bath-modal-media">
                  <img src={selected.gallery?.[modalIndex] || selected.img} alt={selected.title} />
                  {selected.gallery && selected.gallery.length > 1 && (
                    <div className="bath-slide-controls">
                      <button onClick={() => setModalIndex(i => Math.max(i - 1, 0))} disabled={modalIndex === 0}>‹</button>
                      <span>{modalIndex + 1}/{selected.gallery.length}</span>
                      <button onClick={() => setModalIndex(i => Math.min(i + 1, selected.gallery.length - 1))} disabled={modalIndex === selected.gallery.length - 1}>›</button>
                    </div>
                  )}
                </div>
                <div className="bath-modal-body">
                  <h3>{selected.title}</h3>
                  <p className="bath-meta">{selected.size} · {selected.city} · <strong>{selected.priceIndicative}</strong></p>
                  <p>{selected.desc}</p>
                  <div style={{ marginTop: 12 }}>
                    <button onClick={() => handleRequest("consult", selected)}>Book Consultation</button>
                    <button className="primary" onClick={() => handleRequest("quote", selected)}>Get Quote</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bath-modal-backdrop" onClick={() => setModalOpen(false)} />
          </div>
        )}
      </div>
    </>
  );
}

/* ================= CSS for Bathroom ================= */
const BATH_CSS = `
:root{ --bg:#f6f7fb; --card:#fff; --ink:#0f172a; --muted:#6b7280; --ring:#e6e9ee; --accent:#ef4444; }

/* page */
.bath-page{ font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; background:var(--bg); color:var(--ink); min-height:100vh; }

/* hero */
.bath-hero{ background:var(--card); border-bottom:1px solid var(--ring); }
.bath-hero-inner{ max-width:1200px; margin:0 auto; padding:24px 18px; }
.bath-crumb{ color:#9aa4b2; font-size:13px }

/* lead */
.bath-lead-wrap{ max-width:1200px; margin:18px auto; padding:0 18px; }
.bath-lead{ display:flex; gap:12px; border-radius:14px; overflow:hidden; background:linear-gradient(180deg,#334, #4b314c); color:white; }
.bath-lead-img{ flex:1; min-height:240px; background-size:cover; background-position:center; }
.bath-lead-card{ flex:1; padding:18px; }
.bath-lead-form input, .bath-lead-form select{ display:block; width:100%; padding:9px 10px; margin-bottom:8px; border-radius:8px; border:none; }

/* controls */
.bath-controls{ max-width:1200px; margin:18px auto; padding:12px 18px; display:flex; justify-content:space-between; gap:12px; align-items:center; }
.bath-filter-chips{ display:flex; gap:8px; flex-wrap:wrap; }
.bath-chip{ background:var(--card); border:1px solid var(--ring); padding:8px 12px; border-radius:999px; cursor:pointer; font-weight:600; }
.bath-chip.active{ background:var(--ink); color:white; }

/* tools */
.bath-tools{ display:flex; gap:8px; align-items:center; }
.bath-tools input{ padding:8px 10px; border-radius:8px; border:1px solid var(--ring); }
.bath-tools select{ padding:8px 10px; border-radius:8px; border:1px solid var(--ring); }
.bath-view button{ padding:8px 10px; border-radius:8px; border:1px solid var(--ring); background:white; cursor:pointer; }

/* main */
.bath-main{ max-width:1200px; margin:16px auto; padding:0 18px; display:grid; grid-template-columns:3fr 1.1fr; gap:18px; }

/* cards */
.bath-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; }
.bath-card{ background:var(--card); border-radius:12px; border:1px solid var(--ring); overflow:hidden; display:flex; flex-direction:column; }
.bath-media img{ width:100%; height:180px; object-fit:cover; display:block; }
.bath-body{ padding:12px; }
.bath-meta{ color:var(--muted); font-size:13px; margin:6px 0 0; }
.bath-desc{ color:#475569; margin:8px 0 0; }

/* actions */
.bath-actions{ display:flex; gap:8px; padding:12px; }
.bath-actions .primary{ background:var(--accent); color:white; border:none; padding:10px 12px; border-radius:999px; }
.bath-actions button{ padding:10px 12px; border-radius:999px; border:1px solid var(--ring); background:white; cursor:pointer; }

/* side */
.bath-side{ display:flex; flex-direction:column; gap:12px; }
.bath-promise{ background:#111827; color:white; padding:14px; border-radius:12px; }
.bath-cta{ background:var(--card); padding:12px; border-radius:12px; border:1px solid var(--ring); }

/* faq */
.bath-faq{ max-width:900px; margin:30px auto; padding:0 18px 80px; }

/* modal */
.bath-modal{ position:fixed; inset:0; z-index:120; display:flex; align-items:center; justify-content:center; }
.bath-modal-backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.5); }
.bath-modal-inner{ width:min(1000px,96%); background:var(--card); border-radius:12px; z-index:121; padding:14px; display:flex; gap:12px; }
.bath-modal-grid{ display:flex; gap:12px; width:100%; }
.bath-modal-media img{ width:100%; height:420px; object-fit:cover; border-radius:8px; }
.bath-modal-body{ flex:1; padding:6px; }
.bath-modal-close{ position:absolute; top:10px; right:12px; border:none; background:transparent; font-size:20px; cursor:pointer; }

/* responsive */
@media (max-width:1000px){
  .bath-main{ grid-template-columns:1fr; }
  .bath-modal-inner{ flex-direction:column; }
}
`;

/* End Bathroom.jsx */
