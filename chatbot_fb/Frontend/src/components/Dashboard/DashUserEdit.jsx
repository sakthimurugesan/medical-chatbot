import AdminNav from './AdminNav';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashUserEdit = () => {
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
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/patients/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching Patients data:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.table(event)
      const formattedEvent = {
        ...event,
        height: parseFloat(event.height),
        weight: parseFloat(event.weight),
      };
      await axios.put(`http://localhost:8000/patients/${id}/`, formattedEvent);
      setTimeout(() => {
        toast.success('Patients Edited successfully!');
      }, 500);
      navigate('/dashboard/patients');
    } catch (error) {
      console.error('Error updating Patients:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/patients/${id}/`);
      setTimeout(() => {
        toast.error('Patients Deleted successfully!');
      }, 500);
      navigate('/dashboard/patients');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="container mt-4">
        <h2>Edit User</h2>
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
              className="form-select"
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
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="termsAccepted"
              checked={event.termsAccepted}
              onChange={(e) => handleChange({ target: { name: 'termsAccepted', value: e.target.checked } })}
            />
            <label className="form-check-label">Terms Accepted</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Weight</label>
            <input
              type="number"
              className="form-control"
              name="weight"
              value={event.weight}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Height</label>
            <input
              type="number"
              className="form-control"
              name="height"
              value={event.height}
              onChange={handleChange}
              step="0.01"
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
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </>
  );
};

export default DashUserEdit;
