import { Link, Navigate } from "react-router-dom";
import './AdminNav.css'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userAction';
import { toast, ToastContainer } from 'react-toastify';

function AdminNav() {
    
const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logout());
  setTimeout(() => {
    toast.error("Logged out successfully!");
    
  }, 500);
};
    return (
        <>
            <div className="admin-nav">
                
                <Link to='/'>Home</Link>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/dashboard/doctors'>Doctors</Link>
                <Link to='/dashboard/patients'>Users</Link>
                <Link to='/dashboard/appointments'>Appointments</Link>
                <Link to='/dashboard/available'>Availablity</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>

        </>
    )
}

export default AdminNav;