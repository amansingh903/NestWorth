<div align="center">

# 🏡 NestWorth


### Discover your space. Know its worth.

*A full-stack home interior & real estate platform for India — ML-powered house price predictions, curated interior packages, and a built-in lead management pipeline.*

<br/>

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)

</div>


---

## What does this do ?

NestWorth is a full-stack home services platform built for the Indian real estate market. It pairs a **Gradient Boosting ML model** trained on 30,000+ real India housing records with a polished interior design showcase — letting users estimate property value, explore curated furnishing packages, and connect with the team through a built-in lead pipeline.

Admins get a separate JWT-protected dashboard to view and manage all incoming inquiries.

---

## ✨ Features

| Feature | Details |
|---|---|
|  **AI Price Prediction** | GradientBoosting model · R² = 0.85 · MAE ≈ ₹44.77L · 59 engineered features |
|  **BHK Estimator** | Visual pricing tool adjustable by BHK type, area (sq ft), rooms, and package tier |
|  **Interior Showcase** | Curated galleries — furnishings, modular kitchens, wardrobes, living spaces |
|  **Lead Management** | Inquiry submissions stored in MongoDB; admin-accessible via protected API |
|  **Admin Panel** | JWT-based auth middleware to view, manage, and delete leads |
|  **City Coverage Map** | Visual preview of serviceable areas across India |
|  **Customer Reviews** | Testimonials section with real social proof |

---

### Backend & ML — detailed breakdown

- **ML pipeline end-to-end** — data cleaning, feature engineering (23 raw columns → 59 features), model selection & comparison, training, and serialization of `.pkl` artifacts
- **Model serving** — `/api/predict` route that loads the pre-trained model once at startup and runs inference without reloading on each request
- **Backend API** — Express server, MongoDB connection, lead CRUD, JWT admin auth middleware
- **Project architecture** — defined the Node→Python subprocess pattern for serving a scikit-learn model from an Express API

---

## 🤖 ML Model — How I Built It

### Model Selection

I evaluated three approaches before finalizing:

GBM outperformed both Linear Regression and Random Forest across all metrics on this dataset. The mix of categorical features (city, furnishing level) and numerical ones (area, rooms) — plus non-linear interactions between them — made tree-based boosting the clear winner. Final model: **R² = 0.8513, MAE = ₹44.77L**.

### Training Stats

```
Dataset     : 30,000 rows · 23 raw columns → 59 engineered features
Train / Test: 24,000 / 6,000
──────────────────────────────────────
R²          : 0.8513
MAE         : ₹44.77 Lakhs
Train time  : 24.2s
──────────────────────────────────────
Artifacts   : house_price_model.pkl
              scaler.pkl
              feature_columns.pkl
```

### Feature Engineering Highlights

- One-hot encoded city and furnishing level to prevent ordinal bias
- Derived area-per-room ratio as an additional signal
- Standard-scaled all numerical features using a saved `scaler.pkl` to ensure consistent inference

Key input features: BHK count · total area (sq ft) · number of rooms · furnishing level · location/city · package tier.

---

## ⚡ Challenges & What I Learned

**Serving a Python model from a Node.js API** was the biggest architectural challenge. I settled on spawning a Python subprocess from Express for inference rather than rewriting the pipeline in JS — this kept the ML code clean and avoided library parity issues, at the cost of a slight cold-start latency on the first request.

**Feature engineering city names** was harder than expected. Raw city strings led to high cardinality and sparse one-hot vectors. I ended up grouping low-frequency cities into an "Other" bucket during training and applying the same mapping at inference time via `feature_columns.pkl`, which stores the exact column order the model was trained on.

**Model-frontend contract** — making the BHK estimator UI reflect realistic price ranges required a few iterations of back-and-forth between the prediction endpoint and the frontend state.

---

## 🗺️ Roadmap & Known Limitations

The current MAE of ₹44.77L is solid for a city-level model but leaves room for improvement:

