import React, { useState } from "react";
import Appointments from "./Appointments";

function ParentComponent() {
    const [appointments, setAppointments] = useState([]);

    return (
        <div>
            <h2>Parent Component</h2>
            <Appointments setAppointments={setAppointments} />
            <h3>Appointments:</h3>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.appointment.id}>
                        <p>Appointment ID: {appointment.appointment.id}</p>
                        <p>Appointment Date: {appointment.appointment.AppointmentDate}</p>
                        <p>Patient Name : {appointment.appointment.Patient.FullName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ParentComponent;
