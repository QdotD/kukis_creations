import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const HeroBanner = ({ heroBanner }) => {
  const { setQty } = useStateContext();

  return (
    <div className="main-banner-container">
      <div>
        <Link href="/">
          <img src="/banner.JPG" alt="banner" className='banner-img' />
        </Link>
        <div>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p> 
            {/* change heroBanner to mainBanner and modify contents in database */}
          </div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button" className="banner-btn" onClick={() => setQty(1)}>Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner