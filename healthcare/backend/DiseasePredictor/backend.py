from flask import Flask, request, jsonify
from flask_cors import CORS
from DiseasePredictor import DiseasePredictor
import inflect

app = Flask(__name__)
CORS(app)
p = inflect.engine()

predictor = DiseasePredictor(dataset_path=r"healthcare\backend\DiseasePredictor\archive\Original_Dataset.csv",
                             doctor_data_path=r"healthcare\backend\DiseasePredictor\archive\Doctor_Versus_Disease.csv",
                             description_data_path=r"healthcare\backend\DiseasePredictor\archive\Disease_Description.csv")


# Load data and preprocess it
predictor.load_data()
predictor.preprocess_data()

# Train the models
predictor.train_models()

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    symptoms = request.json['symptoms'].split(',')
    if symptoms is None:
        return jsonify({'error': 'Symptoms not provided'}), 400
    result = predictor.predict_disease(symptoms)
    return result.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)
