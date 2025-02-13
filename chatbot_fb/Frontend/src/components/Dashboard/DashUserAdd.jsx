import AdminNav from './AdminNav';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashUserAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    city: '',
    state: '',
    zipcode: '',
    gender: '',
    termsAccepted: false,
    weight: '',
    height: '',
    blood: '',
  });

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/patients/${id}`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    try {
      // Convert height and weight to float
      const formattedEvent = {
        ...event,
        height: parseFloat(event.height),
        weight: parseFloat(event.weight),
      };
  
      console.log(formattedEvent);
  
      await axios.post('http://localhost:8000/patients/', formattedEvent);
      toast.success('Patient Added Successfully');
      navigate('/dashboard/patients');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  
  return (
    <>
    <title>Users</title>
      <AdminNav />
      <div className="container mt-4">
        <h2>{id ? 'Edit User' : 'Add User'}</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={event.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={event.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={event.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={event.dob}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={event.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={event.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Zipcode</label>
            <input
              type="text"
              className="form-control"
              name="zipcode"
              value={event.zipcode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              name="gender"
              value={event.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              name="weight"
              value={event.weight}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              className="form-control"
              name="height"
              value={event.height}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blood Type</label>
            <input
              type="text"
              className="form-control"
              name="blood"
              value={event.blood}
              onChange={handleChange}
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="termsAccepted"
              checked={event.termsAccepted}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Accept Terms and Conditions</label>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default DashUserAdd;
