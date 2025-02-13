
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const {  doctorId, selectedDate } = useParams();
  const [appointmentCreated, setAppointmentCreated] = useState(false);
  const navigate = useNavigate();
  const userId=parseInt(localStorage.getItem('userId'),10)
  useEffect(() => {
    // Check if the user is logged in by checking for user data in localStorage
    const userData = JSON.parse(localStorage.getItem('user')); // Parse the stored user data

    if (!userData || !userData.name) {
      // If the user is not logged in, redirect them to the login page
      // Pass the current page URL in state so we can return here after login
      navigate('/login', { state: { from: window.location.pathname } });
    }
  }, [navigate]);

  useEffect(() => {
    if (appointmentCreated) {
      toast.success("Appointment created successfully!");
      navigate(`/my-appointments`);
    }
  }, [appointmentCreated, navigate]);

  // Function to handle successful payment and create an appointment
  const handleCreateAppointment = async (transactionId,status) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/appointments/create-appointment/', {
        patientId: userId,
        doctorId: doctorId,
        date: selectedDate,
        transactionId:transactionId,
        status:status
      });

      if (response.status === 201) {
        setAppointmentCreated(true);  // Trigger success logic
      }
    } catch (error) {
      console.log(userId, doctorId, selectedDate);  // For debugging
      toast.error("Error creating appointment.");
    }
  };
  return (
    <PayPalScriptProvider options={{ "client-id": "AT8ko-dakUiXRKgRbQwpYjf2kXSlUZJKmmFlOd6R6L3529ttG7nOIZCYKmPJIkznmhcQ8CvQX2Hvgpdx" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.2',  // Example value, replace with your amount
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            console.log(details);
            handleCreateAppointment(details.id,details.status);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
