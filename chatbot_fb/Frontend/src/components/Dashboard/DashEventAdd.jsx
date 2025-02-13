import AdminNav from './AdminNav';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorAdd = () => {
    const [formData, setFormData] = useState({
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
        zipcode: '',
    });
    const [imageFile, setImageFile] = useState(null); // Store the file temporarily
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Set the image file
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the image preview URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state

        let imageUrl = '';
        // If an image file is selected, upload it
        if (imageFile) {
            const formDataImage = new FormData();
            formDataImage.append('file', imageFile); // Correctly append the image file
            formDataImage.append('upload_preset', 'newmanreact'); // Replace with your upload preset
            formDataImage.append('cloud_name', 'dfiyrqut1'); // 

            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dfiyrqut1/image/upload', formDataImage);
                imageUrl = res.data.secure_url; // Get the image URL
                toast.success('Image uploaded successfully!');
            } catch (err) {
                toast.error('Image upload failed. Please try again.');
                setLoading(false);
                return; // Exit if the image upload fails
            }
        }

        // Set the image URL in formData
        const finalFormData = {
            ...formData,
            image: imageUrl, // Add the image URL to formData
        };

        try {
            await axios.post('http://localhost:8000/doctors/', finalFormData);
            toast.success('Doctor added successfully!');
            setFormData({
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
                zipcode: '',
            });
            
            setImageFile(null); // Reset image file
            setImagePreview(null); // Reset image preview after submission
        } catch (err) {
            toast.error('Failed to add doctor. Please check your input and try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    return (
        <div className="container mt-5">
            <title>Add doctor</title>
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="self_intro" className="form-label">Self Introduction</label>
                    <textarea className="form-control" name="self_intro" value={formData.self_intro} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} required />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="img-fluid mt-3" style={{ maxWidth: '200px' }} />
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="dept" className="form-label">Department</label>
                    <input type="text" className="form-control" name="dept" value={formData.dept} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <input type="text" className="form-control" name="qualification" value={formData.qualification} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="fees" className="form-label">Fees</label>
                    <input type="number" step="0.01" className="form-control" name="fees" value={formData.fees} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="education" className="form-label">Education</label>
                    <textarea className="form-control" name="education" value={formData.education} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date_joined" className="form-label">Date Joined</label>
                    <input type="date" className="form-control" name="date_joined" value={formData.date_joined} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="zipcode" className="form-label">Zip Code</label>
                    <input type="text" className="form-control" name="zipcode" value={formData.zipcode} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Doctor'}
                </button>
            </form>
        </div>
    );
};

export default DoctorAdd;
