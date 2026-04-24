# pipeline/backend.py
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import Optional

# ------------------------------
# Load model and scaler
# ------------------------------
BASE_DIR = os.path.dirname(__file__)  # path of backend.py
MODEL_PATH = os.path.join(BASE_DIR, "house_price_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
FEATURE_COLUMNS_PATH = os.path.join(BASE_DIR, "feature_columns.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
FEATURE_COLUMNS = joblib.load(FEATURE_COLUMNS_PATH)

CITY_TO_STATE = {
    "Ahmedabad": "Gujarat",
    "Bangalore": "Karnataka",
    "Chennai": "Tamil Nadu",
    "Delhi": "Delhi",
    "Ghaziabad": "Uttar Pradesh",
    "Hyderabad": "Telangana",
    "Indore": "Madhya Pradesh",
    "Jaipur": "Rajasthan",
    "Kolkata": "West Bengal",
    "Lucknow": "Uttar Pradesh",
    "Mumbai": "Maharashtra",
    "Nagpur": "Maharashtra",
    "Noida": "Uttar Pradesh",
    "Pune": "Maharashtra",
    "Surat": "Gujarat",
}

SELLER_TO_OWNER_TYPE = {
    "Agent": "Agent",
    "Broker": "Agent",
    "Dealer": "Agent",
    "Builder": "Builder",
    "Owner": "Owner",
}

# ------------------------------
# Preprocessing function
# ------------------------------
def preprocess_input(user_input: dict):
    row = {column: 0 for column in FEATURE_COLUMNS}

    bhk = user_input.get("BHK") or user_input.get("BHK_NO") or user_input.get("bhk") or 3
    size = user_input.get("Size_in_SqFt") or user_input.get("SQUARE_FT") or user_input.get("area") or 1000
    ready_to_move = int(user_input.get("READY_TO_MOVE", 1))
    resale = int(user_input.get("RESALE", 1))
    under_construction = int(user_input.get("UNDER_CONSTRUCTION", 0))

    row["BHK"] = bhk
    row["Size_in_SqFt"] = size
    row["Year_Built"] = user_input.get("Year_Built", 2018)
    row["Floor_No"] = user_input.get("Floor_No", 3)
    row["Total_Floors"] = user_input.get("Total_Floors", 10)
    row["Age_of_Property"] = user_input.get("Age_of_Property", 6)
    row["Nearby_Schools"] = user_input.get("Nearby_Schools", 3)
    row["Nearby_Hospitals"] = user_input.get("Nearby_Hospitals", 2)
    row["Public_Transport_Accessibility"] = user_input.get("Public_Transport_Accessibility", 1)
    row["Parking_Space"] = user_input.get("Parking_Space", 1)
    row["Security"] = user_input.get("Security", 1)
    row["Amenities_Count"] = user_input.get("Amenities_Count", 3)

    city = user_input.get("city") or user_input.get("City") or "Bangalore"
    city_column = f"City_{city}"
    if city_column in row:
        row[city_column] = 1

    state = user_input.get("state") or user_input.get("State") or CITY_TO_STATE.get(city)
    state_column = f"State_{state}"
    if state and state_column in row:
        row[state_column] = 1

    property_type = user_input.get("property_type") or user_input.get("Property_Type") or "Apartment"
    property_type_column = f"Property_Type_{property_type}"
    if property_type_column in row:
        row[property_type_column] = 1

    furnished_status = user_input.get("furnished_status") or user_input.get("Furnished_Status") or "Unfurnished"
    furnished_column = f"Furnished_Status_{furnished_status}"
    if furnished_column in row:
        row[furnished_column] = 1

    facing = user_input.get("facing") or user_input.get("Facing") or "East"
    facing_column = f"Facing_{facing}"
    if facing_column in row:
        row[facing_column] = 1

    seller = user_input.get("seller_type") or user_input.get("Owner_Type") or "Builder"
    owner_type = SELLER_TO_OWNER_TYPE.get(seller, seller)
    owner_column = f"Owner_Type_{owner_type}"
    if owner_column in row:
        row[owner_column] = 1

    if ready_to_move:
        row["Availability_Status_Ready to Move"] = 1
    if resale:
        row["Availability_Status_Resale"] = 1
    if under_construction:
        row["Availability_Status_Under Construction"] = 1

    df = pd.DataFrame([row], columns=FEATURE_COLUMNS)
    return scaler.transform(df)

# ------------------------------
# FastAPI app
# ------------------------------
app = FastAPI(title="House Price Prediction API")

# Enable CORS -- tighten this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend/backend origin(s)
    allow_methods=["*"],
    allow_headers=["*"]
)

# ------------------------------
# Request model
# ------------------------------
class HouseInput(BaseModel):
    BHK_NO: int
    SQUARE_FT: float
    city: str
    seller_type: str
    state: Optional[str] = None
    property_type: str = "Apartment"
    furnished_status: str = "Unfurnished"
    facing: str = "East"
    Parking_Space: int = 1
    Year_Built: int = 2018
    Floor_No: int = 3
    Total_Floors: int = 10
    Age_of_Property: int = 6
    Nearby_Schools: int = 3
    Nearby_Hospitals: int = 2
    Public_Transport_Accessibility: int = 1
    Security: int = 1
    Amenities_Count: int = 3
    UNDER_CONSTRUCTION: int = 0
    RERA: int = 1
    READY_TO_MOVE: int = 1
    RESALE: int = 1
    LONGITUDE: float = 12.9716
    LATITUDE: float = 77.5946

# ------------------------------
# Prediction endpoint
# ------------------------------
@app.post("/predict")
def predict_price(user_input: HouseInput):
    processed_input = preprocess_input(user_input.dict())
    prediction = model.predict(processed_input)
    return {"predicted_price_lacs": float(prediction[0])}

@app.get("/")
def read_root():
    return {"message": "Welcome to House Price Prediction API"}

# Only run uvicorn if launched directly (useful for local dev)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True)
