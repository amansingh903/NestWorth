// src/pages/design-ideas/MasterBedroom.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";

/* ================= CSS (MASTER_CSS) ================= */
const MASTER_CSS = `
:root{
  --bg:#f7f7fb;
  --card:#ffffff;
  --ink:#0f172a;
  --muted:#6b7280;
  --ring:#e6e9ee;
  --brand:#111827; /* primary accent is black for premium look */
  --accent:#ef4444;
}

/* PAGE LAYOUT */
.mb-page{ background:var(--bg); min-height:100vh; color:var(--ink); font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; }

/* HERO */
.mb-hero{ background:var(--card); border-bottom:1px solid var(--ring); }
.mb-hero-inner{ max-width:1200px; margin:0 auto; padding:28px 18px; }
.mb-breadcrumb{ color: #9aa4b2; font-size:13px; margin-bottom:8px; }
.mb-hero-inner h1{ margin:0 0 8px; font-size:clamp(24px,2.8vw,36px); }
.mb-lead-copy{ margin:0; color:var(--muted); }

/* LEAD CARD */
.mb-lead-wrap{ max-width:1200px; margin:20px auto; padding:0 18px; }
.mb-lead{ display:flex; border-radius:18px; overflow:hidden; box-shadow:0 20px 50px rgba(15,23,42,.08); background:linear-gradient(180deg,#332c36,#4b314c); color:#fff; }
.mb-lead-img{ flex:1; min-height:260px; background-size:cover; background-position:center; }
.mb-lead-card{ flex:1; padding:22px 24px; display:flex; flex-direction:column; gap:10px; }
.mb-lead-card h2{ margin:0; font-size:20px; }
.mb-lead-form{ display:flex; flex-direction:column; gap:10px; }
.mb-form-row{ display:flex; gap:10px; }
.mb-form-row input, .mb-form-row select{ flex:1; padding:10px 12px; border-radius:8px; border:none; }

/* buttons */
.mb-cta{ padding:11px 14px; border-radius:999px; background:#f97316; color:white; border:none; font-weight:700; }
.mb-ghost{ padding:11px 14px; border-radius:999px; background:transparent; border:1px solid rgba(255,255,255,.16); color:white; }
.mb-small{ font-size:12px; color:rgba(255,255,255,.92) }

/* CONTROLS */
.mb-controls{ max-width:1200px; margin:18px auto; padding:12px 18px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
.mb-filter-chips{ display:flex; gap:8px; flex-wrap:wrap; }
.mb-chip{ background:var(--card); border:1px solid var(--ring); padding:8px 12px; border-radius:999px; cursor:pointer; font-weight:600; }
.mb-chip.active{ background:var(--brand); color:white; border-color:var(--brand); }

.mb-controls-right{ display:flex; align-items:center; gap:10px; }
.mb-search input{ padding:9px 10px; border-radius:9px; border:1px solid var(--ring); min-width:200px; }
.mb-controls-right select{ padding:9px 10px; border-radius:9px; border:1px solid var(--ring); background:white; }
.mb-view-toggle button{ padding:8px 10px; border-radius:8px; border:1px solid var(--ring); background:white; cursor:pointer; }

/* MAIN */
.mb-main{ max-width:1200px; margin:16px auto 40px; display:grid; grid-template-columns:3fr 1.15fr; gap:22px; padding:0 18px; }

/* GRID */
.mb-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(260px,1fr)); gap:18px; }
.mb-card{
  background:var(--card);
  border-radius:14px;
  overflow:hidden;
  border:1px solid var(--ring);
  display:flex;
  flex-direction:column;
  height:100%;              /* 🔥 important */
}

.mb-card-body{
  flex:1;                   /* 🔥 equal height */
}

.mb-card-media{ position:relative; cursor:pointer; }
.mb-card-media{
  height:200px;
}

.mb-card-media img{
  width:100%;
  height:100%;
  object-fit:cover;
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


.mb-card-body{ padding:12px 14px; display:flex; flex-direction:column; gap:8px; }
.mb-card-body h3{ margin:0; font-size:16px; }
.mb-meta{ color:var(--muted); font-size:13px; margin:0; }
.mb-desc{ color:#475569; font-size:14px; margin:0; }

.mb-card-actions{
  margin-top:auto;     /* 🔥 pushes buttons to bottom */
  padding:12px 14px 18px;
  display:flex;
  gap:8px;
}

.mb-btn{ flex:1; padding:10px 12px; border-radius:999px; border:1px solid var(--ring); background:white; cursor:pointer; font-weight:600; }
.mb-btn.primary{ background:var(--brand); color:white; border:none; }
.mb-btn.ghost{ background:transparent; border:1px solid var(--ring); }

/* LIST view */
.mb-list{ display:flex; flex-direction:column; gap:12px; }
.mb-list-item{ display:flex; gap:12px; background:var(--card); border-radius:12px; padding:10px; border:1px solid var(--ring); align-items:center; }
.mb-list-item img{ width:220px; height:140px; object-fit:cover; border-radius:8px; }
.mb-list-body{ flex:1; }

/* SIDE PANEL */
.mb-side{ display:flex; flex-direction:column; gap:12px; }
.mb-promise{ background:#111827; color:white; padding:16px; border-radius:12px; }
.mb-cta-panel{ background:var(--card); padding:14px; border-radius:12px; border:1px solid var(--ring); }
.mb-cta-ghost{ background:transparent; border:1px solid var(--ring); padding:10px; border-radius:999px; width:100%; }

/* TESTIMONIALS */
.mb-testimonials blockquote{ background:var(--card); padding:12px; border-radius:10px; margin:0 0 8px 0; border:1px solid var(--ring); }

/* MODAL */
.mb-modal{ position:fixed; inset:0; z-index:120; display:flex; align-items:center; justify-content:center; }
.mb-modal-backdrop{ position:fixed; inset:0; background:rgba(6,10,15,.5); }
.mb-modal-inner{ position:relative; width:min(1100px,96%); max-height:92vh; overflow:auto; background:var(--card); border-radius:12px; z-index:121; box-shadow:0 30px 80px rgba(2,6,23,.6); }
.mb-modal-close{ position:absolute; top:12px; right:12px; border:none; background:transparent; font-size:20px; cursor:pointer; }
.mb-modal-grid{ display:grid; grid-template-columns:1fr 420px; gap:12px; padding:18px; }
.mb-modal-media img{ width:100%; height:420px; object-fit:cover; border-radius:8px; display:block; }
.mb-modal-slides{ display:flex; gap:8px; align-items:center; justify-content:center; margin-top:8px; }
.mb-modal-slides button{ padding:8px 12px; border-radius:6px; border:1px solid var(--ring); background:white; cursor:pointer; }
.mb-modal-body{ padding:6px 6px 24px; }
.mb-modal-actions{ display:flex; gap:8px; margin-top:12px; }

/* responsive tweaks */
@media (max-width: 1000px){
  .mb-main{ grid-template-columns:1fr; }
  .mb-modal-grid{ grid-template-columns:1fr; }
}
`;

