from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Load the ensemble models
with open('model.pkl', 'rb') as f:
    models = pickle.load(f)

# Load locations for the dropdown
df_original = pd.read_csv('lucknow_dataset.csv')
valid_locations = sorted([
    loc for loc in df_original['location'].dropna().unique().tolist() 
    if loc != '2Bhk'
])

@app.route('/locations', methods=['GET'])
def get_locations():
    return jsonify(valid_locations)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_data = pd.DataFrame([{
            'bhk': int(data['bhk']),
            'type': data['type'],
            'area_sq_ft': float(data['area_sq_ft']),
            'location': data['location'],
            'bathrooms': int(data['bathrooms']),
            'carpet_area': float(data['carpet_area']),
            'status': data['status']
        }])
        
        # Get individual predictions
        pred_xgb = models['xgb'].predict(input_data)[0]
        pred_rf  = models['rf'].predict(input_data)[0]
        pred_lr  = models['lr'].predict(input_data)[0]

        # Calculate Weighted Average (50-30-20)
        final_price = (pred_xgb * 0.50) + (pred_rf * 0.30) + (pred_lr * 0.20)

        return jsonify({'price': round(float(final_price), 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)