// src/layouts/EditorLayout.jsx
import React from "react";

export default function EditorLayout({ title, sidebar, children }) {
  return (
    <div 
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#f9fafb",
        fontFamily: "Inter, sans-serif"
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflowY: "auto",
        }}
      >
        <h2 
          style={{
            fontSize: "1.3rem",
            fontWeight: 600,
            marginBottom: "10px",
            color: "#111827"
          }}
        >
          {title}
        </h2>

        {/* The button tools you pass */}
        {sidebar}
      </div>

      {/* MAIN CANVAS AREA */}
      <div
        style={{
          flexGrow: 1,
          position: "relative",
          background: "#f3f4f6",
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