- [ ] **Neighborhood-level granularity** — integrate lat/lng or pincode data for hyperlocal predictions
- [ ] **More recent data** — the training set covers a fixed snapshot; a pipeline to periodically retrain on fresh listings would improve drift resistance
- [ ] **Confidence intervals** — surface a price range (e.g., ₹80L–₹1.1Cr) rather than a point estimate, which is more useful for real buyers
- [ ] **Deployment** — containerize the full stack with Docker Compose for a one-command setup

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   React + Vite      │  ← User enters BHK, area, city, package
│   Frontend          │
└────────┬────────────┘
         │ HTTP
┌────────▼────────────┐
│   Express API       │  ← Validates input, routes request
│   Node.js           │
└──┬─────────────┬────┘
   │             │
   │ Python      │ MongoDB
   │ subprocess  │
┌──▼──────────┐  ┌▼──────────────┐
│ GBM Model   │  │  Lead Store   │  ← Inquiries, admin CRUD
│ .pkl files  │  │  Mongoose     │
└─────────────┘  └───────────────┘
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite |
| **Backend API** | Node.js, Express, MongoDB (Mongoose) |
| **ML Pipeline** | Python, scikit-learn, pandas, numpy |
| **Auth** | JWT · Admin middleware |
| **Data** | India Housing Prices CSV (30k rows, train/test split) |

---

## 📁 Project Structure

```
NestWorth/
├── Frontend/                   # React + Vite frontend
│   ├── public/
│   │   └── images/
│   │       ├── estimates/      # BHK preview images
│   │       ├── furnishings/    # Interior furnishing gallery
│   │       ├── interiors/      # Design showcase images
│   │       ├── maps/           # City coverage map
│   │       └── reviews/        # Customer testimonials
│   └── src/
│
├── Backend/                    # Node.js + Express API
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── leadController.js   # Lead CRUD logic
│   ├── middleware/
│   │   └── adminAuth.js        # JWT admin guard
│   ├── models/
│   │   └── Lead.js             # Lead schema
│   ├── routes/
│   │   ├── leads.js            # Lead endpoints
│   │   ├── adminAuth.js        # Admin auth routes
│   │   └── predict.js          # Price prediction endpoint
│   ├── pipeline/               # ML pipeline
│   │   ├── train_model.py      # Training script
│   │   ├── utils.py            # Feature engineering helpers
│   │   ├── house_price_model.pkl
│   │   ├── scaler.pkl
│   │   └── feature_columns.pkl
│   └── server.js
│
└── Data/                       # Raw training datasets
    ├── Housing.csv
    ├── india_housing_prices.csv
    ├── train.csv
    └── test.csv
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- Python 3.9+ with pip
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/HShekhar79/NestWorth.git
cd NestWorth
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `/Backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@NestWorth.com
ADMIN_PASSWORD=your_admin_password
```

Install Python dependencies:

```bash
pip install scikit-learn pandas numpy fastapi
```

> **Note:** The model is pre-trained — `.pkl` files are already included. To retrain from scratch, run `python pipeline/train_model.py`.

Start the backend server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../Frontend
npm install
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/predict` | — | Predict house price via ML model |
| `POST` | `/api/leads` | — | Submit a new lead / inquiry |
| `GET` | `/api/leads` | Admin JWT | Fetch all leads |
| `DELETE` | `/api/leads/:id` | Admin JWT | Delete a lead |
| `POST` | `/api/admin/login` | — | Admin login → returns JWT |

### Prediction payload example

```json
POST /api/predict
{
  "bhk": 3,
  "area_sqft": 1450,
  "rooms": 5,
  "furnishing": "semi-furnished",
  "city": "Bangalore",
  "package_tier": "premium"
}
```

---

## 🔁 Retraining the Model

```bash
cd Backend/pipeline
python train_model.py
```

Output artifacts (`house_price_model.pkl`, `scaler.pkl`, `feature_columns.pkl`) are saved automatically. The API picks them up on the next server restart — no code changes needed.

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request

---

## 📄 License

Licensed under the **MIT License**. See [`LICENSE.txt`](./LICENSE.txt) for details.

---

<div align="center">

</div>
