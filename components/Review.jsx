import React from 'react';
import { urlFor } from '../lib/client';

// Component to display a single review
const SingleReview = ({ review }) => {
    // Generate stars
    let stars = '';
    for (let i = 0; i < review.reviewStars; i++) {
        stars += '⭐';
    }

    return (
        <div className="review-card">
            <div className="reviewerInfo">
                <img
                    src={urlFor(review.reviewerImage)}
                    className="reviewerImage"
                    alt="reviewer image"
                />
                <p className="reviewerName">{review.reviewerName}</p>
            </div>
            <div className="reviewDetails">
                <p className="reviewStars">{stars}</p>
                <p className="reviewDesc">{review.reviewDesc}</p>
                <p className="reviewDate">{review.reviewDate}</p>
            </div>
        </div>
    );
}

// Main Review Component to handle collection of reviews
const Review = ({ reviews }) => {
    return (
        <div>
            <div className="products-heading">
                <div className="horizontal-bar"></div> {/* Left horizontal bar */}
                <h2>Customer Reviews</h2>
                <div className="horizontal-bar"></div> {/* Right horizontal bar */}
            </div>

            <div className="reviews-container">
                {reviews?.map((review) => <SingleReview key={review._id} review={review} />)}
            </div>
        </div>
    );
}

export default Review;
