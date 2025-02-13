import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/homepage/home';
import Login from './components/login/Login';
import DoctorLogin from './components/Dashboard/DoctorLogin';
import Signup from './components/signup/Signup';
import { ToastContainer } from 'react-toastify';
import Event from './components/doctor/Doctor';
import DoctorDetails from './components/doctordetail/DoctorDetails';
import Contact from './components/contact/contact';
import EventRegister from './components/eventregister/EventRegister';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import AboutUs from './components/aboutus/Aboutus';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import DashEvent from './components/Dashboard/DashEvent';
import EventEdit from './components/Dashboard/DashEventEdit'; 
import DashEventAdd from './components/Dashboard/DashEventAdd';
import DashUser from './components/Dashboard/DashUser';
import DashUserEdit from './components/Dashboard/DashUserEdit';
import DashUserAdd from './components/Dashboard/DashUserAdd';
import DashContact from './components/Dashboard/DashContact';
import DashContactEditEdit from './components/Dashboard/DashContactEdit';
import EventRegisterDash   from './components/Dashboard/EventRegister';
import EventRegisterEdit from './components/Dashboard/EventRegisterEdit';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ForgetPassword/ResetPassword';
import AdminLogin from './components/Dashboard/AdminLogin';
import Doctor from './components/doctor/Doctor';
import AppointmentBooking from './components/book-appointment/BookAppointment';
import PaymentPage from './components/payment/Payment';
import DeptDoctors from './components/dept-doctors/DeptDoctors';
import MyAppointments from './components/my-appointments/Myappointment';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import AppointmentsByDate from './components/Dashboard/AppointmentByDate';
import Chatbot from './Bot';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bot" element={<Chatbot />} />
        <Route path="/appointments" element={<AppointmentBooking />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctor-details/:id" element={<DoctorDetails />} />
        <Route path="/dept-doctors/:dept" element={<DeptDoctors />} />
        <Route path="/event-register/:eventId" element={<EventRegister />} />
        <Route path='/payment/:doctorId/:selectedDate' element={<PaymentPage />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/terms-condition" element={<TermsAndConditions />} /> 
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
        <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute>}/>
        <Route path="/doctor-login" element={<DoctorLogin />}/>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
        <Route path="/dashboard/doctors" element={ <PrivateRoute> <DashEvent /> </PrivateRoute>}/>
        <Route path="/doctors-edit/:id" element={ <PrivateRoute> <EventEdit /> </PrivateRoute>}/>
        <Route path="/doctors-add" element={ <PrivateRoute> <DashEventAdd /> </PrivateRoute>}/>
        <Route path="/dashboard/patients" element={ <PrivateRoute> <DashUser /> </PrivateRoute>}/>
        <Route path="/patients-edit/:id" element={ <PrivateRoute> <DashUserEdit /> </PrivateRoute>}/>
        <Route path="/patients-add" element={ <PrivateRoute> <DashUserAdd /> </PrivateRoute>}/>
        <Route path="/dashboard/available" element={ <PrivateRoute> <DashContact /> </PrivateRoute>}/>
        <Route path="/contact-edit/:id" element={ <PrivateRoute> <DashContactEditEdit /> </PrivateRoute>}/>
        <Route path="/dashboard/appointments" element={ <PrivateRoute> <EventRegisterDash /> </PrivateRoute>}/>
        <Route path="/appointments-edit/:id" element={ <PrivateRoute> <EventRegisterEdit /> </PrivateRoute>}/>
        <Route path='/admin-login' element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/appointments/:date" element={<AppointmentsByDate />} />

      </Routes>
<Chatbot></Chatbot>
    </Router>
  );
}

export default App;
