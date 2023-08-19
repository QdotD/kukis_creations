import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const Product = ({ product: { image, name, slug, price } }) => {
  const { setQty } = useStateContext();

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])} 
            className="product-image"
            onClick={() => setQty(1)}
            alt="product image" />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product