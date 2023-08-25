import React from 'react';

import { urlFor } from '../lib/client';

const Review = ({ review: { reviewerImage, reviewerName, reviewDesc, reviewStars, reviewDate } }) => {

    // Generate stars
    let stars = '';
    for (let i = 0; i < reviewStars; i++) {
        stars += '⭐';
    }

    return (
        <div>
            <div className="review-card">
                <div className="reviewerInfo">
                    <img
                        src={urlFor(reviewerImage)}
                        className="reviewerImage"
                        alt="reviewer image" />
                    <p className="reviewerName">{reviewerName}</p>
                </div>
                <div className="reviewDetails">
                    <p className="reviewStars">{stars}</p>
                    <p className="reviewDesc">{reviewDesc}</p>
                    <p className="reviewDate">{reviewDate}</p>
                </div>
            </div>
        </div>
    )
}

export default Review