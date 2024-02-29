import React, { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
    const [openMenuIndex, setOpenMenuIndex] = useState(-1);
    const [arrowRotated, setArrowRotated] = useState(false);

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
    }

    const toggleArrowRotation = () => {
        setArrowRotated(!arrowRotated);
    }

    const menuitems = [
        {
            title: 'Past Appointments',
            content: 'You dont have any past appointments',
        },
        {
            title: 'Upcoming Appointments',
            content: 'You have not scheduled any upcoming appointment',
        },
        {
            title: 'Symptoms Input',
            content: 'Click here to enter symptoms',
        },
        {
            title: 'Find Doctors',
            content: 'Click here to find doctors',
        },
    ];

    return (
        <div className="dashboard-outer-container">
            {/* title bar started */}
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
            {/* title bar ended */}
            {/* dashboard menu list started */}
            <div className="dashboard-menu-list">
                {menuitems.map((item, index) => (
                    <div key={index} className="dashboard-menu-list-item" onClick={() => toggleMenu(index)}>
                        <div className="dashboard-menu-list-item-text">
                            {item.title}
                        </div>
                        <div className="dashboard-menu-list-item-icon">
                            {menuArrowDown(openMenuIndex === index,'white')}
                        </div>
                        {/* child content started*/}
                        {openMenuIndex === index && (
                            <div className="dashboard-menu-list-item-content">
                                {item.content}
                            </div>
                        )}
                        {/* child content ended*/}
                    </div>
                ))}
            </div>
            {/* dashboard menu list ended */}
        </div>
    );
}
