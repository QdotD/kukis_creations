import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const ProductPageItem = ({ product: { images, name, slug, price, bingbong } }) => {
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
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
            {/* <p>{bingbong}</p> */}
        </div>
      </Link>
    </div>
  )
}

export default ProductPageItem