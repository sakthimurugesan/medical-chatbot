import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppointmentsByDate = () => {
    const { date } = useParams(); // Get the date parameter from the URL
    const [appointments, setAppointments] = useState([]);
    const doctorId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchAppointmentsByDate = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/appointments-by-date?doctorId=${doctorId}&date=${date}`);
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointmentsByDate();
    }, [date, doctorId]);

    return (
        <div className="container">
            <h2>Appointments for {date}</h2>
            {appointments.length === 0 ? (
                <p>No appointments scheduled for this date.</p>
            ) : (
                <ul className="list-group">
                    {appointments.map((appointment) => (
                        <li key={appointment.appointment_id} className="list-group-item">
                            <strong>Id:</strong> {appointment.id} - <strong>Patient:</strong> {appointment.patient_name}- <strong>Email:</strong> {appointment.patient_email}- <strong>Gender:</strong> {appointment.patient_gender}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentsByDate;
