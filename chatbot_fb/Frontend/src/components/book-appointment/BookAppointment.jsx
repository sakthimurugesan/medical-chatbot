import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AppointmentBooking.css'; // Custom CSS for styling
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
const AppointmentBooking = () => {
  const [depts, setDepts] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [isSecondFormDisabled, setIsSecondFormDisabled] = useState(true);
  const nav=useNavigate();
  // Fetch the department values from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/doctors/');
        const uniqueDepts = [...new Set(response.data.map((doctor) => doctor.dept))];
        setDepts(uniqueDepts);
      } catch (error) {
        toast.error('Error fetching departments');
      }
    };
    fetchDepartments();
  }, []);

  // Handle the first form submission to fetch available doctors
  const handleFirstFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDept || !selectedDate) {
      toast.error('Please select a department and date');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/available/available-doctors/`, {
        params: {
          dept: selectedDept,
          date: selectedDate,
        },
      });

      if (response.data.length === 0) {
        toast.info('No doctors available on the selected date');
      } else {
        setAvailableDoctors(response.data);
        setIsSecondFormDisabled(false);
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
    <title>Book appointment</title>
<Navbar></Navbar>
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>

      {/* First Form */}
      <form onSubmit={handleFirstFormSubmit} className="form-group">
        <div>
          <label htmlFor="dept">Select Department:</label>
          <select
            id="dept"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">Select Department</option>
            {depts.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

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
               <th>Book</th>
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
 
 export default AppointmentBooking;
 
