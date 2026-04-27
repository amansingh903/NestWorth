import React, { useEffect, useState } from "react";

export default function ProjectJourneyAnimated() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      title: "User Inputs",
      desc: "City, BHK, Area, Furnishing and Property details entered by user.",
      icon: "📝",
    },
    {
      title: "Pricing Logic",
      desc: "City-based multipliers and weighted rules are applied.",
      icon: "🧠",
    },
    {
      title: "Location Preview",
      desc: "Map shifts to selected city and allows marker interaction.",
      icon: "🗺️",
    },
    {
      title: "Price Estimation",
      desc: "Final rate per sq ft and price band is calculated instantly.",
      icon: "💰",
    },
    {
      title: "User Decision",
      desc: "User proceeds for interiors, furnishings or detailed quote.",
      icon: "🏠",
    },
  ];

  return (
    <>
      <style>{`
        .journey {
          background:#0b0f14;
          color:#e8eef6;
          min-height:100vh;
          padding:80px 20px;
        }

        .journey h1 {
          text-align:center;
          font-size:40px;
          margin-bottom:10px;
        }

        .journey p.subtitle {
          text-align:center;
          color:#b7c4d6;
          margin-bottom:60px;
        }

        .timeline {
          max-width:1000px;
          margin:0 auto;
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
          gap:20px;
        }

        .node {
          background:#11161e;
          border:1px solid #243041;
          border-radius:16px;
          padding:20px;
          text-align:center;
          opacity:.35;
          transform:scale(.95);
          transition:all .6s ease;
        }

        .node.active {
          opacity:1;
          transform:scale(1);
          box-shadow:0 0 40px rgba(108,92,231,.4);
          border-color:#6c5ce7;
        }

        .node .icon {
          font-size:36px;
          margin-bottom:10px;
        }

        .node h3 {
          margin:6px 0;
          font-size:18px;
          color:#fff;
        }

        .node p {
          font-size:14px;
          color:#b7c4d6;
        }
      `}</style>

      <div className="journey">
        <h1>Project Journey – How NestWorth Works</h1>
        <p className="subtitle">
          Animated flow showing how user input converts into a smart home price
          estimate
        </p>

        <div className="timeline">
          {steps.map((s, i) => (
            <div key={i} className={`node ${step === i ? "active" : ""}`}>
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
