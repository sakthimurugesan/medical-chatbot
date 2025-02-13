import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyAppointments.css'; // Optional CSS for table styling
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
    const userId=parseInt(localStorage.getItem('userId'),10);
    const navigate=useNavigate();
    useEffect(() => {
      // Check if the user is logged in by checking for user data in localStorage
      const userData = JSON.parse(localStorage.getItem('user')); // Parse the stored user data
  
      if (!userData || !userData.name) {
        // If the user is not logged in, redirect them to the login page
        // Pass the current page URL in state so we can return here after login
        navigate('/login', { state: { from: window.location.pathname } });
      }
    }, [navigate]);
  // Fetch appointments from the backend API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/appointments/my-appointments/?patientId=${userId}`);
      setAppointments(response.data); // Set fetched appointments in state
      console.table(response.data)
    } catch (error) {
      toast.error('Error fetching appointments');
    }
  };

  // Use useEffect to fetch appointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (

    <>
    <title>My appointments</title>
    <Navbar></Navbar>
    <div className="my-appointments">
      <h2>My Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Appointment ID</th>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Transaction Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={appointment.appointment_id}>
                <td>{index + 1}</td>
                <td>{appointment.appointment_id}</td>
                <td>{appointment.doctor_name}</td>
                <td>{appointment.dept}</td>
                <td>{appointment.date}</td>
                <td>{appointment.transaction_id}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No appointments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <Footer></Footer>
    </>
    



  );
};

export default MyAppointments;
