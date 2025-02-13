import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DoctorPrivateRoute = ({ children }) => {
  const email = useSelector((state) => state.user.email);

  // Check if the logged-in user has a doctor email
  const isDoctor = email.endsWith('@lotus.doctor.com');

  return isDoctor ? children : <Navigate to="/doctor-login" />;
};

export default DoctorPrivateRoute;
