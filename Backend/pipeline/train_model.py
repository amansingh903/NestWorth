"""
train_model.py  —  NestWorth ML Pipeline
Dataset : ../../Data/india_housing_realistic.csv  (30 000 rows)
Target  : Price_in_Lakhs
R²      : ~0.85  |  MAE : ~44 Lakhs
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score, mean_absolute_error
import pickle, os, time

# ── Paths ──────────────────────────────────────────────────────────
BASE_DIR    = os.path.dirname(__file__)
DATA_PATH   = os.path.join(BASE_DIR, "../../Data/india_housing_realistic.csv")
MODEL_PATH  = os.path.join(BASE_DIR, "house_price_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
FEAT_PATH   = os.path.join(BASE_DIR, "feature_columns.pkl")

# ── Load ───────────────────────────────────────────────────────────
df = pd.read_csv(DATA_PATH)
print(f"Loaded {len(df):,} rows, {df.shape[1]} columns")

# ── Feature engineering ────────────────────────────────────────────
# Drop leaky / identifier columns
df.drop(columns=["ID", "Locality", "Price_per_SqFt"], inplace=True)

# Amenities → count
df["Amenities_Count"] = df["Amenities"].apply(
    lambda x: len(str(x).split(",")) if pd.notna(x) and str(x).strip() != "" else 0
)
df.drop(columns=["Amenities"], inplace=True)

# Ordinal encode string ordinals (Low/Medium/High etc.)
ORDINAL = {
    "Public_Transport_Accessibility": {"Low": 0, "Medium": 1, "High": 2},
    "Parking_Space":                  {"None": 0, "Single": 1, "Double": 2},
    "Security":                       {"Low": 0, "Medium": 1, "High": 2},
}
for col, mapping in ORDINAL.items():
    df[col] = df[col].map(mapping)

# One-hot encode remaining categoricals
cat_cols = df.select_dtypes(include=["object", "bool", "str"]).columns.tolist()
df = pd.get_dummies(df, columns=cat_cols)

# Safety net — coerce any remaining non-numeric to 0
df = df.apply(pd.to_numeric, errors="coerce").fillna(0)

# ── Split ──────────────────────────────────────────────────────────
X = df.drop(columns=["Price_in_Lakhs"])
y = df["Price_in_Lakhs"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ── Scale ──────────────────────────────────────────────────────────
scaler    = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

print(f"Features : {X_train.shape[1]}")
print(f"Train    : {X_train.shape[0]}  |  Test : {X_test.shape[0]}")

# ── Train ──────────────────────────────────────────────────────────
t0 = time.time()
model = GradientBoostingRegressor(
    n_estimators=400,
    learning_rate=0.05,
    max_depth=5,
    subsample=0.8,
    min_samples_leaf=10,
    random_state=42,
    verbose=1,
)
model.fit(X_train_s, y_train)
print(f"\nTrained in {time.time() - t0:.1f}s")

# ── Evaluate ───────────────────────────────────────────────────────
preds = model.predict(X_test_s)
r2    = r2_score(y_test, preds)
mae   = mean_absolute_error(y_test, preds)
print(f"R²  = {r2:.4f}")
print(f"MAE = ₹{mae:.2f} Lakhs")

# ── Save ───────────────────────────────────────────────────────────
with open(MODEL_PATH,  "wb") as f: pickle.dump(model, f)
with open(SCALER_PATH, "wb") as f: pickle.dump(scaler, f)
with open(FEAT_PATH,   "wb") as f: pickle.dump(list(X.columns), f)
print(f"\nSaved → {MODEL_PATH}")
print(f"Saved → {SCALER_PATH}")
print(f"Saved → {FEAT_PATH}")