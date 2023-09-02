import React from 'react';
import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const ProductPageItem = ({ product: { images, nameShort, slug, price } }) => {
  const { setQty } = useStateContext();

  const handleClick = () => {
    setQty(1);
    // Navigate to the product page with a full page reload.
    window.location.href = `/product/${slug.current}`;
  };

  return (
    <div onClick={handleClick} className="product-page-card">
      <img 
          src={urlFor(images && images[0])} 
          className="product-image product-page-image"
          alt="product image" />
      <p className="product-name">{nameShort}</p>
      <p className="product-price">${price}</p>
    </div>
  )
}

export default ProductPageItem;
