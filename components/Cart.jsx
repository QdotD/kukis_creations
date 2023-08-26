import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from './NoSsr';

import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  // state context
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove, decQty, incQty, qty, setQty } = useStateContext();

  // function sends product data from cart to stripe
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className='outside-cart-container' onClick={() => setShowCart(false)}></div>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <NoSsr>
            <AiOutlineLeft />
          </NoSsr>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {/* run if cart is empty */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <NoSsr>
              <AiOutlineShopping size={150} />
            </NoSsr>
            <h3>Nothing in cart</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className="product" key={Math.random().toString(36).substr(2, 9)}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                <span className="cart-num-items-2">{totalQuantities} items</span>
                  <button title="Click to remove item" type="button" className="remove-item" onClick={() => onRemove(item)}>
                    <NoSsr>
                      <TiDeleteOutline />
                    </NoSsr>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>
            <div className='btn-container'>
              <button type="button" className='btn' onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart