// // src/pages/PriceCalculator.jsx
// import React, { useMemo, useState, useEffect } from "react";
// import LocationMap from "../components/LocationMap";

// const CITY_LIST = [
//   "Ahmedabad","Amritsar","Bangalore","Bhopal","Bhubaneswar","Bilaspur",
//   "Chennai","Coimbatore","Cuttack","Dehradun","Durgapur","Dwarka",
//   "Faridabad","Gaya","Gurgaon","Guwahati","Haridwar","Hyderabad",
//   "Indore","Jaipur","Jamshedpur","Jodhpur","Kochi","Kolkata",
//   "Lucknow","Ludhiana","Mangalore","Mumbai","Mysore","Nagpur",
//   "New Delhi","Noida","Patna","Pune","Raipur","Ranchi","Silchar",
//   "Surat","Trivandrum","Vijayawada","Vishakhapatnam","Warangal"
// ];


// const formatINR = (n) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(n);

// export default function PriceCalculator() {
//   // Core inputs
//   const [city, setCity] = useState("Bangalore");
//   const [bhk, setBhk] = useState(2);
//   const [baths, setBaths] = useState(2);
//   const [area, setArea] = useState(1000);

//   // Options
//   const [furnishing, setFurnishing] = useState("Unfurnished");
//   const [parking, setParking] = useState("Yes");
//   const [ready, setReady] = useState("Yes");
//   const [resale, setResale] = useState("Yes");
//   const [underConst, setUnderConst] = useState("No");
//   const [seller, setSeller] = useState("Builder");

//   // Map centers
//   // 1. Declare the position state first (defaulting to a general India center)
// const [position, setPosition] = useState([20.5937, 78.9629]);

// // 2. Define the static city coordinates
// const cityCenter = {
//   Delhi: [28.6139, 77.209],
//   Bangalore: [12.9716, 77.5946],
//   Mumbai: [19.076, 72.8777],
//   Hyderabad: [17.385, 78.4867],
//   Pune: [18.5204, 73.8567],
//   Chennai: [13.0827, 80.2707],
//   Kolkata: [22.5726, 88.3639],
//   "New Delhi": [28.6139, 77.209],
//   Gurgaon: [28.4595, 77.0266],
//   Noida: [28.5355, 77.3910],
//   // ... you can add more from your CITY_LIST
// };

// // 3. Determine the 'center' based on the selected city
// const center = useMemo(() => {
//   return cityCenter[city] ?? [20.5937, 78.9629];
// }, [city]);

// // 4. Update the pin (position) whenever the city changes
// useEffect(() => {
//   setPosition(center);
// }, [center]);
//   // -----------------------------
//   // AI MODEL PRICE (REAL ML API)
//   // -----------------------------
//   const [error, setError] = useState(null);
//   const [modelPrice, setModelPrice] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function getModelPrediction() {
//     setLoading(true);
//     setError(null);
//     setModelPrice(null);

//     const payload = {
//       BHK_NO: bhk,
//       SQUARE_FT: area,
//       city,
//       seller_type: seller,
//       UNDER_CONSTRUCTION: underConst === "Yes" ? 1 : 0,
//       RERA: 1,
//       READY_TO_MOVE: ready === "Yes" ? 1 : 0,
//       RESALE: resale === "Yes" ? 1 : 0,
//       LATITUDE: position[0],
//       LONGITUDE: position[1],
//     };

//     try {
//       const res = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Backend error");

//       const data = await res.json();
//       setModelPrice(Number(data.predicted_price_lacs));
//     } catch (err) {
//       console.error(err);
//       setError("Backend not reachable");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       {/* INLINE STYLES FROM FILE 1 */}
//       <style>{`
//         :root{
//           --bg: #0b0f14;
//           --panel: #11161e;
//           --ink: #e8eef6;
//           --muted: #a9b4c2;
//           --ring: #243041;
//           --brand: #6c5ce7;
//           --brand-2: #8a7dff;
//           --glow: 0 24px 80px rgba(108,92,231,.25);
//         }

//         .nav .dropdown a, .nav .mega a { color: #0f172a !important; }
//         .nav .mega h4 { color: #334155 !important; }

//         .pc{ background:#0b0f14; color:var(--ink); min-height:100vh; font-family: sans-serif; }

//         .pc-hero{
//           background: radial-gradient(1200px 300px at 50% -10%, rgba(108,92,231,.15), transparent 60%),
//                       linear-gradient(180deg, #0b0f14, #0b0f14);
//           border-bottom: 1px solid #101621;
//           position: relative;
//           z-index: 1;
//         }
//         .pc-hero-inner{ max-width:1200px; margin:0 auto; padding:34px 18px 28px; }
//         .pc-hero h1{ margin:0 0 6px; font-size:clamp(26px, 3.2vw, 38px); letter-spacing:.3px; color:#ffffff !important; }
//         .pc-hero p{ margin:0; color:var(--muted) }

//         .pc-wrap{
//           max-width:1200px; margin: 0 auto; padding: 22px 18px 40px;
//           display:grid; grid-template-columns: 2fr 1fr; gap:22px;
//         }

//         .pc-card{
//           background:var(--panel); border:1px solid var(--ring);
//           border-radius:16px; padding:18px; box-shadow: var(--glow); margin-bottom: 20px;
//         }
//         .pc-sec-title{ margin:0 0 12px; font-size:18px; color:#ffffff !important; }

//         .pc-grid{ display:grid; grid-template-columns: repeat(2, minmax(220px,1fr)); gap:14px; }
//         .pc-field label{ display:block; font-size:13px; margin:0 0 6px; color:#e5e7eb !important; font-weight:500; }
//         .pc-field select, .pc-field input{
//           width:100%; padding:12px; border-radius:12px; outline:none;
//           border:1px solid #2a394d; background:#0e1420; color:#f1f5f9 !important; font-weight:500;
//         }

//         .pc-step{ display:flex; align-items:center; gap:10px; }
//         .pc-step button{
//           width:34px; height:38px; border-radius:10px;
//           border:1px solid #2a394d; background:#0e1420; color:#e2e8f0 !important; font-weight:700; cursor:pointer;
//         }
//         .pc-step input{ flex:1; text-align:center; color:#f8fafc !important; }

//         .pc-sticky{ position:sticky; top:90px; display:grid; gap:12px; }
//         .pc-summary{
//           background:linear-gradient(180deg, #141a26, #0f1520 35%);
//           border:1px solid var(--ring); border-radius:16px; padding:18px; box-shadow: var(--glow);
//         }
//         .pc-summary h3{ margin:0 0 6px; font-size:16px; color:#cfd9e8; }
//         .pc-price{ font-size:28px; font-weight:800; letter-spacing:.2px; margin:2px 0 6px; color: var(--brand-2); }
//         .pc-sub{ margin:0 0 14px; color:#cfd9e8; }

//         .pc-cta{
//           width:100%; padding:12px 16px; border-radius:12px; border:none; cursor:pointer;
//           font-weight:700; color:#fff; background:linear-gradient(90deg, var(--brand), var(--brand-2));
//           margin-bottom:10px;
//         }
//         .pc-cta:disabled { opacity: 0.6; cursor: not-allowed; }
        
//         .pc-points{ margin:0; padding-left:18px; color:var(--muted); }
//         .pc-points li{ margin:6px 0; }
//         .pc-tip{ background:#0e1420; border:1px dashed #2a394d; color:#b7c4d6; padding:12px 14px; border-radius:12px; font-size:13px; }

//         @media (max-width: 1000px){
//           .pc-wrap{ grid-template-columns: 1fr; }
//           .pc-sticky{ position: static; }
//         }
//       `}</style>

//       <div className="pc">
//         <header className="pc-hero">
//           <div className="pc-hero-inner">
//             <h1>Home Price Calculator</h1>
//             <p>Enter details for an instant estimate and an AI-powered prediction.</p>
//           </div>
//         </header>

//         <main className="pc-wrap">
//           <section className="pc-left">
//             <div className="pc-card">
//               <h2 className="pc-sec-title">Property Details</h2>
//               <div className="pc-grid">
//                 <div className="pc-field">
//                   <label>City</label>
//                   <select value={city} onChange={(e) => setCity(e.target.value)}>
//                       {CITY_LIST.map((c) => (
//                         <option key={c} value={c}>{c}</option>
//                       ))}
//                   </select>
//                 </div>

