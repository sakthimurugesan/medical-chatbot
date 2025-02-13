// src/ReviewsSlider.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewsSlider.css';

const ReviewsSlider = () => {
    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8000/reviews');
                setReviews(response.data); // Assuming the API returns an array of reviews
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const nextReview = () => {
        setCurrentReviewIndex((prevIndex) => 
            (prevIndex + 1) % reviews.length
        );
    };

    const previousReview = () => {
        setCurrentReviewIndex((prevIndex) => 
            (prevIndex - 1 + reviews.length) % reviews.length
        );
    };

    if (reviews.length === 0) {
        return null;
    }

    return (
        <div className="reviews-slider" id="reviewsSlider">
            <button className="review-button" id="previousReviewButton" onClick={previousReview} disabled={reviews.length <= 1}>
                &#10094; {/* Left Arrow */}
            </button>
            <div className="review" id="currentReview">
                <p>{reviews[currentReviewIndex].review}</p>
            </div>
            <button className="review-button" id="nextReviewButton" onClick={nextReview} disabled={reviews.length <= 1}>
                &#10095; {/* Right Arrow */}
            </button>
        </div>
    );
};

export default ReviewsSlider;
