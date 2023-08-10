import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';


//import global state and functions
import { useStateContext } from '../context/StateContext';

const CustomerReviewBanner = ({ customerReviewBanner }) => {
  const { setQty } = useStateContext();

  return (
    <div className="reviews-container">

      <div className="reviews-heading">
        <div className="horizontal-bar"></div> {/* Left horizontal bar */}
        <h2>Customer Reviews</h2>
        <div className="horizontal-bar"></div> {/* Right horizontal bar */}
      </div>

      <div className='reviews'>
        <div className='review-card'>
          <img src="/reviews/review1.png" alt="review" className="review-img"/>
        </div>

        <div className='review-card'> 
          <img src="/reviews/review1.png" alt="review" className="review-img"/>
        </div>

        <div className='review-card'> 
          <img src="/reviews/review1.png" alt="review" className="review-img"/>
        </div>

      </div>


    </div>
  )
}

export default CustomerReviewBanner