//                 <div className="pc-field">
//                   <label>BHK</label>
//                   <div className="pc-step">
//                     <button onClick={() => setBhk(Math.max(1, bhk - 1))}>−</button>
//                     <input value={bhk} readOnly />
//                     <button onClick={() => setBhk(bhk + 1)}>+</button>
//                   </div>
//                 </div>

//                 <div className="pc-field">
//                   <label>Bathrooms</label>
//                   <div className="pc-step">
//                     <button onClick={() => setBaths(Math.max(1, baths - 1))}>−</button>
//                     <input value={baths} readOnly />
//                     <button onClick={() => setBaths(baths + 1)}>+</button>
//                   </div>
//                 </div>

//                 <div className="pc-field">
//                   <label>Area (sq ft)</label>
//                   <input type="number" value={area} onChange={(e) => setArea(+e.target.value)} />
//                 </div>

//                 <div className="pc-field">
//                   <label>Furnishing</label>
//                   <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)}>
//                     <option>Unfurnished</option>
//                     <option>Semi-Furnished</option>
//                     <option>Furnished</option>
//                   </select>
//                 </div>

//                 <div className="pc-field">
//                   <label>Parking</label>
//                   <select value={parking} onChange={(e) => setParking(e.target.value)}>
//                     <option>Yes</option>
//                     <option>No</option>
//                   </select>
//                 </div>

//                 <div className="pc-field">
//                   <label>Ready to Move</label>
//                   <select value={ready} onChange={(e) => setReady(e.target.value)}>
//                     <option>Yes</option>
//                     <option>No</option>
//                   </select>
//                 </div>

//                 <div className="pc-field">
//                   <label>Resale Property</label>
//                   <select value={resale} onChange={(e) => setResale(e.target.value)}>
//                     <option>Yes</option>
//                     <option>No</option>
//                   </select>
//                 </div>

//                 <div className="pc-field">
//                   <label>Under Construction</label>
//                   <select value={underConst} onChange={(e) => setUnderConst(e.target.value)}>
//                     <option>No</option>
//                     <option>Yes</option>
//                   </select>
//                 </div>

//                 <div className="pc-field">
//                   <label>Seller</label>
//                   <select value={seller} onChange={(e) => setSeller(e.target.value)}>
//                     <option>Builder</option>
//                     <option>Owner</option>
//                     <option>Dealer</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="pc-card">
//               <h2 className="pc-sec-title">Location Preview</h2>
//               <LocationMap
//                 center={center}
//                 position={position}
//                 setPosition={setPosition}
//                 height={360}
//               />
//               <p style={{ marginTop: 10, color: '#a9b4c2', fontSize: '13px' }}>
//                 📍 Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
//               </p>
//             </div>
//           </section>

//           <aside className="pc-right">
//             <div className="pc-sticky">
//               <div className="pc-summary">
//                 <h3>AI Estimated Price</h3>
//                 <div className="pc-price">
//                   {loading ? "Calculating..." : 
//                    error ? <span style={{ color: "#ff4d4d", fontSize: '16px' }}>{error}</span> :
//                    typeof modelPrice === "number" ? `₹ ${modelPrice.toFixed(2)} Lakhs` : 
//                    "Ready to Predict"}
//                 </div>

//                 <button
//                   className="pc-cta"
//                   type="button"
//                   onClick={getModelPrediction}
//                   disabled={loading}
//                 >
//                   {loading ? "Predicting..." : "Get AI Price Prediction"}
//                 </button>

//                 <ul className="pc-points">
//                   <li>ML-powered backend analysis</li>
//                   <li>Location-specific valuation</li>
//                   <li>Real-time parameter adjustment</li>
//                 </ul>
//               </div>

//               <div className="pc-tip">
//                 Tip: Area & city affect the AI estimate the most. Ensure the map pin is accurate.
//               </div>
//             </div>
//           </aside>
//         </main>
//       </div>
//     </>
//   );
// }
// // src/pages/PriceCalculator.jsx
// import { useMemo, useState, useEffect } from "react";
// import LocationMap from "../components/LocationMap";
// import "./PriceCalculator.css";

