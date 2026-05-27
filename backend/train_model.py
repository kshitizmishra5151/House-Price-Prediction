import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from xgboost import XGBRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# 1. Load and Clean
df = pd.read_csv('lucknow_dataset.csv')

# Handle missing values
df['carpet_area'] = pd.to_numeric(df['carpet_area'], errors='coerce')
df['carpet_area'] = df['carpet_area'].fillna(df['area_sq_ft'] * 0.7)
df['status'] = df['status'].fillna('StatusReady')
df = df.drop_duplicates()

# Features & Target
X = df[['bhk', 'type', 'area_sq_ft', 'location', 'bathrooms', 'carpet_area', 'status']]
y = df['price_lakh']

# 2. Preprocessor
categorical_features = ['type', 'location', 'status']
preprocessor = ColumnTransformer(
    transformers=[('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)],
    remainder='passthrough'
)

# 3. Create three separate pipelines
pipe_xgb = Pipeline([('pre', preprocessor), ('model', XGBRegressor(n_estimators=100))])
pipe_rf  = Pipeline([('pre', preprocessor), ('model', RandomForestRegressor(n_estimators=100))])
pipe_lr  = Pipeline([('pre', preprocessor), ('model', LinearRegression())])

# 4. Train all three
print("Training Ensemble Models (XGB, RF, LR)...")
pipe_xgb.fit(X, y)
pipe_rf.fit(X, y)
pipe_lr.fit(X, y)

# 5. Save all models as a dictionary
ensemble_models = {
    'xgb': pipe_xgb,
    'rf': pipe_rf,
    'lr': pipe_lr
}

with open('model.pkl', 'wb') as f:
    pickle.dump(ensemble_models, f)

print("✅ Success: Ensemble brain created with weighted logic!")