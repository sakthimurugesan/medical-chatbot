import React from 'react';
import './Aboutus.css'; // Assuming you have the CSS in this file
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const AboutUs = () => {
  return (
    <>
      <title>About Us</title>
      <Navbar />
      <div>
        <div className="about-section-1">
          <h1>About Our Hospital</h1>
          <p>
            At Lotus Hospitals, our mission is to provide compassionate, high-quality healthcare to our community. We are committed to excellence in medical care, cutting-edge technology, and the well-being of our patients.
          </p>
        </div>

        <h2 style={{ textAlign: 'center' }}>Our Medical Team</h2>
        <div className="row-1">
          <div className="column-1">
            <div className="card-1">
              <img src="https://codingyaar.com/wp-content/uploads/headshot-1-scaled.jpg" alt="Dr. Smith" style={{ width: '100%' }} />
              <div className="container-1">
                <h2>Dr. Jane Smith</h2>
                <p className="title-1">Chief Medical Officer</p>
                <p>With over 20 years of experience, Dr. Smith specializes in cardiology and is dedicated to patient-centered care.</p>
                <p>dr.smith@example.com</p>
                <p><button className="button-1">Contact</button></p>
              </div>
            </div>
          </div>

          <div className="column-1">
            <div className="card-1">
              <img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" alt="Dr. Johnson" style={{ width: '100%' }} />
              <div className="container-1">
                <h2>Dr. Michael Johnson</h2>
                <p className="title-1">Director of Surgery</p>
                <p>Dr. Johnson leads our surgical department, ensuring the highest standards in patient safety and surgical excellence.</p>
                <p>dr.johnson@example.com</p>
                <p><button className="button-1">Contact</button></p>
              </div>
            </div>
          </div>

          <div className="column-1">
            <div className="card-1">
              <img src="https://codingyaar.com/wp-content/uploads/headshot-3-scaled.jpg" alt="Dr. Clark" style={{ width: '100%' }} />
              <div className="container-1">
                <h2>Dr. Robert Clark</h2>
                <p className="title-1">Head of Pediatrics</p>
                <p>Dr. Clark is passionate about providing the best care for children and their families, with a focus on preventive healthcare.</p>
                <p>dr.clark@example.com</p>
                <p><button className="button-1">Contact</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
