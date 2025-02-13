import AdminNav from './AdminNav';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    name: '',
    self_intro: '',
    image: '',
    dept: '',
    qualification: '',
    dob: '',
    email: '',
    phone: '',
    fees: '',
    education: '',
    date_joined: '',
    gender: '',
    city: '',
    state: '',
    password: '',
    zipcode: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchDoctor = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/doctors/${id}/`);
          setDoctor(response.data);
        } catch (error) {
          console.error('Error fetching doctor data:', error);
        }
      };

      fetchDoctor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'newmanreact'); // Replace with your upload preset
    formData.append('cloud_name', 'dfiyrqut1'); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dfiyrqut1/image/upload', formData);
      return response.data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  const handleSave = async () => {
    setLoading(true); // Start loading
    try {
      let imageUrl = doctor.image;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) {
          console.error('Error uploading image');
          setLoading(false); // Stop loading if there's an error
          return;
        }
      }

      const updatedDoctor = {
        ...doctor,
        image: imageUrl,
      };

      await axios.put(`http://localhost:8000/doctors/${id}/`, updatedDoctor);
      toast.success('Doctor Edited successfully!');
      navigate('/dashboard/doctors');
    } catch (error) {
      console.error('Error updating doctor:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`http://localhost:8000/doctors/${id}/`);
      toast.error('Doctor Deleted successfully!');
      navigate('/dashboard/doctors');
    } catch (error) {
      console.error('Error deleting doctor:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <>
    <title>Edit doctors</title>
      <AdminNav />
      <div className="container mt-4">
        <h2>Edit Doctor</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={doctor.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Self Introduction</label>
            <textarea
              className="form-control"
              name="self_intro"
              value={doctor.self_intro}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              name="dept"
              value={doctor.dept}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Qualification</label>
            <input
              type="text"
              className="form-control"
              name="qualification"
              value={doctor.qualification}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={doctor.dob}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={doctor.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={doctor.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fees</label>
            <input
              type="number"
              className="form-control"
              name="fees"
              value={doctor.fees}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Education</label>
            <textarea
              className="form-control"
              name="education"
              value={doctor.education}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date Joined</label>
            <input
              type="date"
              className="form-control"
              name="date_joined"
              value={doctor.date_joined}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              name="gender"
              value={doctor.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={doctor.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={doctor.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={doctor.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zipcode"
              value={doctor.zipcode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)} // Preview the selected image
                alt="Doctor Preview"
                className="mt-2"
                style={{ maxWidth: '200px' }}
              />
            )}
            {doctor.image && !imageFile && (
              <img
                src={doctor.image} // Display the existing image
                alt="Doctor"
                className="mt-2"
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>

          {loading ? (
            <div className="d-flex justify-content-center mb-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          )}
          <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </>
  );
};

export default DoctorEdit;