// const CITY_MULTIPLIER = {
//   Bangalore: 1.15,
//   Mumbai: 1.35,
//   Delhi: 1.25,
//   Pune: 1.08,
//   Hyderabad: 1.12,
//   Chennai: 1.10,
//   Kolkata: 0.95,
//   Other: 1.0,
// };

// const formatINR = (n) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(n);

// export default function PriceCalculator() {
//   // Core inputs
//   const [city, setCity] = useState("Delhi");
//   const [bhk, setBhk] = useState(2);
//   const [baths, setBaths] = useState(2);
//   const [area, setArea] = useState(1000);

//   // Options
//   const [furnishing, setFurnishing] = useState("Unfurnished");
//   const [parking, setParking] = useState("Yes");
//   const [ready, setReady] = useState("Yes");
//   const [resale, setResale] = useState("Yes");
//   const [underConst, setUnderConst] = useState("No");
//   const [seller, setSeller] = useState("Builder");

//   // ---------- NEW: map center + pin ----------
//   const cityCenter = {
//     Delhi: [28.6139, 77.209],
//     Bangalore: [12.9716, 77.5946],
//     Mumbai: [19.076, 72.8777],
//     Hyderabad: [17.385, 78.4867],
//     Pune: [18.5204, 73.8567],
//     Chennai: [13.0827, 80.2707],
//     Kolkata: [22.5726, 88.3639],
//     Other: [20.5937, 78.9629], // India fallback
//   };

//   const center = useMemo(
//     () => cityCenter[city] ?? [20.5937, 78.9629],
//     [city]
//   );

//   const [position, setPosition] = useState(center);

//   // Recenter/Reset pin when city changes (optional)
//   useEffect(() => {
//     setPosition(center);
//   }, [center]);
//   // -------------------------------------------

//   // Simple “premium looking” fake model
//   const estimate = useMemo(() => {
//     // base rate (INR / sq ft) — toy values to keep page fully client-side
//     const base = 4500;

//     let rate = base * (CITY_MULTIPLIER[city] ?? 1);

//     // adjustments
//     rate *= 1 + Math.max(0, bhk - 2) * 0.04; // more BHK → higher rate
//     rate *= 1 + Math.max(0, baths - 2) * 0.02; // more bathrooms → slightly higher
//     if (parking === "Yes") rate *= 1.03;
//     if (ready === "Yes") rate *= 1.02;
//     if (resale === "No") rate *= 1.02; // new property
//     if (underConst === "Yes") rate *= 0.96; // little cheaper
//     if (seller === "Owner") rate *= 0.99;
//     if (seller === "Dealer") rate *= 1.01;

//     if (furnishing === "Semi-Furnished") rate *= 1.03;
//     if (furnishing === "Furnished") rate *= 1.06;

//     const price = Math.max(0, Math.round(rate * Number(area || 0)));
//     const low = Math.round(price * 0.95);
//     const high = Math.round(price * 1.08);
//     return { price, low, high, rate: Math.round(rate) };
//   }, [
//     city,
//     bhk,
//     baths,
//     area,
//     furnishing,
//     parking,
//     ready,
//     resale,
//     underConst,
//     seller,
//   ]);

//   return (
//     <div className="pc">
//       {/* page header */}
//       <header className="pc-hero">
//         <div className="pc-hero-inner">
//           <h1>Home Price Calculator</h1>
//           <p>
//             Enter a few details to get an instant, model-based price band for
//             your home.
//           </p>
//         </div>
//       </header>

//       <main className="pc-wrap">
//         {/* left: form */}
//         <section className="pc-left">
//           <div className="pc-card">
//             <h2 className="pc-sec-title">Property Details</h2>

