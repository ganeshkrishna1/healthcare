import React, { useState } from "react";
import "./FindDoctor.css";
import Select from 'react-select';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "../../components/ui/Button";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Modal from '../../components/Modal/Modal';
import { Checkmark } from 'react-checkmark'
import { useNavigate  } from "react-router-dom";
function FindDoctor() {
    const navigate = useNavigate();
    const [showConformation,setShowConfirmation] = useState(false);
    const [bookingMessage, setbookingMessage] = useState({

    })
    const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    
    setSelectedDate(date._d);
    // console.log(date);
  };
    const [selectedSymptoms, setSelectedSymptoms] = useState('');
    const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const handleOnClick = () =>{
        let message = 'Your appointment is confirmed on '+selectedDate;
        setbookingMessage(message);
        setShowConfirmation(true);
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
    const handleModalClose=()=>{
        setShowConfirmation(!showConformation);
        navigate('/home');
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
                        <div className="appointment-time-selector">
                            <div className="appointment-time-selector-text">
                                Select your date and time for scheduling appointment
                            </div>
                        <Datetime className="appointment-time-selector-input" dateFormat="MM-dd-yyyy" selected={selectedDate} timeIntervals={30} timeFormat="hh:mm" onChange={handleDateChange} showTimeSelect updateOnView="time"/>
                            {/* <div className="appointment-time-selector-input">
                            </div> */}
                        </div>
                        <div className="book-appointment-button">
                    <Button
                        label="Book Appointment"
                        buttonType="primary"
                        handleFunction={handleOnClick}
                    />
                </div>
                    </>
                )}
            </div>
            {showConformation && 
            <Modal>
            <Checkmark size='60px' color='green' />
            <div className="modal-message">{typeof bookingMessage === 'string' ? bookingMessage : ''}</div>      <Button
            label="Continue to Dashboard"
            buttonType="primary"
            handleFunction={handleModalClose}
          />
      </Modal>
            }
        </div>
    );
}

export default FindDoctor;