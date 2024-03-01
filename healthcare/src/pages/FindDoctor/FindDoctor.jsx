import React from "react";
import "./FindDoctor.css";
import Select from 'react-select';
import Rating from 'react-rating'
function FindDoctor(){
    const filledStar=()=>{
        return<span class="material-icons-round">
        star_rate
        </span>
    }
    const emptystar=()=>{
        return <span class="material-symbols-outlined">
        star
        </span>
    }
    let symptoms = [
        "Fever", "Cough", "Shortness of breath", "Fatigue", "Muscle or body aches", "Headache",
        "Sore throat", "Loss of taste or smell", "Congestion or runny nose", "Nausea or vomiting",
        "Diarrhea", "Chills", "Repeated shaking with chills", "Sore throat", "New loss of taste or smell",
        "Headache", "Muscle or body aches", "Fatigue", "Sore throat", "Congestion or runny nose",
        "Nausea or vomiting", "Diarrhea", "Fever", "Cough", "Shortness of breath", "Fatigue",
        "Muscle or body aches", "Headache", "Sore throat", "Loss of taste or smell", "Congestion or runny nose",
        "Nausea or vomiting", "Diarrhea", "Chills", "Repeated shaking with chills", "Sore throat",
        "New loss of taste or smell", "Congestion or runny nose", "Nausea or vomiting", "Diarrhea",
        "Headache", "Muscle or body aches", "Fatigue", "Sore throat", "Congestion or runny nose",
        "Nausea or vomiting", "Diarrhea"
    ];

    symptoms = [...new Set(symptoms)];
    symptoms = symptoms.map(symptom => ({ value: symptom, label: symptom }));
    return(
        <>
        <div className="dashboard-outer-container">
            <div className="dashboard-header">
                <div className="dashboard-header-text">
                Find doctors
                </div>
            </div>
            <div className="dashboard-menu-list">
            <Select
                    options={symptoms}
                    placeholder={'Select Symptoms'}
                    clearable={true}
                    isMulti
                />

                <div className="doctors-list-displayer">
                    <div className="doctors-list-item">
                        <div className="doctors-list-item-logo">
                            <img src="assets/doctor.png" alt="" />
                        </div>
                        <div className="doctors-list-item-details">
                            <h3 className="doctor-name">Scott Wann</h3>
                            <p className="doctor-rating">
                            <Rating quiet
  emptySymbol={emptystar()}
  fullSymbol={filledStar()}
  fractions={2}
/>
                            </p>
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>
        </>
    )
}
export default FindDoctor;