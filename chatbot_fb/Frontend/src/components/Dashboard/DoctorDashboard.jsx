import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const email = useSelector((state) => state.user.email); // Assuming email is stored in the Redux state

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Fetch appointments for the logged-in doctor
                const response = await axios.get(`http://127.0.0.1:8000/appointments/my-appointments/?doctorId=${parseInt(localStorage.getItem('userId'), 10)}`);
                console.log(response)
                console.log(`http://localhost:8000/appointments?doctorId=${parseInt(localStorage.getItem('userId'), 10)}`)
                const uniqueAppointments = getUniqueAppointments(response.data);
                setAppointments(uniqueAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [email]);

    // Function to filter unique appointments by date
    const getUniqueAppointments = (appointments) => {
        const unique = new Map();
        appointments.forEach((appointment) => {
            // Assuming appointment.date is the field you want to be unique
            if (!unique.has(appointment.date)) {
                unique.set(appointment.date, appointment);
            }
        });
        return Array.from(unique.values());
    };

    return (
        <div className="container">
            <title>Dashboard</title>
            <h2>Doctor Dashboard</h2>
            <h3>Your Appointments</h3>
            {appointments.length === 0 ? (
                <p>No appointments scheduled.</p>
            ) : (
                <ul className="list-group">
                    {appointments.map((appointment) => (
                        <li key={appointment.appointment_id} className="list-group-item">
                            <strong>Date:</strong> {appointment.date} - 
                            <strong>Status:</strong> {appointment.status} - 
                            <Link to={`/appointments/${appointment.date}`} className="btn btn-link">View All appointments</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorDashboard;
