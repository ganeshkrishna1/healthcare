import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Appointments from "../Appointments";
export default function Dashboard() {
    const navigate = useNavigate();
    const [openMenuIndex, setOpenMenuIndex] = useState(-1);
    const [arrowRotated, setArrowRotated] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const menuArrowDown = (rotated, fillColor) => {
        const rotationStyle = rotated ? { transform: 'rotate(180deg)' } : {};
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={rotationStyle} className="icon-transition">
                <path d="m6 9 6 6 6-6" />
            </svg>
        );
    }

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? -1 : index);
        console.log(index);
    }

    const toggleArrowRotation = () => {
        setArrowRotated(!arrowRotated);
    }
    const pastAppointments = () => {
        console.log(appointments);
        return appointments.map(Appointment => (
            <div key={Appointment.id}>
                <p>{Appointment.appointment.AppointmentDate}</p>
                <p>{Appointment.appointment.AppointmentTime}</p>
                <p>{Appointment.appointment.Doctor.FullName}</p>
            </div>
        ));
    }

    const upcomingAppointments = () => {
        console.log('Upcoming Appointments clicked');
    }

    const symptomsInput = () => {
        console.log('Symptoms Input clicked');
        navigate('/SymptomsInput');
    }

    const findDoctors = () => {
        navigate('/FindDoctor');
    }

    const menuitems = [
        {
            title: 'Past Appointments',
            content: pastAppointments(),
            click: pastAppointments
        },
        {
            title: 'Upcoming Appointments',
            content:  upcomingAppointments(),
            click: upcomingAppointments
        },
        {
            title: 'Symptoms Input',
            content: 'Click here to enter symptoms',
            click: symptomsInput
        },
        {
            title: 'Find Doctors',
            content: 'Click here to find doctors',
            click: findDoctors
        },
    ];

    return (
        <div className="dashboard-outer-container">
            <Appointments setAppointments={setAppointments} />
            <div className="dashboard-header">
                <div className="dashboard-header-text">
                    Dashboard
                </div>
                <div className="dashboard-header-menu">
                    <img className="user-logo" src="assets/Patient-logo.jpg" alt="logo" />
                    <div className="user-logo-arrow" onClick={toggleArrowRotation}>
                        {menuArrowDown(arrowRotated,'black')}
                    </div>
                </div>
            </div>
            <div className="dashboard-menu-list">
                {menuitems.map((item, index) => (
                    <div key={index} className="dashboard-menu-list-item">
                        <div className="dashboard-menu-list-item-text">
                            {item.title}
                        </div>
                        <div className="dashboard-menu-list-item-icon" onClick={() => toggleMenu(index)}>
                            {menuArrowDown(openMenuIndex === index,'white')}
                        </div>
        
                        {openMenuIndex === index && (
                            <div className="dashboard-menu-list-item-content" onClick={item.click}>
                                {item.content}
                            </div>
                        )}
        
                    </div>
                ))}
            </div>
        </div>
    );
}
