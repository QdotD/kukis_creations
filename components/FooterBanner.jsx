import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const FooterBanner = ({ footerBanner: {
  discount, largeText1, largeText2, saleTime,
  smallText, midText, desc, product, buttonText, image }
}) => {

  const { setQty } = useStateContext();

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button" onClick={() => setQty(1)}>{buttonText}</button>
          </Link>
        </div>

        <img
          src={urlFor(image)}
          className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner