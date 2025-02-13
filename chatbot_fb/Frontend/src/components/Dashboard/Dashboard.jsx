// src/components/dashboard/Dashboard.js

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AdminNav from './AdminNav';
const Dashboard = () => {
  return (
 <>
 <AdminNav></AdminNav>
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! This is the admin dashboard.</p>
      <ul>
        <li><a href="/dashboard/doctors">Doctors</a></li>
        <li><a href="/dashboard/patients">Patients</a></li>
        <li><a href="/dashboard/contact">Contact Us</a></li>
        <li><a href="/dashboard/appointments">Appointments</a></li>
   
      </ul>

    </div>
 </>
  );
};

export default Dashboard;
