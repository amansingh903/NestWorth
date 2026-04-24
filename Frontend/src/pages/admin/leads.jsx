import React, { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken");

  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/leads", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.status === 401) {
        logout();
        return;
      }

      const data = await res.json();
      setLeads(data.leads);
    } catch (err) {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const updateAttended = async (id, value) => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/leads/${id}/attended`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ attended: value }),
      }
    );

    if (res.status === 401) {
      logout();
      return;
    }

    // update UI
    setLeads((prev) =>
      prev.map((l) =>
        l._id === id ? { ...l, attended: value } : l
      )
    );
  } catch {
    alert("Failed to update status");
  }
};


  const logout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  if (loading) return <p style={{ padding: 24 }}>Loading leads…</p>;
  if (error) return <p style={{ padding: 24, color: "red" }}>{error}</p>;

  return (
    <div style={page}>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>City</th>
              <th>Type</th>
              <th>Attended</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan="6" style={empty}>
                  No leads found
                </td>
              </tr>
            )}

            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <strong>{lead.name}</strong>
                  <div style={muted}>{lead.email}</div>
                </td>

                <td>{lead.phone}</td>
                <td>{lead.city || "-"}</td>

                <td>
                  <span style={chip}>{lead.type}</span>
                </td>

                <td>
  <div style={btnGroup}>
    <button
      onClick={() => updateAttended(lead._id, true)}
      disabled={lead.attended === true}
      style={{
        ...btn,
        background: lead.attended ? "#16a34a" : "#e5e7eb",
        color: lead.attended ? "#fff" : "#111827",
        cursor: lead.attended ? "default" : "pointer",
      }}
    >
      Yes
    </button>

    <button
      onClick={() => updateAttended(lead._id, false)}
      disabled={lead.attended === false}
      style={{
        ...btn,
        background: !lead.attended ? "#dc2626" : "#e5e7eb",
        color: !lead.attended ? "#fff" : "#111827",
        cursor: !lead.attended ? "default" : "pointer",
      }}
    >
      No
    </button>
  </div>
</td>


                <td style={muted}>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const page = {
  padding: 24,
};

const title = {
  marginBottom: 16,
  fontSize: 22,
};

const tableWrap = {
  background: "#fff",
  borderRadius: 12,
  overflow: "auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const empty = {
  textAlign: "center",
  padding: 20,
  color: "#6b7280",
};

const muted = {
  fontSize: 12,
  color: "#6b7280",
};

const chip = {
  background: "#e5e7eb",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
};

const statusBtn = {
  border: "none",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 600,
};
const btnGroup = {
  display: "flex",
  gap: 6,
};

const btn = {
  border: "none",
  borderRadius: 999,
  padding: "6px 14px",
  fontSize: 13,
  fontWeight: 600,
};
