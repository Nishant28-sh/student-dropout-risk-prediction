import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from features import (
    COLUMNS_TO_KEEP,
    CATEGORICAL_COLUMNS,
    NUMERICAL_COLUMNS,
    TARGET_MAPPING
)

def preprocess(df: pd.DataFrame, fit=True, encoder=None, scaler=None):
    df = df[COLUMNS_TO_KEEP]

    boolean_columns = {
        'Daytime_evening_attendance': {1: True, 0: False},
        'Displaced': {1: True, 0: False},
        'Educational_special_needs': {1: True, 0: False},
        'Debtor': {1: True, 0: False},
        'Tuition_fees_up_to_date': {1: True, 0: False},
        'Gender': {1: True, 0: False},
        'Scholarship_holder': {1: True, 0: False},
        'International': {1: True, 0: False},
    }

    for col, mapping in boolean_columns.items():
        df[col] = df[col].map(mapping)

    if fit:
        encoder = OneHotEncoder(drop='first', sparse_output=False)
        encoded = encoder.fit_transform(df[CATEGORICAL_COLUMNS])
    else:
        encoded = encoder.transform(df[CATEGORICAL_COLUMNS])

    encoded_df = pd.DataFrame(
        encoded,
        columns=encoder.get_feature_names_out(CATEGORICAL_COLUMNS)
    )

    df = pd.concat([df.drop(columns=CATEGORICAL_COLUMNS), encoded_df], axis=1)

    if fit:
        scaler = StandardScaler()
        df[NUMERICAL_COLUMNS] = scaler.fit_transform(df[NUMERICAL_COLUMNS])
    else:
        df[NUMERICAL_COLUMNS] = scaler.transform(df[NUMERICAL_COLUMNS])

    y = df['Status'].map(TARGET_MAPPING)
    X = df.drop(columns=['Status'])

    return X, y, encoder, scaler
