// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import cities from "../data/cities.json";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  const [open, setOpen] = useState(null); // 'offerings' | 'design' | 'cities' | null

  const navigate = useNavigate();

const isAdminLoggedIn =
  localStorage.getItem("adminToken") ||
  sessionStorage.getItem("adminToken");

const handleLogout = () => {
  localStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminToken");
  navigate("/admin/login");
};

  const timers = useRef({
    offerings: null,
    design: null,
    cities: null,
  });

  const clearMenuTimer = (id) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      timers.current[id] = null;
    }
  };

  const openMenu = (id) => {
    Object.keys(timers.current).forEach((k) => clearMenuTimer(k));
    setOpen(id);
  };

  const closeMenuWithDelay = (id) => {
    clearMenuTimer(id);
    timers.current[id] = setTimeout(() => {
      if (open === id) setOpen(null);
    }, 150);
  };

  // USER POPOVER
  const [openUser, setOpenUser] = useState(false);
  const userTimer = useRef(null);
  const userRef = useRef(null);

  const userOpenNow = () => {
    if (userTimer.current) clearTimeout(userTimer.current);
    setOpenUser(true);
  };
  const userCloseWithDelay = () => {
    userTimer.current = setTimeout(() => setOpenUser(false), 150);
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (!userRef.current) return;
      if (!userRef.current.contains(e.target)) setOpenUser(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpenUser(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <>
      <style>{`
        :root{
          --bg:#ffffff;
          --ink:#0f172a;
          --ink-2:#334155;
          --brand:#ef4444;
          --ring:#e5e7eb;
          --shadow:0 10px 30px rgba(2,6,23,.08);
        }

        body { overflow-x: hidden; }

        .nav{
          position: sticky;
          top:0;
          z-index:9999;
          isolation: isolate;

          background: #ffffff;              /* ✅ FORCE WHITE */
          border-bottom: 1px solid #e5e7eb; /* ✅ visible separation */
        }


        .nav-inner{
          max-width:1200px; margin:0 auto;
          height:60px;
          display:flex; align-items:center; justify-content:space-between;
          padding:0 16px; gap:16px;
        }

        .brand{
          display:inline-flex;
          align-items:center;
          text-decoration:none;
        }

        .brand-mark{
          height:46px;
          width:auto;
          display:block;
          object-fit:contain;
        }

        .links{
          display:flex; gap:18px; align-items:center;
          flex-wrap:nowrap;
        }

        .menu{
          position: relative;
          white-space: nowrap;
        }

        /* NAV LINKS & BUTTONS – FORCE LIGHT NAVBAR MODE */
        .menu a,
        .menu .menu-btn{
          font-weight: 600;
          font-size: 15px;

          color: #0f172a !important;   /* ✅ always visible */
          text-decoration: none;

          padding: 8px 10px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;

          transition: background .15s ease, color .15s ease;
        }

        /* Hover state */
        .menu a:hover,
        .menu .menu-btn:hover{
          background: #f3f4f6;
          color: #0f172a !important;
        }

        /* Active / open dropdown */
        .menu.on > .menu-btn{
          background: #e5e7eb;
          color: #0f172a !important;
        }

        /* Active route (NavLink) */
        .menu a.active{
          color: #111827 !important;
          font-weight: 700;
        }

        .dropdown{
          position:absolute;
          top:48px;
          left:0;
          z-index:10000;   /* 🔥 force above dark hero */
          background:#ffffff;
          background:#fff; border:1px solid var(--ring);
          border-radius:12px; padding:10px; min-width:200px; box-shadow:var(--shadow);
          display:flex; flex-direction:column; gap:8px;
        }
        .dropdown a{ color:var(--ink-2); padding:8px 10px; border-radius:8px }
        .dropdown a:hover{ background:#f3f4f6 }

        /* DESIGN IDEAS – FIXED DROPDOWN */
        .mega{
          position:absolute;
          top:48px;
          left:0;
          z-index:10000;

          background:#ffffff;
          border:1px solid var(--ring);
          border-radius:14px;
          padding:14px 16px;
          box-shadow:var(--shadow);

          display:flex;              /* ✅ GRID REMOVED */
          flex-direction:column;     /* ✅ SINGLE COLUMN */
          gap:10px;

          min-width:260px;           /* ✅ CLEAN WIDTH */
          max-width:300px;

          box-sizing:border-box;
        }

        /* Heading */
        .mega h4{
          margin:0 0 6px;
          font-size:13px;
          color:#334155;             /* ✅ visible on white */
          text-transform:uppercase;
          letter-spacing:.04em;
        }

        /* Links */
        .mega a{
          display:block;
          padding:8px 10px;
          border-radius:8px;

          font-size:15px;
          font-weight:500;

          color:#0f172a;             /* ✅ FORCE VISIBLE TEXT */
          text-decoration:none;
        }

        .mega a:hover{
          background:#f1f5f9;
        }

        .cities-grid {
          grid-template-columns: repeat(3, 1fr);
          width: 520px;
          max-height: 320px;
          overflow-y: auto;
          padding: 14px;
          gap: 8px;

          /* rectangular look */
          border-radius: 12px;
          background: #ffffff;
        }

        /* city item */
        .cities-grid a {
          padding: 8px 10px;
          border-radius: 8px;
          font-weight: 500;
          color: #0f172a;
          text-decoration: none;
        }

        /* hover effect */
        .cities-grid a:hover {
          background: #f1f5f9;
        }


        .user{
          position: relative;
          z-index: 10001;           /* ✅ above hero + dropdown safety */
        }

        /* LOGIN / SIGNUP BUTTON */
        .user-btn{
          display: inline-flex;
          align-items: center;
          gap: 8px;

          padding: 9px 14px;
          border-radius: 999px;

          border: 1px solid #e5e7eb;
          background: #ffffff;

          cursor: pointer;
          font-weight: 600;
          font-size: 14px;

          color: #0f172a !important;  /* ✅ always visible */
          transition: background .15s ease, box-shadow .15s ease;
        }

        /* Hover */
        .user-btn:hover{
          background: #f8fafc;
          box-shadow: 0 4px 14px rgba(2,6,23,.08);
        }

        /* Active / click feedback */
        .user-btn:active{
          background: #f1f5f9;
        }

        /* User icon */
        .user-icon{
          font-size: 16px;
          color: #475569;          /* ✅ soft contrast */
        }

        .user-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 230px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          box-shadow: 0 18px 40px rgba(0,0,0,.12);
          padding: 10px 8px;
          z-index: 20;
          animation: fadePop .12s ease-out;
        }
        @keyframes fadePop {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .user-item {
          display: block;
          padding: 10px 12px;
          border-radius: 10px;
          color: #111827;
          text-decoration: none;
          font-size: 15px;
        }
        .user-item:hover { background: #f4f6f9; }

        @media (max-width: 1000px){
          .nav-inner{
            height:auto;
            padding:6px 10px;
            align-items:flex-start;
            flex-wrap:wrap;
          }
          .brand-mark{
            height:40px;
          }
          .menu a, .menu .menu-btn{
            font-size:14px;
            padding:6px 6px;
          }
          .links{
            flex-wrap:wrap;
            row-gap:4px;
            column-gap:12px;
          }
          .user-btn{
            padding:7px 10px;
            font-size:13px;
          }
          {
            position:absolute;
            top:48px;
            left:0;

            background:#fff;
            border:1px solid var(--ring);
            border-radius:14px;
            padding:16px 18px;
            box-shadow:var(--shadow);

            display:grid;
            grid-template-columns: 1fr;   /* ✅ SINGLE COLUMN */
            gap:10px;

            min-width: 240px;             /* ✅ clean width */
            ma.megax-width: 280px;
          }

        @media (max-width: 640px){
          .brand-mark{
            height:34px;
          }
        }
      `}</style>

      <header className="nav">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="brand" onMouseEnter={() => setOpen(null)}>
            <img src="/logo.png" alt="HomeAura" className="brand-mark" />
          </Link>

          {/* Left navigation */}
          <nav className="links">
            <div className="menu">
              <NavLink to="/" end>How it works</NavLink>
            </div>

            <div
              className={`menu ${open === "offerings" ? "on" : ""}`}
              onMouseEnter={() => openMenu("offerings")}
              onMouseLeave={() => closeMenuWithDelay("offerings")}
            >
              <button className="menu-btn" type="button">Offerings ▾</button>
              {open === "offerings" && (
                <div
                  className="dropdown"
                  onMouseEnter={() => openMenu("offerings")}
                  onMouseLeave={() => closeMenuWithDelay("offerings")}
                >
                  <Link to="/interiors">Interiors</Link>
                  <Link to="/furnishings">Furnishings</Link>
                </div>
              )}
            </div>

            <div className="menu">
              <NavLink to="/price-calculator">Price Calculators</NavLink>
            </div>

            <div className="menu">
              <NavLink to="/modular-journey">The Modular Journey</NavLink>
            </div>

            <div
              className={`menu ${open === "design" ? "on" : ""}`}
              onMouseEnter={() => openMenu("design")}
              onMouseLeave={() => closeMenuWithDelay("design")}
            >
              <button className="menu-btn" type="button">Design Ideas ▾</button>
              {open === "design" && (
                <div
                  className="mega"
                  onMouseEnter={() => openMenu("design")}
                  onMouseLeave={() => closeMenuWithDelay("design")}
                >
                  <div>
                    <h4>Rooms</h4>
                    <Link to="/design-ideas/living-room">Living Room</Link>
                    <Link to="/design-ideas/master-bedroom">Master Bedroom</Link>
                    <Link to="/design-ideas/kitchen">Modular Kitchen</Link>
                    <Link to="/design-ideas/bathroom">Bathroom</Link>
                  </div>


                </div>
              )}
            </div>

            <div
              className={`menu ${open === "cities" ? "on" : ""}`}
              onMouseEnter={() => openMenu("cities")}
              onMouseLeave={() => closeMenuWithDelay("cities")}
            >
              <button className="menu-btn" type="button">Cities ▾</button>
              {open === "cities" && (
                <div
                  className="mega cities-grid"
                  onMouseEnter={() => openMenu("cities")}
                  onMouseLeave={() => closeMenuWithDelay("cities")}
                >
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/city/${city.slug}`}
                      onClick={() => setOpen(null)}
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div
            className="user"
            ref={userRef}
           >
            {/* <button
              className="user-btn"
              type="button"
              aria-haspopup="true"
              aria-expanded={openUser}
            ><NavLink to="/admin/login" className="user-item" role="menuitem">
                  Log in<span className="user-icon">👤</span>
                </NavLink>
            </button> */}
<div className="user" ref={userRef}>
  {!isAdminLoggedIn ? (
    // 🔐 NOT LOGGED IN
    <button
      className="user-btn"
      type="button"
      onClick={() => navigate("/admin/login")}
    >
      Log in <span className="user-icon">👤</span>
    </button>
  ) : (
    // 🔓 LOGGED IN
    <button
      className="user-btn"
      type="button"
      onClick={handleLogout}
    >
      Logout <span className="user-icon">🚪</span>
    </button>
  )}
</div>

            {openUser && (
              <div
                className="user-menu"
                onMouseEnter={userOpenNow}
                onMouseLeave={userCloseWithDelay}
                role="menu"
              >
                <NavLink to="/admin/login" className="user-item" role="menuitem">
                  Log in
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
