import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation and useNavigate
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userAction'; // Import setUser action
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  // Use to get the previous page location
  const dispatch = useDispatch();

  // Get the previous URL or default to home if none
  const redirectTo = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/patients?email=${email}`);

      if (response.data.length === 0) {
        toast.error("Email not found. Please register.");
      } else if (response.data[0].password !== password) {
        toast.error("Incorrect password.");
      } else {
        const user = response.data[0];
        dispatch(setUser(user.name, email));
        localStorage.setItem('userId', user.id); // Save user ID to localStorage
        toast.success("Login successful!");

        // Redirect to the previous page or homepage
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <title>Login</title>
      <Navbar />
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
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
                    <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                  <p className="small mb-5 pb-lg-2"><a className="text-muted" href="/forget-password">Forgot password?</a></p>
                  <p>Don't have an account? <a href="/signup" className="link-info">Register here</a></p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block login-img">
            
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