/**
 * MasterBedroom.jsx
 * - Premium white/black design (same visual language as Home/ModularKitchen)
 * - Filters, search, sort, grid/list view
 * - Card detail modal with image slideshow
 * - Booking / Get Quote form (mock)
 * - Testimonials & FAQs
 *
 * Drop into src/pages/design-ideas and add route:
 * <Route path="/design-ideas/master-bedroom" element={<MasterBedroom />} />
 */

export default function MasterBedroom() {
  // FILTERS & DATA
  const FILTERS = [
    "All",
    "Modern Bedrooms",
    "Luxury Bedrooms",
    "Indian Bedrooms",
    "Wooden Finish",
    "Minimal Style",
    "Budget Friendly",
    "Compact Spaces"
  ];

  const SORT_OPTIONS = [
    { id: "relevance", label: "Relevance" },
    { id: "newest", label: "Newest" },
    { id: "largest", label: "Largest size" },
    { id: "smallest", label: "Smallest size" },
  ];

const CARDS = [
  {
    id: 101,
    title: "Soft Beige Master Bedroom With LED Ceiling",
    sizeSq: 224,
    size: "14 x 16 ft",
    city: "Pune",
    tags: ["Modern Bedrooms", "Wooden Finish"],
    img: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    desc:
      "A calm, neutral palette bedroom with LED cove lighting and integrated wardrobes. Suitable for families seeking a soft luxury finish.",
    priceIndicative: "₹2.2L - ₹3.5L",
  },
  {
    id: 102,
    title: "Luxury Bedroom With Walk-in Wardrobe",
    sizeSq: 270,
    size: "15 x 18 ft",
    city: "Delhi",
    tags: ["Luxury Bedrooms"],
    img: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    desc:
      "High-end finishes, walk-in wardrobe and layered lighting — curated for a premium hotel-like experience.",
    priceIndicative: "₹4.5L - ₹8.0L",
  },
  {
    id: 103,
    title: "Minimal Cream Bedroom with Wooden Floor",
    sizeSq: 195,
    size: "13 x 15 ft",
    city: "Bangalore",
    tags: ["Minimal Style", "Wooden Finish"],
    img: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    desc:
      "Scandinavian-inspired minimal bedroom — clean lines, soft textures and smart storage.",
    priceIndicative: "₹1.6L - ₹2.8L",
  },
  {
    id: 104,
    title: "Warm Indian Bedroom with Accent Wall",
    sizeSq: 168,
    size: "12 x 14 ft",
    city: "Hyderabad",
    tags: ["Indian Bedrooms", "Budget Friendly"],
    img: "https://images.pexels.com/photos/6782474/pexels-photo-6782474.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/6782474/pexels-photo-6782474.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],

    desc:
      "Rich textures and warm tones, designed for Indian furniture and storage preferences.",
    priceIndicative: "₹1.2L - ₹2.0L",
  },
  {
    id: 105,
    title: "Contemporary Neutral Bedroom with Accent Lighting",
    sizeSq: 210,
    size: "13 x 16 ft",
    city: "Mumbai",
    tags: ["Modern Bedrooms"],
    img: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    desc:
      "Functional storage and clean aesthetics — ideal for urban apartments.",
    priceIndicative: "₹1.8L - ₹3.0L",
  },
  {
    id: 106,
    title: "Compact Cozy Bedroom with Built-in Shelves",
    sizeSq: 132,
    size: "11 x 12 ft",
    city: "Pune",
    tags: ["Compact Spaces", "Budget Friendly"],
    img: "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    desc: "Space-optimized bedroom with smart shelving and compact storage.",
    priceIndicative: "₹90k - ₹1.6L",
  },
];


  // STATE
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("grid"); // grid | list
  const [favorites, setFavorites] = useState(() => new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(null);
  const [modalSlide, setModalSlide] = useState(0);

  // refs for keyboard accessibility
  const modalRef = useRef(null);

  // derived visible cards
  const visibleCards = useMemo(() => {
    let items = CARDS.filter((c) =>
      activeFilter === "All" ? true : c.tags.includes(activeFilter)
    );
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.city && c.city.toLowerCase().includes(q)) ||
          (c.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "newest") {
      // we don't have createdAt; for demo, reverse id
      items = [...items].sort((a, b) => b.id - a.id);
    } else if (sort === "largest") {
      items = [...items].sort((a, b) => b.sizeSq - a.sizeSq);
    } else if (sort === "smallest") {
      items = [...items].sort((a, b) => a.sizeSq - b.sizeSq);
    }
    return items;
  }, [activeFilter, query, sort]);

  // favorites toggle
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  // open modal
  const openModal = (card) => {
    setModalCard(card);
    setModalSlide(0);
    setModalOpen(true);
  };

  // modal keyboard handlers & focus trap light
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight") {
        setModalSlide((s) => Math.min(s + 1, (modalCard?.gallery?.length || 1) - 1));
      }
      if (e.key === "ArrowLeft") {
        setModalSlide((s) => Math.max(s - 1, 0));
      }
    };
    document.addEventListener("keydown", onKey);
    // autofocus
    setTimeout(() => modalRef.current?.focus?.(), 60);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, modalCard]);

  // small util to safely join classnames
  const cx = (...parts) => parts.filter(Boolean).join(" ");

  // mock submit handlers
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    alert("Thanks — our design team will contact you shortly.");
    e.target.reset();
  };

  const handleCardAction = (action, card) => {
    if (action === "consult") {
      alert(`Booked consultation for: ${card.title}`);
    } else if (action === "quote") {
      alert(`Quote request received for: ${card.title}`);
    } else if (action === "view") {
      openModal(card);
    }
  };

  return (
    <>
      <style>{MASTER_CSS}</style>

      <div className="mb-page">
        {/* HERO */}
        <header className="mb-hero">
          <div className="mb-hero-inner">
            <div className="mb-breadcrumb">Home / Design Ideas / Master Bedroom</div>
            <h1>Master Bedroom Designs</h1>
            <p className="mb-lead-copy">
              Curated master bedroom layouts — modern, minimal, or luxurious. Use filters
              to find layouts, finishes and budgets that fit your needs.
            </p>
          </div>
        </header>

        {/* LEAD CTA CARD */}
        <section className="mb-lead-wrap" aria-labelledby="lead-heading">
          <div className="mb-lead">
           <div
              className="mb-lead-img"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1600)",
             }}
        />

            <div className="mb-lead-card">
              <h2 id="lead-heading">Designs for Every Budget</h2>
              <p>
                Tell us a bit about your space and we'll propose layout options,
                storage solutions and a transparent budget.
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
       type: "masterbedroom",
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
                  GET FREE BEDROOM ROOM QUOTE
                </button>

                <div className="lr-lead-footer">
                  By submitting this form, you agree to our terms &amp; privacy policy.
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FILTER, SEARCH, SORT, VIEW */}
        <section className="mb-controls" aria-label="Filters and tools">
          <div className="mb-controls-left">
            <div className="mb-filter-chips" role="tablist" aria-label="Bedroom filters">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={activeFilter === f}
                  className={cx("mb-chip", activeFilter === f && "active")}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-controls-right">
            <label className="mb-search">
              <input
                placeholder="Search city, tag or title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search bedroom designs"
              />
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort designs"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="mb-view-toggle" role="group" aria-label="Toggle view">
              <button
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
                title="Grid view"
              >
                ◻
              </button>
              <button
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT AREA */}
        <main className="mb-main">
          {/* GRID / LIST */}
          <section aria-live="polite">
            {visibleCards.length === 0 ? (
              <div className="mb-empty">No designs match your filters.</div>
            ) : view === "grid" ? (
              <div className="mb-grid">
                {visibleCards.map((card) => (
                <article className="mb-card" key={card.id}>
                  <div className="mb-card-media">
                    <img
                      src={card.img}
                      alt={card.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1400";
                      }}
                    />
                  </div>

                  <div className="mb-card-body">
                    <h3>{card.title}</h3>
                    <p className="mb-meta">
                      Size: {card.size} · {card.city}
                    </p>
                  </div>

                  <div className="mb-card-actions">
                    <button
                      className="mb-btn outline"
                      onClick={() => handleCardAction("consult", card)}
                    >
                      Book Free Consultation
                    </button>

                    <button
                      className="mb-btn primary"
                      onClick={() => handleCardAction("quote", card)}
                    >
                      Get Quote
                    </button>
                  </div>
                </article>

                ))}
              </div>
            ) : (
              <div className="mb-list">
                {visibleCards.map((card) => (
                  <article key={card.id} className="mb-list-item">
                    <img src={card.img} alt={card.title} />
                    <div className="mb-list-body">
                      <h3>{card.title}</h3>
                      <p className="mb-meta">
                        {card.size} · {card.city} · <strong>{card.priceIndicative}</strong>
                      </p>
                      <p className="mb-desc">{card.desc}</p>
                      <div className="mb-list-actions">
                        <button onClick={() => handleCardAction("consult", card)}>
                          Book
                        </button>
                        <button onClick={() => handleCardAction("quote", card)}>
                          Quote
                        </button>
                        <button onClick={() => openModal(card)}>Preview</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* SIDE PANEL */}
          <aside className="mb-side">
            <div className="mb-promise">
              <h3>The HomeAura promise</h3>
              <ul>
                <li>
                  <strong>10-year warranty</strong> on core installations
                </li>
                <li>
                  <strong>Quality-checked materials</strong> suited for Indian climate
                </li>
                <li>
                  <strong>45-day move-in guarantee</strong> for standard packages
                </li>
                <li>
                  <strong>Custom storage planning</strong> for every family
                </li>
              </ul>
            </div>

            <div className="mb-cta-panel">
              <h4>Need help picking a style?</h4>
              <p>Book a free 20-minute call with a designer who will suggest 2-3 options.</p>
              <button
                onClick={() => alert("Booked designer call (mock).")}
                className="mb-cta-ghost"
              >
                Book Free Call
              </button>
            </div>

            <div className="mb-testimonials">
              <h4>What customers say</h4>
              <blockquote>
                “The team delivered exactly what they promised. Great attention to detail.”
                <cite>— Anjali, Bengaluru</cite>
              </blockquote>
              <blockquote>
                “Smart storage solutions — saved us so much space.” <cite>— Rohan, Pune</cite>
              </blockquote>
            </div>
          </aside>
        </main>

        {/* Modal / Detail Drawer */}
        {modalOpen && modalCard && (
          <div
            className="mb-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${modalCard.title}`}
            tabIndex={-1}
            ref={modalRef}
          >
            <div className="mb-modal-inner" role="document">
              <button
                className="mb-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close preview"
              >
                ✕
              </button>

              <div className="mb-modal-grid">
                <div className="mb-modal-media">
                  <img
                    src={modalCard.gallery?.[modalSlide] || modalCard.img}
                    alt={`${modalCard.title} image ${modalSlide + 1}`}
                  />
                  {modalCard.gallery && modalCard.gallery.length > 1 && (
                    <div className="mb-modal-slides">
                      <button
                        onClick={() => setModalSlide((s) => Math.max(s - 1, 0))}
                        aria-label="Previous image"
                        disabled={modalSlide === 0}
                      >
                        ‹
                      </button>
                      <div className="mb-slide-indicator">
                        {modalSlide + 1}/{modalCard.gallery.length}
                      </div>
                      <button
                        onClick={() =>
                          setModalSlide((s) =>
                            Math.min(s + 1, modalCard.gallery.length - 1)
                          )
                        }
                        aria-label="Next image"
                        disabled={modalSlide === (modalCard.gallery.length - 1)}
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-modal-body">
                  <h2>{modalCard.title}</h2>
                  <p className="mb-meta">
                    {modalCard.size} · {modalCard.city} · <strong>{modalCard.priceIndicative}</strong>
                  </p>
                  <p>{modalCard.desc}</p>

                  <div className="mb-modal-actions">
                    <button onClick={() => handleCardAction("consult", modalCard)}>
                      Book Free Consultation
                    </button>
                    <button className="primary" onClick={() => handleCardAction("quote", modalCard)}>
                      Request Quote
                    </button>
                  </div>

                  <hr />

                  <h4>Materials & finishes</h4>
                  <ul>
                    <li>Solid-core MDF wardrobes with soft-close hinges</li>
                    <li>PU/veneer finishes on visible surfaces</li>
                    <li>Integrated LED cove & bedside lighting</li>
                  </ul>

                  <div style={{ marginTop: 12 }}>
                    <strong>Want 3D views?</strong>
                    <p style={{ margin: "6px 0" }}>
                      Request a 3D mockup during consultation (+ optional charge depending on scope).
                    </p>
                    <button onClick={() => alert("3D mockup request noted (mock).")} >
                      Request 3D preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* background click closes */}
            <div
              className="mb-modal-backdrop"
              onClick={() => setModalOpen(false)}
              aria-hidden
            />
          </div>
        )}
      </div>
    </>
  );
}