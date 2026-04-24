// // src/routes/predict.js
// import express from "express";
// import axios from "axios";
// const router = express.Router();

// router.post("/predict", async (req, res) => {
//   try {
//     // forward the incoming JSON to Python service
//     const pythonResp = await axios.post("http://python-service:5000/predict", req.body, {
//       headers: { "Content-Type": "application/json" }
//     });

//     // optionally transform the response or add auth checks etc.
//     return res.json(pythonResp.data);
//   } catch (err) {
//     console.error("Predict error:", err?.response?.data || err.message);
//     return res.status(500).json({ error: "Prediction failed" });
//   }
// });

// export default router;
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Read Python backend URL from .env
const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:5000";

console.log("Python backend used =", PYTHON_API_URL);

router.post("/", async (req, res) => {
  try {
    const pythonResp = await axios.post(
      `${PYTHON_API_URL}/predict`,
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    return res.json(pythonResp.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const detail = err?.response?.data || err.message || "Prediction failed";
    const message =
      typeof detail === "string"
        ? detail
        : detail?.detail
          ? JSON.stringify(detail.detail)
          : JSON.stringify(detail);

    console.error("Predict error:", message);
    return res.status(status).json({ error: message || "Prediction failed" });
  }
});

export default router;
