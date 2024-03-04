import React, { useEffect } from "react";
import { collection, getDocs, getDoc } from "firebase/firestore";
import db from '../firebase';

function Appointments({ setAppointments }) {
    useEffect(() => {
        const fetchData = async () => {
            let tempAppointments = [];
            const querySnapshot = await getDocs(collection(db, 'Appointments'));
            querySnapshot.forEach(async (doc) => {
                let temp = { appointment: { id: doc.id, ...doc.data() } };
                if (temp.appointment.Doctor) {
                    let doctorData = await getDoc(temp.appointment.Doctor);
                    temp.appointment.Doctor = { DoctorID: doctorData.id, ...doctorData.data() };
                }
                if (temp.appointment.Patient) {
                    let patientData = await getDoc(temp.appointment.Patient);
                    temp.appointment.Patient = { PatientID: patientData.id, ...patientData.data() };
                }
                tempAppointments.push(temp);
            });
            setAppointments(tempAppointments); // Set appointments in the parent component
        };
        fetchData(); // Call fetchData function
    }, [setAppointments]); // Add setAppointments as a dependency

    return (
        <>
        </>
    );
}

export default Appointments;
