import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './AdminNav'

const EventRegisterDash = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/appointments/appointments/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/event-register-edit/${id}`);
  };

  const handleAddNewEvent = () => {
    navigate('/dashboard/adduser');
  };

  return (
    <>
    <title>Appointments</title>
    <AdminNav></AdminNav>
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Patient Email</th>
              <th>Doctor Name</th>
              <th>Dept</th>
              <th>Doctor Email</th>
              <th>Staus</th>
              <th>Transaction ID</th>
              
             
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.appointment_id}</td>
                <td>{item.patient_name}</td>
                <td>{item.patient_email}</td>
                <td>{item.doctor_name}</td>
                <td>{item.doctor_dept}</td>
                <td>{item.doctor_email}</td>
                <td>{item.status}</td>
                <td>{item.transaction_id}</td>
               
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
    </div>
    </>
  );
};

export default EventRegisterDash;
