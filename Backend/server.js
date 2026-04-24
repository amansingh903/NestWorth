
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";

console.log("Loaded PORT =", process.env.PORT);
console.log("Loaded PYTHON_API_URL =", process.env.PYTHON_API_URL);

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import predictRoute from "./routes/predict.js";
import leadsRoute from "./routes/leads.js";
import adminAuth from "./routes/adminAuth.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/predict", predictRoute);
app.use("/api/leads", leadsRoute);
app.use("/api/admin", adminAuth);
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
