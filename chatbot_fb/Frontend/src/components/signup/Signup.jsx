import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    zipcode: '',
    weight: '',
    height: '',
    blood: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const nav=useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.dob) errors.dob = 'Date of Birth is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/patients/', formData);
      toast.success('Registration successful!', {
        autoClose: 500, // 
        onClose: () => {
          // Redirect after toast closes
          nav('/');
        }
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <title>Signup</title>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10">
              <h3 className="text-center mb-4">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label className="form-label">Name</label>
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label className="form-label">Email</label>
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label className="form-label">Password</label>
                      {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                      <label className="form-label">Date of Birth</label>
                      {errors.dob && <small className="text-danger">{errors.dob}</small>}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <div className="d-flex align-items-center">
                        <label className="form-label me-2">Gender</label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                      </div>
                      {errors.gender && <small className="text-danger">{errors.gender}</small>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <label className="form-label">City</label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                      <label className="form-label">State</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="text"
                        className="form-control"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                      />
                      <label className="form-label">Zipcode</label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="number"
                        className="form-control"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                      <label className="form-label">Weight (kg)</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="number"
                        className="form-control"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                      />
                      <label className="form-label">Height (cm)</label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-outline mb-0">
                      <input
                        type="text"
                        className="form-control"
                        name="blood"
                        value={formData.blood}
                        onChange={handleChange}
                      />
                      <label className="form-label">Blood Group</label>
                    </div>
                  </div>
                </div>

                <div className="form-check d-flex justify-content-center mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    I agree to all statements in <a href="#">Terms of service</a>
                  </label>
                  {errors.termsAccepted && <small className="text-danger">{errors.termsAccepted}</small>}
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {isLoading ? <span className="spinner-border spinner-border-sm"></span> : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;