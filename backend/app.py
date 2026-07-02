from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load the trained ML models
# -----------------------------
with open("model.pkl", "rb") as f:
    models = pickle.load(f)

# -----------------------------
# Load locations for dropdown
# -----------------------------
df_original = pd.read_csv("lucknow_dataset.csv")

valid_locations = sorted([
    loc for loc in df_original["location"].dropna().unique().tolist()
    if loc != "2Bhk"
])

# -----------------------------
# Home Route
# -----------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "Backend is running ✅",
        "project": "NestWorth - House Price Prediction API",
        "version": "1.0",
        "available_endpoints": {
            "GET /": "API Status",
            "GET /locations": "Returns all available locations",
            "POST /predict": "Predict house price"
        }
    })

# -----------------------------
# Get Locations
# -----------------------------
@app.route("/locations", methods=["GET"])
def get_locations():
    return jsonify(valid_locations)

# -----------------------------
# Predict House Price
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        input_data = pd.DataFrame([{
            "bhk": int(data["bhk"]),
            "type": data["type"],
            "area_sq_ft": float(data["area_sq_ft"]),
            "location": data["location"],
            "bathrooms": int(data["bathrooms"]),
            "carpet_area": float(data["carpet_area"]),
            "status": data["status"]
        }])

        # Individual model predictions
        pred_xgb = models["xgb"].predict(input_data)[0]
        pred_rf = models["rf"].predict(input_data)[0]
        pred_lr = models["lr"].predict(input_data)[0]

        # Weighted Ensemble
        final_price = (
            pred_xgb * 0.50 +
            pred_rf * 0.30 +
            pred_lr * 0.20
        )

        return jsonify({
            "predicted_price_lakhs": round(float(final_price), 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400

# -----------------------------
# Custom 404
# -----------------------------
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "available_endpoints": [
            "/",
            "/locations",
            "/predict"
        ]
    }), 404

# -----------------------------
# Run Locally
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)