from sklearn.ensemble import RandomForestClassifier
from sklearn.multiclass import OneVsRestClassifier

def train_model(X, y):
    model = OneVsRestClassifier(
        RandomForestClassifier(random_state=42)
    )
    model.fit(X, y)
    return model

def predict(model, X):
    return model.predict(X)