//             <div className="pc-grid">
//               {/* City */}
//               <div className="pc-field">
//                 <label>City</label>
//                 <select value={city} onChange={(e) => setCity(e.target.value)}>
//                   {Object.keys(CITY_MULTIPLIER).map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* BHK */}
//               <div className="pc-field">
//                 <label>Number of BHK</label>
//                 <div className="pc-step">
//                   <button
//                     type="button"
//                     onClick={() => setBhk((v) => Math.max(1, v - 1))}
//                   >
//                     −
//                   </button>
//                   <input
//                     value={bhk}
//                     onChange={(e) =>
//                       setBhk(Math.max(1, Number(e.target.value) || 1))
//                     }
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setBhk((v) => Math.min(6, v + 1))}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Bathrooms */}
//               <div className="pc-field">
//                 <label>Bathrooms</label>
//                 <div className="pc-step">
//                   <button
//                     type="button"
//                     onClick={() => setBaths((v) => Math.max(1, v - 1))}
//                   >
//                     −
//                   </button>
//                   <input
//                     value={baths}
//                     onChange={(e) =>
//                       setBaths(Math.max(1, Number(e.target.value) || 1))
//                     }
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setBaths((v) => Math.min(6, v + 1))}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Area */}
//               <div className="pc-field">
//                 <label>Area (sq ft)</label>
//                 <input
//                   type="number"
//                   min="100"
//                   step="10"
//                   value={area}
//                   onChange={(e) =>
//                     setArea(Math.max(100, Number(e.target.value) || 100))
//                   }
//                   placeholder="e.g. 1000"
//                 />
//               </div>

//               {/* Furnishing */}
//               <div className="pc-field">
//                 <label>Furnishing</label>
//                 <select
//                   value={furnishing}
//                   onChange={(e) => setFurnishing(e.target.value)}
//                 >
//                   <option>Unfurnished</option>
//                   <option>Semi-Furnished</option>
//                   <option>Furnished</option>
//                 </select>
//               </div>

//               {/* Parking */}
//               <div className="pc-field">
//                 <label>Car Parking</label>
//                 <select
//                   value={parking}
//                   onChange={(e) => setParking(e.target.value)}
//                 >
//                   <option>Yes</option>
//                   <option>No</option>
//                 </select>
//               </div>

//               {/* Ready to move */}
//               <div className="pc-field">
//                 <label>Ready to Move</label>
//                 <select value={ready} onChange={(e) => setReady(e.target.value)}>
//                   <option>Yes</option>
//                   <option>No</option>
//                 </select>
//               </div>

//               {/* Resale */}
//               <div className="pc-field">
//                 <label>Resale Property</label>
//                 <select value={resale} onChange={(e) => setResale(e.target.value)}>
//                   <option>Yes</option>
//                   <option>No</option>
//                 </select>
//               </div>

//               {/* Under Construction */}
//               <div className="pc-field">
//                 <label>Under Construction</label>
//                 <select
//                   value={underConst}
//                   onChange={(e) => setUnderConst(e.target.value)}
//                 >
//                   <option>No</option>
//                   <option>Yes</option>
//                 </select>
//               </div>

//               {/* Seller */}
//               <div className="pc-field">
//                 <label>Seller Type</label>
//                 <select value={seller} onChange={(e) => setSeller(e.target.value)}>
//                   <option>Builder</option>
//                   <option>Owner</option>
//                   <option>Dealer</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* LOCATION PREVIEW (replaces the iframe, layout unchanged) */}
//           <div className="pc-card">
//             <h2 className="pc-sec-title">Location Preview</h2>
//             <LocationMap
//               center={center}
//               position={position}
//               setPosition={setPosition}
//               height={360}
//             />
//             <p className="pc-note" style={{ marginTop: 10 }}>
//               📍 Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
//             </p>
//           </div>
//         </section>

//         {/* right: sticky summary */}
//         <aside className="pc-right">
//           <div className="pc-sticky">
//             <div className="pc-summary">
//               <h3>Estimated Price</h3>
//               <div className="pc-price">{formatINR(estimate.price)}</div>
//               <div className="pc-band">
//                 {formatINR(estimate.low)} – {formatINR(estimate.high)}
//               </div>
//               <p className="pc-sub">
//                 Est. rate: <strong>{formatINR(estimate.rate)}</strong> / sq ft
//               </p>

//               <button
//                 className="pc-cta"
//                 type="button"
//                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               >
//                 Get a detailed quote
//               </button>

//               <ul className="pc-points">
//                 <li>Instant, on-page calculation</li>
//                 <li>Adjust inputs to refine the band</li>
//                 <li>No sign-up required</li>
//               </ul>
//             </div>

