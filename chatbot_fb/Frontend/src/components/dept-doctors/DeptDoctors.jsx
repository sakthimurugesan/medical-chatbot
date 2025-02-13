import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams,useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './DeptDoctors.css'; // Custom CSS for styling
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const DeptDoctors = () => {
  const { dept } = useParams(); // Get department from the URL
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const nav=useNavigate();
  // Handle form submission to fetch available doctors
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/available/available-doctors/`, {
        params: {
          dept: dept, // Use the department from the URL
          date: selectedDate,
        },
      });

      if (response.data.length === 0) {
        toast.info('No doctors available on the selected date');
      } else {
        setAvailableDoctors(response.data);
        toast.success('Doctors available!');
      }
    } catch (error) {
      toast.error('Error fetching available doctors');
    }
  };

  const handleBookDoctor = (doctorId) => {
    const userData = JSON.parse(localStorage.getItem('user')); // Parse the stored user data

    if (!userData || !userData.name) {
      // If the user is not logged in, redirect them to the login page
      // Pass the current page URL in state so we can return here after login
      nav('/login', { state: { from: window.location.pathname } });
    }
    // Navigate to the payment page with userId, doctorId, and selectedDate in the URL
    else
    nav(`/payment/${doctorId}/${selectedDate}`);
  };

  return (

<>
<title>{dept} Doctors</title>
<Navbar></Navbar>
    <div className="dept-doctors">
      <h2>Available Doctors in {dept} Department</h2>

      {/* Form for selecting date */}
      <form onSubmit={handleFormSubmit} className="form-group">
        <div>
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button type="submit">Check Availability</button>
      </form>

      {/* Display Doctors in a Table */}
      {availableDoctors.length > 0 && (
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Details</th>
              <th>Booking</th>
            </tr>
          </thead>
          <tbody>
            {availableDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>
                  <img
                    src={doctor.photo || 'https://via.placeholder.com/100'}
                    alt={doctor.name}
                    className="doctor-photo"
                  />
                </td>
                <td>
                  <ul>
                    <li><strong>Name:</strong> {doctor.name}</li>
                    <li><strong>Gender:</strong> {doctor.gender}</li>
                    <li><strong>Qualification:</strong> {doctor.qualification}</li>
                    <li><strong>Email:</strong> {doctor.email}</li>
                    <li><strong>Phone:</strong> {doctor.phone}</li>
                  </ul>
                </td>
                <td>
                   <button
                     className="book-button"
                     onClick={() => handleBookDoctor(doctor.id)}
                   >
                     Book Appointment
                   </button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
<Footer></Footer>
</>


  );
};

export default DeptDoctors;
