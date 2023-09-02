import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const ProductPageItem = ({ product: { images, nameShort, slug, price } }) => {
  const { setQty } = useStateContext();

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-page-card">
          <img 
            src={urlFor(images && images[0])} 
            className="product-image product-page-image"
            onClick={() => setQty(1)}
            alt="product image" />
            <p className="product-name">{nameShort}</p>
            <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductPageItem