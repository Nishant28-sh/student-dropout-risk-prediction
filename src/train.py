import os
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

from data_loader import load_data
from preprocessing import preprocess
from model import train_model

df = load_data("data/data.csv")

X, y, encoder, scaler = preprocess(df, fit=True)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = train_model(X_train, y_train)

accuracy = accuracy_score(y_test, model.predict(X_test))
print(f"Accuracy: {accuracy*100:.1f}%")

os.makedirs("model", exist_ok=True)

with open("model/random_forest_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("model/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

with open("model/onehot_encoder.pkl", "wb") as f:
    pickle.dump(encoder, f)

with open("model/training_columns.pkl", "wb") as f:
    pickle.dump(X.columns.tolist(), f)
