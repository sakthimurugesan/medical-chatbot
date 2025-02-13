import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import './home.css';
import TestimonialSlider from './Slider';

function Home() {
  const { name } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all events
    axios.get('http://localhost:8000/doctors/?trend1=1')
      .then(response => {
        // Filter events where trend is true (1)
        const trendingEvents = response.data.filter(event => event.trend1 === 1);
        setEvents(trendingEvents);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setTimeout(() => {
          toast.error('Error fetching doctors');
        }, 500);
      });
  }, []);

  return (
    <>
      <title>Lotus Hospitals</title>
      <Navbar />
      <div className="home-img">
        <div className="overlay"></div>
        <div className="content">
          <h1>Lotus Hospitals</h1>
        </div>
      </div>
      <h2 className='head-1'>Top rated doctors</h2>
      <div className="event-100">
        <div className="event-80">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-img">
                {/* Display an image if available */}
                {event.image && <img className='event-card-img' src={event.image} width={300} height={210} alt={event.name} />}
              </div>
              <div className="event-title">
                <h5>{event.name}</h5>
              </div>
              <div className="event-details">
                <div className="event-detail-value">
                  <span><b>Dept</b></span>
                  <span>{event.dept}</span>
                </div>
                <div className="event-detail-value">
                  <span><b>Qualification</b></span>
                  <span>{event.qualification}</span>
                </div>
                <div className="event-detail-value">
                  <span><b>Email</b></span>
                  <span>{event.email}</span>
                </div>
                <div className="event-detail-value">
                  <span><b>Phone</b></span>
                  <span>{event.phone}</span>
                </div>
                <a href={`/doctor-details/${event.id}`}>
                  <button type="button" className="btn btn-primary">View</button>
                </a>
              </div>

            </div>
          ))}

        </div>
      </div>
      <TestimonialSlider />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Home;
