import React from 'react';
import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const Product = ({ product: { images, nameShort, slug, price }, onClick }) => {
  const { setQty } = useStateContext();

  const handleClick = () => {
    setQty(1);
    // Navigate to the product page with a full page reload.
    window.location.href = `/product/${slug.current}`;

    // Call the onClick prop if it's provided:
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <div>
      <div className="product-card" onClick={handleClick}>
        <img
          src={urlFor(images && images[0])}
          className="product-image"
          alt="product image" />
        <p className="product-name">{nameShort}</p>
        <p className="product-price">${price}</p>
      </div>
    </div>
  )
}

export default Product;
