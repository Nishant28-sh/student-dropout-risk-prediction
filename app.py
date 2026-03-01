from flask import Flask, render_template, request
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load saved files
with open('model_results/random_forest_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('model_results/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('model_results/onehot_encoder.pkl', 'rb') as f:
    encoder = pickle.load(f)

with open('model_results/training_columns.pkl', 'rb') as f:
    training_columns = pickle.load(f)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        feature1 = float(request.form['feature1'])
        feature2 = float(request.form['feature2'])
        category = request.form['category']

        # Create DataFrame
        input_df = pd.DataFrame({
            'feature1': [feature1],
            'feature2': [feature2],
            'category': [category]
        })

        # One-hot encode categorical
        encoded = encoder.transform(input_df[['category']])
        encoded_df = pd.DataFrame(encoded, columns=encoder.get_feature_names_out())

        # Combine numeric + encoded
        input_final = pd.concat([input_df[['feature1', 'feature2']], encoded_df], axis=1)

        # Align with training columns
        input_final = input_final.reindex(columns=training_columns, fill_value=0)

        # Scale
        input_scaled = scaler.transform(input_final)

        # Predict
        prediction = model.predict(input_scaled)[0]

        return render_template('result.html', prediction=prediction)

    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True)