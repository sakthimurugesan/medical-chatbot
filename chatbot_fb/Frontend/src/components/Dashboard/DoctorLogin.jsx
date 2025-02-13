import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userAction'; // Import setUser action

const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Invalid email address.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/doctors?email=${email}`);
            // console.log(`http://localhost:8000/doctors?email=${email}`)
            console.log(response.data)
            console.log(response.data[0])
            if (response.data.length === 0) {
                toast.error("Email not found. Please register.");
            } else if (response.data[0].password !== password) {
                console.log(response.data)
                toast.error("Incorrect password.");
            } else {
                const user = response.data[0];
                dispatch(setUser(user.name, email));
                localStorage.setItem('userId', user.id); // Save user ID to localStorage
                console.log("Doctor Response Data:", response.data);
                console.log("Doctor ID Being Set:", response.data[0].id);
                
                toast.success("Login successful!");
                navigate('/doctor-dashboard'); // Redirect to Doctor Dashboard
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <>
            <title>Doctor Login</title>

            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Doctor Log in</h3>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label className="form-label">Email address</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label className="form-label">Password</label>
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <button type="submit" className="btn btn-info btn-lg btn-block">Login</button>
                                    </div>
                                    <p className="small mb-5 pb-lg-2"><a className="text-muted" href="/forget-password">Forgot password?</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer />
        </>
    );
};

export default DoctorLogin;
