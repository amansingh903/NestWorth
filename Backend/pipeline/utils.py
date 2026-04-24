import pandas as pd

COLUMNS = [
    'UNDER_CONSTRUCTION','RERA','BHK_NO.','SQUARE_FT','READY_TO_MOVE','RESALE',
    'LONGITUDE','LATITUDE',
    'Bangalore','Chennai','Ghaziabad','Jaipur','Kolkata','Lalitpur','Maharashtra','Mumbai','Noida','Other','Pune',
    'Builder','Dealer','Owner'
]

def preprocess_input(user_input: dict, scaler):
    row = {
        'UNDER_CONSTRUCTION': user_input.get('UNDER_CONSTRUCTION', 0),
        'RERA': user_input.get('RERA', 1),
        'BHK_NO.': user_input.get('BHK_NO', 3),
        'SQUARE_FT': user_input.get('SQUARE_FT', 1000),
        'READY_TO_MOVE': user_input.get('READY_TO_MOVE', 1),
        'RESALE': user_input.get('RESALE', 1),
        'LONGITUDE': user_input.get('LONGITUDE', 12.9716),
        'LATITUDE': user_input.get('LATITUDE', 77.5946)
    }

    # Initialize cities and seller types
    for col in COLUMNS[8:19]:
        row[col] = 0
    for col in COLUMNS[19:]:
        row[col] = 0

    # One-hot encode city
    city = user_input.get('city', 'Bangalore')
    row[city if city in COLUMNS[8:19] else 'Other'] = 1

    # One-hot encode seller
    seller = user_input.get('seller_type', 'Builder')
    row[seller if seller in COLUMNS[19:] else 'Owner'] = 1

    df = pd.DataFrame([row], columns=COLUMNS)
    df_scaled = scaler.transform(df)
    return df_scaled