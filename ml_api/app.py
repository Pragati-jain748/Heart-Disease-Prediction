from fastapi import FastAPI
import pandas as pd
import numpy as np
import joblib 
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def home():
    return {"message" : "Welcome to the Heart Disease Prediction API!"}

model = joblib.load("Logictic_Regression_heart.pkl")
scaler = joblib.load("heart_scaler.pkl")
columns = joblib.load("heart_columns.pkl")

class Information(BaseModel):
    name : str 
    phone : str
    email : str
    age : int
    gender :str
    chest_pain_type : str
    resting_blood_pressure : int
    cholesterol	: int
    fasting_blood_sugar :str
    resting_ecg	: str
    maximum_heart_rate : int
    exercise_angina :str 
    oldpeak :float
    st_slope : str


@app.post("/predict")
def predict(info: Information):

    # Gender Encoding
    if info.gender == "Male":
        Sex_M = 1
    else:
        Sex_M = 0

    # Exercise Angina Encoding
    if info.exercise_angina == "Yes":
        ExerciseAngina_Y = 1
    else:
        ExerciseAngina_Y = 0

    # Fasting Blood Sugar Encoding
    if info.fasting_blood_sugar == "Yes":
        FastingBS = 1
    else:
        FastingBS = 0

    # Chest Pain Encoding
    if info.chest_pain_type == "ATA":
        ChestPainType_ATA = 1
        ChestPainType_NAP = 0
        ChestPainType_TA = 0
    elif info.chest_pain_type == "NAP":
        ChestPainType_ATA = 0
        ChestPainType_NAP = 1
        ChestPainType_TA = 0
    elif info.chest_pain_type == "TA":
        ChestPainType_ATA = 0
        ChestPainType_NAP = 0
        ChestPainType_TA = 1
    else:
        ChestPainType_ATA = 0
        ChestPainType_NAP = 0
        ChestPainType_TA = 0

    # Resting ECG Encoding
    if info.resting_ecg == "Normal":
        RestingECG_Normal = 1
        RestingECG_ST = 0
    elif info.resting_ecg == "ST":
        RestingECG_Normal = 0
        RestingECG_ST = 1
    else:
        RestingECG_Normal = 0
        RestingECG_ST = 0

    # ST Slope Encoding
    if info.st_slope == "Up":
        ST_Slope_Up = 1
        ST_Slope_Flat = 0
    elif info.st_slope == "Flat":
        ST_Slope_Up = 0
        ST_Slope_Flat = 1
    else:
        ST_Slope_Up = 0
        ST_Slope_Flat = 0

    
    data = {
        "Age": info.age,
        "RestingBP": info.resting_blood_pressure,
        "Cholesterol": info.cholesterol,
        "FastingBS": FastingBS,
        "MaxHR": info.maximum_heart_rate,
        "Oldpeak": info.oldpeak,

        "Sex_M": Sex_M,
        "ChestPainType_ATA": ChestPainType_ATA,
        "ChestPainType_NAP": ChestPainType_NAP,
        "ChestPainType_TA": ChestPainType_TA,
        "RestingECG_Normal": RestingECG_Normal,
        "RestingECG_ST": RestingECG_ST,
        "ExerciseAngina_Y": ExerciseAngina_Y,
        "ST_Slope_Flat": ST_Slope_Flat,
        "ST_Slope_Up": ST_Slope_Up
    }

    df = pd.DataFrame(data, index=[0])

    df = df.reindex(columns=columns, fill_value=0)

    scaled_df = scaler.transform(df)

    prediction = model.predict(scaled_df)

    if prediction[0] == 1:
        return {
            "name": info.name,
            "prediction": "High Risk of Heart Disease",
            "recommendation": "Please consult a cardiologist."
        }
    else:
        return {
            "name": info.name,
            "prediction": "Low Risk of Heart Disease",
            "recommendation": "Maintain a healthy lifestyle and regular check-ups."
        }