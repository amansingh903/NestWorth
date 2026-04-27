// src/pages/ProjectJourney.jsx
import React from "react";
import ProjectJourneyAnimated from "../components/ProjectJourneyAnimated";

export default function ProjectJourney() {
  return (
    <>
      <style>{`
        .journey-page {
          background: #0b0f14;
          color: #e8eef6;
          min-height: 100vh;
        }

        /* HERO */
        .journey-hero {
          padding: 80px 20px 60px;
          text-align: center;
          background: radial-gradient(
              900px 300px at 50% -10%,
              rgba(108,92,231,.18),
              transparent 60%
            );
          border-bottom: 1px solid #1b2433;
        }

        .journey-hero h1 {
          font-size: clamp(32px, 4vw, 48px);
          margin-bottom: 12px;
          color: #ffffff;
        }

        .journey-hero p {
          max-width: 720px;
          margin: 0 auto;
          color: #b7c4d6;
          font-size: 17px;
        }

        /* SECTIONS */
        .journey-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .journey-section h2 {
          font-size: 28px;
          margin-bottom: 30px;
          color: #ffffff;
        }

        /* STEPS */
        .journey-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .journey-step {
          background: #11161e;
          border: 1px solid #243041;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,.25);
        }

        .journey-step span {
          font-size: 13px;
          color: #8a7dff;
          font-weight: 700;
        }

        .journey-step h3 {
          margin: 10px 0 8px;
          font-size: 20px;
          color: #ffffff;
        }

        .journey-step p {
          color: #b7c4d6;
          font-size: 15px;
        }

        /* VIDEOS */
        .journey-videos {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 26px;
        }

        .video-card {
          background: #11161e;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #243041;
        }

        .video-card video {
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: #000;
        }

        .video-body {
          padding: 16px;
        }

        .video-body h4 {
          margin: 0 0 6px;
          font-size: 18px;
          color: #ffffff;
        }

        .video-body p {
          color: #adb9cd;
          font-size: 14px;
        }

        /* WHY SECTION */
        .journey-why {
          background: linear-gradient(180deg, #0f1520, #0b0f14);
          border-top: 1px solid #1b2433;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 22px;
        }

        .why-box {
          background: #11161e;
          border: 1px solid #243041;
          border-radius: 14px;
          padding: 18px;
        }

        .why-box h4 {
          margin-bottom: 6px;
          color: #ffffff;
        }

        .why-box p {
          color: #b7c4d6;
          font-size: 14px;
        }
      `}</style>

      <div className="journey-page">
        {/* HERO */}
        <section className="journey-hero">
          <h1>How NestWorth Works</h1>
          <p>
            From idea to execution — here’s a complete journey of how our home
            price estimation and interior planning platform works.
          </p>
        </section>

        {/* ANIMATED SYSTEM FLOW */}
        <section className="journey-section">
        <h2>Live Project Flow (Animated)</h2>
        <p style={{ color: "#b7c4d6", maxWidth: 720, marginBottom: 30 }}>
            This animation visually explains how user input travels through our
            system — from city selection and pricing logic to map interaction
            and final estimation.
        </p>

        <ProjectJourneyAnimated />
        </section>

        {/* STEPS */}
        <section className="journey-section">
          <h2>Project Journey</h2>

          <div className="journey-steps">
            <div className="journey-step">
              <span>STEP 01</span>
              <h3>Problem Identification</h3>
              <p>
                Users struggle to estimate home prices accurately before
                contacting builders or agents.
              </p>
            </div>

            <div className="journey-step">
              <span>STEP 02</span>
              <h3>Data & Market Research</h3>
              <p>
                City-wise pricing trends, BHK patterns, furnishing and demand
                factors were studied.
              </p>
            </div>

            <div className="journey-step">
              <span>STEP 03</span>
              <h3>Model Design</h3>
              <p>
                A rule-based ML-inspired pricing model was designed using
                weighted multipliers.
              </p>
            </div>

            <div className="journey-step">
              <span>STEP 04</span>
              <h3>UI + UX Development</h3>
              <p>
                React-based interface with instant feedback, live estimation
                and clean UX.
              </p>
            </div>

            <div className="journey-step">
              <span>STEP 05</span>
              <h3>Location Preview</h3>
              <p>
                Map integration using OpenStreetMap to visually represent
                selected city locations.
              </p>
            </div>

            <div className="journey-step">
              <span>STEP 06</span>
              <h3>Final Output</h3>
              <p>
                Instant price band, estimated rate per sq ft and future-ready
                scalable system.
              </p>
            </div>
          </div>
        </section>

        {/* VIDEOS */}
        <section className="journey-section">
          <h2>See It In Action</h2>

          <div className="journey-videos">
            <div className="video-card">
              <video controls muted poster="/images/hero/hero-bg.jpg">
                <source src="/videos/calculator-demo.mp4" type="video/mp4" />
              </video>
              <div className="video-body">
                <h4>Price Calculator Walkthrough</h4>
                <p>How users input details and get instant price estimates.</p>
              </div>
            </div>

            <div className="video-card">
              <video controls muted poster="/images/maps/city-map-preview.jpg">
                <source src="/videos/map-interaction.mp4" type="video/mp4" />
              </video>
              <div className="video-body">
                <h4>Location Preview</h4>
                <p>City-based map interaction and marker movement.</p>
              </div>
            </div>

            <div className="video-card">
              <video controls muted poster="/images/estimates/bhk-2.jpeg">
                <source src="/videos/interior-flow.mp4" type="video/mp4" />
              </video>
              <div className="video-body">
                <h4>Interior & Furnishing Flow</h4>
                <p>From estimate to interiors and furnishings journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="journey-section journey-why">
          <h2>Why This Approach Works</h2>

          <div className="why-grid">
            <div className="why-box">
              <h4>Instant Results</h4>
              <p>No waiting, no sign-up — results are calculated live.</p>
            </div>

            <div className="why-box">
              <h4>City-Based Intelligence</h4>
              <p>Pricing logic adapts automatically to city-level trends.</p>
            </div>

            <div className="why-box">
              <h4>Scalable Design</h4>
              <p>
                Future-ready for locality-level pricing and real ML integration.
              </p>
            </div>

            <div className="why-box">
              <h4>User-Centric UX</h4>
              <p>Designed to be simple, visual and understandable.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
