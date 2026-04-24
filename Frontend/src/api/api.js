import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend ka URL
});

export const predictPrice = (formData) => API.post("/predict", formData);
