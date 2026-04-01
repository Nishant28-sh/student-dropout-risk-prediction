from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# ── Load both pkl files ──────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model  = joblib.load(os.path.join(BASE_DIR, "dropout_binary_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "dropout_binary_scaler.pkl"))

# ── Feature engineering (must match training exactly) ────────────
def add_features(df):
    df = df.copy()
    df['pass_rate_1st_sem'] = (
        df['Curricular units 1st sem (approved)'] /
        (df['Curricular units 1st sem (enrolled)'] + 1e-5)
    )
    df['pass_rate_2nd_sem'] = (
        df['Curricular units 2nd sem (approved)'] /
        (df['Curricular units 2nd sem (enrolled)'] + 1e-5)
    )
    df['financial_risk'] = (
        (df['Tuition fees up to date'] == 0).astype(int) + df['Debtor']
    )
    df['grade_improvement'] = (
        df['Curricular units 2nd sem (grade)'] -
        df['Curricular units 1st sem (grade)']
    )
    df['total_approved'] = (
        df['Curricular units 1st sem (approved)'] +
        df['Curricular units 2nd sem (approved)']
    )
    df['eval_rate_1st_sem'] = (
        df['Curricular units 1st sem (evaluations)'] /
        (df['Curricular units 1st sem (enrolled)'] + 1e-5)
    )
    df['eval_rate_2nd_sem'] = (
        df['Curricular units 2nd sem (evaluations)'] /
        (df['Curricular units 2nd sem (enrolled)'] + 1e-5)
    )
    df['sem_consistency'] = abs(
        df['pass_rate_1st_sem'] - df['pass_rate_2nd_sem']
    )
    df['total_evaluations'] = (
        df['Curricular units 1st sem (evaluations)'] +
        df['Curricular units 2nd sem (evaluations)']
    )
    df['grade_trend'] = (
        df['Curricular units 2nd sem (grade)'] /
        (df['Curricular units 1st sem (grade)'] + 1e-5)
    )
    df['economic_pressure'] = (
        df['Unemployment rate'] * df['Debtor']
    )
    return df

# ── Column order (must match X_eng.columns from training) ────────
FEATURE_COLUMNS = [
    'Marital Status', 'Application mode', 'Application order', 'Course',
    'Daytime/evening attendance', 'Previous qualification',
    'Previous qualification (grade)', 'Nacionality',
    "Mother's qualification", "Father's qualification",
    "Mother's occupation", "Father's occupation", 'Admission grade',
    'Displaced', 'Educational special needs', 'Debtor',
    'Tuition fees up to date', 'Gender', 'Scholarship holder',
    'Age at enrollment', 'International',
    'Curricular units 1st sem (credited)',
    'Curricular units 1st sem (enrolled)',
    'Curricular units 1st sem (evaluations)',
    'Curricular units 1st sem (approved)',
    'Curricular units 1st sem (grade)',
    'Curricular units 1st sem (without evaluations)',
    'Curricular units 2nd sem (credited)',
    'Curricular units 2nd sem (enrolled)',
    'Curricular units 2nd sem (evaluations)',
    'Curricular units 2nd sem (approved)',
    'Curricular units 2nd sem (grade)',
    'Curricular units 2nd sem (without evaluations)',
    'Unemployment rate', 'Inflation rate', 'GDP',
    # engineered
    'pass_rate_1st_sem', 'pass_rate_2nd_sem', 'financial_risk',
    'grade_improvement', 'total_approved', 'eval_rate_1st_sem',
    'eval_rate_2nd_sem', 'sem_consistency', 'total_evaluations',
    'grade_trend', 'economic_pressure'
]

# ── Routes ────────────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Build raw dataframe from form input
        raw = {
            'Marital Status':                              int(data.get('marital_status', 1)),
            'Application mode':                            int(data.get('app_mode', 1)),
            'Application order':                           int(data.get('app_order', 1)),
            'Course':                                      int(data.get('course', 9254)),
            'Daytime/evening attendance':                  int(data.get('daytime_attend', 1)),
            'Previous qualification':                      int(data.get('prev_qual', 1)),
            'Previous qualification (grade)':              float(data.get('prev_qual_grade', 130.0)),
            'Nacionality':                                 int(data.get('nationality', 1)),
            "Mother's qualification":                      int(data.get('mother_qual', 1)),
            "Father's qualification":                      int(data.get('father_qual', 1)),
            "Mother's occupation":                         int(data.get('mother_occ', 5)),
            "Father's occupation":                         int(data.get('father_occ', 5)),
            'Admission grade':                             float(data.get('admission_grade', 130.0)),
            'Displaced':                                   int(data.get('displaced', 0)),
            'Educational special needs':                   int(data.get('special_needs', 0)),
            'Debtor':                                      int(data.get('debtor', 0)),
            'Tuition fees up to date':                     int(data.get('tuition_up_to_date', 1)),
            'Gender':                                      int(data.get('gender', 1)),
            'Scholarship holder':                          int(data.get('scholarship', 0)),
            'Age at enrollment':                           int(data.get('age', 20)),
            'International':                               int(data.get('intl', 0)),
            'Curricular units 1st sem (credited)':         int(data.get('cu1_credited', 0)),
            'Curricular units 1st sem (enrolled)':         int(data.get('cu1_enrolled', 6)),
            'Curricular units 1st sem (evaluations)':      int(data.get('cu1_evaluations', 6)),
            'Curricular units 1st sem (approved)':         int(data.get('cu1_approved', 6)),
            'Curricular units 1st sem (grade)':            float(data.get('cu1_grade', 13.0)),
            'Curricular units 1st sem (without evaluations)': int(data.get('cu1_without_eval', 0)),
            'Curricular units 2nd sem (credited)':         int(data.get('cu2_credited', 0)),
            'Curricular units 2nd sem (enrolled)':         int(data.get('cu2_enrolled', 6)),
            'Curricular units 2nd sem (evaluations)':      int(data.get('cu2_evaluations', 6)),
            'Curricular units 2nd sem (approved)':         int(data.get('cu2_approved', 6)),
            'Curricular units 2nd sem (grade)':            float(data.get('cu2_grade', 13.0)),
            'Curricular units 2nd sem (without evaluations)': int(data.get('cu2_without_eval', 0)),
            'Unemployment rate':                           float(data.get('unemployment', 10.8)),
            'Inflation rate':                              float(data.get('inflation', 1.4)),
            'GDP':                                         float(data.get('gdp', 1.74)),
        }

        df = pd.DataFrame([raw])
        df = add_features(df)
        df = df.reindex(columns=FEATURE_COLUMNS, fill_value=0)

        scaled = scaler.transform(df)
        prob   = float(model.predict_proba(scaled)[0][1])
        pred   = int(model.predict(scaled)[0])

        if prob >= 0.75:
            risk  = "HIGH"
            emoji = "🔴"
            msg   = "This student is at serious risk of dropping out. Immediate counseling recommended."
        elif prob >= 0.50:
            risk  = "MEDIUM"
            emoji = "🟡"
            msg   = "This student shows some risk factors. Monitor closely and offer support."
        else:
            risk  = "LOW"
            emoji = "🟢"
            msg   = "This student appears to be on track. Keep up the good work!"

        return jsonify({
            'success':     True,
            'probability': round(prob * 100, 1),
            'prediction':  'Dropout' if pred == 1 else 'Not Dropout',
            'risk':        risk,
            'emoji':       emoji,
            'message':     msg
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
