import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn import svm
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from collections import Counter

class DiseasePredictor:
    def __init__(self, dataset_path, doctor_data_path, description_data_path):
        self.dataset_path = dataset_path
        self.doctor_data_path = doctor_data_path
        self.description_data_path = description_data_path
        self.algorithms = {
            'Logistic Regression': LogisticRegression(),
            'Decision Tree': tree.DecisionTreeClassifier(),
            'Random Forest': RandomForestClassifier(),
            'SVM': svm.SVC(probability=True),
            'NaiveBayes': GaussianNB(),
            'K-Nearest Neighbors': KNeighborsClassifier()
        }
        self.le = LabelEncoder()
        self.dis_sym_data = None
        self.doc_data = None
        self.des_data = None
        self.X_train = None
        self.y_train = None

    def load_data(self):
        self.dis_sym_data = pd.read_csv(self.dataset_path)
        self.doc_data = pd.read_csv(self.doctor_data_path, encoding='latin1', names=['Disease', 'Specialist'])
        self.des_data = pd.read_csv(self.description_data_path)

    def preprocess_data(self):
        columns_to_check = [col for col in self.dis_sym_data.columns if col != 'Disease']
        symptoms = list(set(self.dis_sym_data.iloc[:, 1:].values.flatten()))
        for symptom in symptoms:
            self.dis_sym_data[symptom] = self.dis_sym_data.iloc[:, 1:].apply(lambda row: int(symptom in row.values), axis=1)
        self.dis_sym_data = self.dis_sym_data.drop(columns=columns_to_check)
        self.dis_sym_data = self.dis_sym_data.loc[:, self.dis_sym_data.columns.notna()]
        self.dis_sym_data.columns = self.dis_sym_data.columns.str.strip()
        var_mod = ['Disease']
        for i in var_mod:
            self.dis_sym_data[i] = self.le.fit_transform(self.dis_sym_data[i])
        self.X_train = self.dis_sym_data.drop(columns="Disease")
        self.y_train = self.dis_sym_data['Disease']

    def train_models(self):
        for model_name, model in self.algorithms.items():
            model.fit(self.X_train, self.y_train)

    def predict_disease(self, symptoms):
        test_data = {}
        predicted = []
        for column in self.X_train.columns:
            test_data[column] = 1 if column in symptoms else 0
        test_df = pd.DataFrame(test_data, index=[0])
        for model_name, model in self.algorithms.items():
            predict_disease = model.predict(test_df)
            predict_disease = self.le.inverse_transform(predict_disease)
            predicted.extend(predict_disease)
        disease_counts = Counter(predicted)
        percentage_per_disease = {disease: (count / len(self.algorithms)) * 100 for disease, count in disease_counts.items()}
        result_df = pd.DataFrame({"Disease": list(percentage_per_disease.keys()),
                                  "Chances": list(percentage_per_disease.values())})
        result_df = result_df.merge(self.doc_data, on='Disease', how='left')
        result_df = result_df.merge(self.des_data, on='Disease', how='left')
        return result_df

    def test_input(self):
        symptoms = input("Enter Symptoms (comma-separated): ").split(",")
        result = self.predict_disease(symptoms)
        return result
