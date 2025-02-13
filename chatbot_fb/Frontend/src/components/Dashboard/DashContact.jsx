import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashContact = () => {
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newAvailability, setNewAvailability] = useState({
    date: '',
    count: 0,
    available: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors list
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/doctors/');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewAvailability = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:8000/available?doctorId=${doctorId}`);
      setAvailability(response.data);
      setSelectedDoctor(doctorId);
      setShowAvailabilityModal(true);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleAddAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:8000/available/', {
        ...newAvailability,
        doctorId: selectedDoctor,
      });
      // Update the availability list after adding a new entry
      setAvailability([...availability, response.data]);
      setNewAvailability({ date: '', count: 0, available: false });
    } catch (error) {
      console.error('Error adding availability:', error);
    }
  };

  const handleCloseModal = () => {
    setShowAvailabilityModal(false);
    setSelectedDoctor(null);
    setAvailability([]);
  };

  return (
    <>
    <title>Contact</title>
      <AdminNav />
      <div className="container mt-4">
        <h2>Doctors List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleViewAvailability(doctor.id)}
                    >
                      View Availability
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to show availability and add new availability */}
      <Modal show={showAvailabilityModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Current Availability</h5>
          <ul>
            {availability.map((avail) => (
              <li key={avail.id}>
                Date: {avail.date}, Count: {avail.count}, Available: {avail.available ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
          <h5>Add New Availability</h5>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newAvailability.date}
                onChange={(e) => setNewAvailability({ ...newAvailability, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCount">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="number"
                value={newAvailability.count}
                onChange={(e) => setNewAvailability({ ...newAvailability, count: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={newAvailability.available}
                onChange={(e) => setNewAvailability({ ...newAvailability, available: e.target.checked })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddAvailability}>
              Add Availability
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashContact;