//             <div className="pc-tip">
//               Tip: area &amp; city are the biggest drivers of the estimate. Try
//               changing them first.
//             </div>
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// }
// src/pages/PriceCalculator.jsx
import React from "react";
import { useMemo, useState, useEffect } from "react";
import LocationMap from "../components/LocationMap";
import "./PriceCalculator.css";

// Local client-side multipliers (your fake calculator logic)
const CITY_MULTIPLIER = {
  Bangalore: 1.15,
  Mumbai: 1.35,
  Delhi: 1.25,
  Pune: 1.08,
  Hyderabad: 1.12,
  Chennai: 1.10,
  Kolkata: 0.95,
  Other: 1.0,
};

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function PriceCalculator() {
  // Core inputs
  const [city, setCity] = useState("Delhi");
  const [bhk, setBhk] = useState(2);
  const [baths, setBaths] = useState(2);
  const [area, setArea] = useState(1000);

  // Options
  const [furnishing, setFurnishing] = useState("Unfurnished");
  const [parking, setParking] = useState("Yes");
  const [ready, setReady] = useState("Yes");
  const [resale, setResale] = useState("Yes");
  const [underConst, setUnderConst] = useState("No");
  const [seller, setSeller] = useState("Builder");

  // Map centers
  const cityCenter = {
    Delhi: [28.6139, 77.209],
    Bangalore: [12.9716, 77.5946],
    Mumbai: [19.076, 72.8777],
    Hyderabad: [17.385, 78.4867],
    Pune: [18.5204, 73.8567],
    Chennai: [13.0827, 80.2707],
    Kolkata: [22.5726, 88.3639],
    Other: [20.5937, 78.9629],
  };

  const center = useMemo(
    () => cityCenter[city] ?? [20.5937, 78.9629],
    [city]
  );

  const [position, setPosition] = useState(center);

  useEffect(() => {
    setPosition(center);
  }, [center]);

  // Fake price estimate (client side only)
  // const estimate = useMemo(() => {
  //   const base = 4500;
  //   let rate = base * (CITY_MULTIPLIER[city] ?? 1);

  //   rate *= 1 + Math.max(0, bhk - 2) * 0.04;
  //   rate *= 1 + Math.max(0, baths - 2) * 0.02;
  //   if (parking === "Yes") rate *= 1.03;
  //   if (ready === "Yes") rate *= 1.02;
  //   if (resale === "No") rate *= 1.02;
  //   if (underConst === "Yes") rate *= 0.96;
  //   if (seller === "Owner") rate *= 0.99;
  //   if (seller === "Dealer") rate *= 1.01;
  //   if (furnishing === "Semi-Furnished") rate *= 1.03;
  //   if (furnishing === "Furnished") rate *= 1.06;

  //   const price = Math.max(0, Math.round(rate * Number(area || 0)));
  //   const low = Math.round(price * 0.95);
  //   const high = Math.round(price * 1.08);
  //   return { price, low, high, rate: Math.round(rate) };
  // }, [
  //   city,
  //   bhk,
  //   baths,
  //   area,
  //   furnishing,
  //   parking,
  //   ready,
  //   resale,
  //   underConst,
  //   seller,
  // ]);

  // -----------------------------
  // AI MODEL PRICE (REAL ML API)
  // -----------------------------
  const [modelPrice, setModelPrice] = useState(null);
  const [predictionError, setPredictionError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getModelPrediction() {
    setLoading(true);
    setModelPrice(null);
    setPredictionError("");

    const payload = {
      BHK_NO: bhk,
      SQUARE_FT: area,
      city: city,
      seller_type: seller,
      furnished_status:
        furnishing === "Furnished" ? "Fully Furnished" : furnishing,
      Parking_Space: parking === "Yes" ? 1 : 0,
      property_type: "Apartment",
      UNDER_CONSTRUCTION: underConst === "Yes" ? 1 : 0,
      RERA: 1,
      READY_TO_MOVE: ready === "Yes" ? 1 : 0,
      RESALE: resale === "Yes" ? 1 : 0,
      LONGITUDE: position[1],
      LATITUDE: position[0],
    };

    try {
      const res = await fetch("http://localhost:4000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Prediction failed.");
      }

      const predictedPrice = Number(data.predicted_price_lacs);
      if (!Number.isFinite(predictedPrice)) {
        throw new Error("Prediction API returned an invalid price.");
      }

      setModelPrice(predictedPrice);
    } catch (err) {
      console.error(err);
      setPredictionError(err.message || "Error contacting prediction API.");
    }

    setLoading(false);
  }

  return (
    <div className="pc">
      {/* page header */}
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Home Price Calculator</h1>
          <p>
            Enter a few details to get an instant estimate — and an AI-powered prediction.
          </p>
        </div>
      </header>

      <main className="pc-wrap">
        {/* left */}
        <section className="pc-left">
          <div className="pc-card">
            <h2 className="pc-sec-title">Property Details</h2>
            <div className="pc-grid">

              {/* City */}
              <div className="pc-field">
                <label>City</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  {Object.keys(CITY_MULTIPLIER).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* BHK */}
              <div className="pc-field">
                <label>BHK</label>
                <div className="pc-step">
                  <button onClick={() => setBhk(Math.max(1, bhk - 1))}>−</button>
                  <input value={bhk} onChange={(e) => setBhk(+e.target.value)} />
                  <button onClick={() => setBhk(bhk + 1)}>+</button>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="pc-field">
                <label>Bathrooms</label>
                <div className="pc-step">
                  <button onClick={() => setBaths(Math.max(1, baths - 1))}>−</button>
                  <input value={baths} onChange={(e) => setBaths(+e.target.value)} />
                  <button onClick={() => setBaths(baths + 1)}>+</button>
                </div>
              </div>

              {/* Area */}
              <div className="pc-field">
                <label>Area (sq ft)</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(+e.target.value)}
                />
              </div>

              {/* Other dropdowns */}
              <div className="pc-field">
                <label>Furnishing</label>
                <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)}>
                  <option>Unfurnished</option>
                  <option>Semi-Furnished</option>
                  <option>Furnished</option>
                </select>
              </div>

              <div className="pc-field">
                <label>Parking</label>
                <select value={parking} onChange={(e) => setParking(e.target.value)}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="pc-field">
                <label>Ready to Move</label>
                <select value={ready} onChange={(e) => setReady(e.target.value)}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="pc-field">
                <label>Resale Property</label>
                <select value={resale} onChange={(e) => setResale(e.target.value)}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="pc-field">
                <label>Under Construction</label>
                <select
                  value={underConst}
                  onChange={(e) => setUnderConst(e.target.value)}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              <div className="pc-field">
                <label>Seller</label>
                <select value={seller} onChange={(e) => setSeller(e.target.value)}>
                  <option>Builder</option>
                  <option>Owner</option>
                  <option>Dealer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="pc-card">
            <h2 className="pc-sec-title">Location Preview</h2>
            <LocationMap
              center={center}
              position={position}
              setPosition={setPosition}
              height={360}
            />
            <p className="pc-note" style={{ marginTop: 10 }}>
              📍 Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
            </p>
          </div>
        </section>

        {/* Right Sticky Panel */}
        <aside className="pc-right">
          <div className="pc-sticky">
            <div className="pc-summary">
              <h3>AI Price Prediction</h3>
                <p>Click the button below to get AI-based valuation</p>

              {/* AI Model Button */}
              <button
                className="pc-cta"
                type="button"
                onClick={getModelPrediction}
                disabled={loading}
              >
                {loading ? "Predicting..." : "Get AI Price Prediction"}
              </button>

              {/* AI Model Output */}
              {modelPrice !== null && (
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#b71c1c",
                  }}
                >
                  AI Model Price: &#8377; {modelPrice.toFixed(2)} Lakhs
                </div>
              )}

              {predictionError && (
                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#ff6b6b",
                  }}
                >
                  {predictionError}
                </div>
              )}

              <ul className="pc-points">
                <li>Instant on-page calculation</li>
                <li>AI-powered backend price</li>
                <li>Adjust inputs to refine the value</li>
              </ul>
            </div>

            <div className="pc-tip">
              Tip: Area & city affect both estimates the most.
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
