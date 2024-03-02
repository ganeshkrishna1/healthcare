import React, { useState, useEffect } from "react";
import "./FindDoctor.css";
import Select from 'react-select';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "../../components/ui/Button";

function FindDoctor() {
    const [selectedSymptoms, setSelectedSymptoms] = useState('');
    const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const handleOnClick = () =>{

    }

    const updateSpecialization = (event) => {
        setSelectedSymptoms(event.value);
        const filtered = doctorsList.filter(doctor => doctor.specialization === event.value);
        setFilteredDoctors(filtered);
        setSelectedDoctorIndex(null);
    }

    const selectDoctor = (doctorIndex) => {
        setSelectedDoctorIndex(doctorIndex);
    }

    const doctorsList = [
        {
            name: "Scott Wann",
            specialization: "Neurologist",
            rating: 2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsam vero, aperiam ipsum repellat tempora, veritatis, aspernatur voluptate harum quo autem velit odio aliquid enim qui eveniet eum voluptas fuga?"
        },
        {
            name: "John Doe",
            specialization: "General Physician",
            rating: 3,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsam vero, aperiam ipsum repellat tempora, veritatis, aspernatur voluptate harum quo autem velit odio aliquid enim qui eveniet eum voluptas fuga?"
        },
        {
            name: "Alice Smith",
            specialization: "Baby Care",
            rating: 4,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsam vero, aperiam ipsum repellat tempora, veritatis, aspernatur voluptate harum quo autem velit odio aliquid enim qui eveniet eum voluptas fuga?"
        }
    ];

    return (
        <div className="dashboard-outer-container">
            <div className="dashboard-header">
                <div className="dashboard-header-text">
                    Find doctors
                </div>
            </div>
            <div className="dashboard-menu-list">
                <Select
                    options={[
                        { value: "Neurologist", label: "Neurologist" },
                        { value: "General Physician", label: "General Physician" },
                        { value: "Baby Care", label: "Baby Care" }
                    ]}
                    placeholder={'Select specialization'}
                    clearable={true}
                    onChange={updateSpecialization}
                />

                {selectedSymptoms && (
                    <div className="doctors-list-displayer">
                        {filteredDoctors.map((doctor, index) => (
                            <div className={`doctors-list-item ${selectedDoctorIndex === index ? 'selected' : ''}`} key={index} onClick={() => selectDoctor(index)}>
                                <div className="doctors-list-item-logo">
                                    <img src="assets/doctor.png" alt="" />
                                </div>
                                <div className="doctors-list-item-details">
                                    <div className="doctor-name">{doctor.name}</div>
                                    <Stack spacing={1}>
                                        <Rating name={`rating-${index}`} value={doctor.rating} size="large" readOnly />
                                    </Stack>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedDoctorIndex !== null && (
                    <>
                        <div className="doctor-name-logo">
                            <div className="doctor-logo">
                                <img src="assets/doctor.png" alt="" />
                            </div>
                            <div className="show-doctor-book-appointment">
                                <div className="doctor-name-specialization">
                                    <div className="doctor-name">{filteredDoctors[selectedDoctorIndex].name}</div>
                                    <div className="doctor-specialization">{filteredDoctors[selectedDoctorIndex].specialization}</div>
                                </div>
                            </div>
                        </div>

                        <div className="doctor-description-details">
                            <div className="doctor-description-title">Description</div>
                            <div className="doctor-description-content">{filteredDoctors[selectedDoctorIndex]?.description}</div>
                        </div>
                        <div className="button-group">
                    <Button
                        label="Book Appointment"
                        buttonType="primary"
                        handleFunction={handleOnClick}
                    />
                </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FindDoctor;