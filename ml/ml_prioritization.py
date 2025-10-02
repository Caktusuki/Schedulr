import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import joblib

def main():
    # Load data
    data = pd.read_csv("ml/data.csv")
    df = pd.DataFrame(data)

    # Features and target
    X = df[['DeadlineDays','Complexity','Importance','OverdueCount']]
    y = df['Priority']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(model, "ml/task_priority_model.pkl")
    print("✅ Model saved as task_priority_model.pkl")

    # Test predictions for specific TaskIDs
    for tid in [1, 4, 5, 7, 10]:
        task = df[df['TaskID'] == tid][['DeadlineDays','Complexity','Importance','OverdueCount']]
        if not task.empty:
            pred = model.predict(task)[0]
            print(f"Priority of Task {tid}: {pred}")

    # Evaluate model
    y_pred = model.predict(X_test)
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
    print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

    # # User input prediction for demo
    # print("\n🔹 Enter custom task features to predict priority:")
    # deadline_days = int(input("Enter DeadlineDays: "))
    # complexity = int(input("Enter Complexity: "))
    # importance = int(input("Enter Importance: "))
    # overdue_count = int(input("Enter OverdueCount: "))

    # features = [[deadline_days, complexity, importance, overdue_count]]
    # prediction = model.predict(features)[0]
    # print("Predicted Priority:", prediction)

if __name__ == "__main__":
    main()
