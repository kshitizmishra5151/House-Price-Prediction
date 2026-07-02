# 🏠 NestWorth – Lucknow House Price Prediction System

A full-stack Machine Learning web application that predicts residential property prices in **Lucknow** using an ensemble of machine learning models.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Scikit Learn](https://img.shields.io/badge/Scikit--Learn-ML-orange?logo=scikitlearn)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)

---

# 🚀 Live Demo

### 🌐 Frontend
https://house-price-prediction-xi-six.vercel.app/

### ⚙️ Backend API
https://house-price-prediction-11rz.onrender.com/

---

# 📖 Overview

NestWorth is an AI-powered property price prediction platform built using:

- React.js Frontend
- Flask REST API
- Ensemble Machine Learning Model
- Deployment on Vercel and Render

Users can enter property details such as:

- Location
- BHK
- Bathrooms
- Total Area
- Carpet Area
- Property Type
- Construction Status

The application predicts the estimated market value in Lakhs.

---

# 🌟 Project Highlights

- 🤖 Ensemble Machine Learning Model
- ⚛️ Modern React.js Frontend
- 🐍 Flask REST API
- ☁️ Cloud Deployment using Vercel & Render
- 📍 Location-based House Price Prediction
- 📊 Real-time Price Estimation

---

# ✨ Features

- Modern Responsive UI
- Dynamic Location Dropdown
- Ensemble ML Prediction
- REST API
- Real-time House Price Prediction
- Cloud Deployment
- Cross-Origin Enabled (CORS)

---

# 🧠 Machine Learning Model

The prediction is generated using an ensemble of:

- XGBoost Regressor
- Random Forest Regressor
- Linear Regression

### Ensemble Weights

```text
50% XGBoost
30% Random Forest
20% Linear Regression
```

---

# 🏗 Project Structure

```text
House-Price-Prediction
│
├── backend
│   ├── app.py
│   ├── model.pkl
│   ├── train_model.py
│   ├── lucknow_dataset.csv
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── assets
│   ├── homepage.png
│   └── prediction.png
│
└── README.md
```

---

# ⚙️ Tech Stack

## Frontend

- React.js
- CSS
- Axios

## Backend

- Flask
- Flask-CORS
- Pandas
- NumPy

## Machine Learning

- Scikit-Learn
- XGBoost
- Random Forest
- Linear Regression

## Deployment

- GitHub
- Render
- Vercel

---

# 📊 Input Parameters

| Feature | Description |
|----------|-------------|
| Location | Area in Lucknow |
| BHK | Number of Bedrooms |
| Bathrooms | Number of Bathrooms |
| Total Area | Total Area (Sq Ft) |
| Carpet Area | Carpet Area (Sq Ft) |
| Property Type | Apartment / Independent |
| Status | Ready to Move / Under Construction |

---

# 🔥 API Endpoints

## Get Locations

```http
GET /locations
```

Returns all available locations.

---

## Predict Price

```http
POST /predict
```

Example Request

```json
{
  "location": "Gomti Nagar",
  "bhk": 3,
  "bathrooms": 2,
  "area_sq_ft": 1500,
  "carpet_area": 1200,
  "type": "Independent",
  "status": "Ready to Move"
}
```

Example Response

```json
{
  "predicted_price_lakhs": 48.07
}
```

---

# 💻 Run Locally

## Clone Repository

```bash
git clone https://github.com/kshitizmishra5151/House-Price-Prediction.git
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Runs on

```text
http://localhost:5001
```

---

## Frontend

```bash
cd frontend

npm install

npm start
```

Runs on

```text
http://localhost:3000
```

---

# 📸 Screenshots

## 🏠 Home Page

![Home Page](assets/homepage.png)

---

## 📈 Prediction Result

![Prediction Result](assets/prediction.png)

---

# 🚀 Future Improvements

- User Authentication
- Interactive Price Trend Charts
- Multiple City Support
- Google Maps Integration
- Model Retraining Pipeline
- Property Recommendation System

---

# 👨‍💻 Author

**Kshitiz Kumar Mishra**

GitHub  
https://github.com/kshitizmishra5151

LinkedIn  
https://www.linkedin.com/in/kshitiz-kumar-mishra-155533293/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is developed for educational and portfolio purposes.