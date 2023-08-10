import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

//simple shopping icon
import { AiOutlineShopping } from 'react-icons/ai';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from './NoSsr';

//import cart component
import { Cart } from './';

//import state context
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext(); 

  return (
    <div className="navbar-container"> 
      <p className='logo'>
        <Link href="/">
          <img src="/logo.svg" alt="logo" className="logo-img"/>
        </Link>
      </p>
      <p className="navbar-btn">
        <Link href="/products">Products</Link>
      </p>
      <Link href="/">
        <img src="/title.svg" alt="logo" className='title' />
      </Link>
      <p className="navbar-btn">
        <Link href="/about">About</Link>
      </p>
      <p className="navbar-btn">
        <Link href="/commissions">Commissions</Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <NoSsr>
          <AiOutlineShopping />
        </NoSsr>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {/* only show cart when showCart is true (there are items in the cart) */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar