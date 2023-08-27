import React, { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className={"navbar-container"}>
        <p className='logo'>
          <Link href="/">
            <img src="/logo.svg" alt="logo" className="logo-img" />
          </Link>
        </p>

        <p className="navbar-btn desktop-menu">
          <Link href="/products">Products</Link>
        </p>

        <Link href="/">
          <img src="/title.svg" alt="logo" className='title' />
        </Link>

        <p className="navbar-btn desktop-menu">
          <Link href="/about">About</Link>
        </p>

        <p className="navbar-btn desktop-menu">
          <Link href="/commissions">Commissions</Link>
        </p>

        {/* Hamburger Menu Button */}
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          &#9776;
        </button>

        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <NoSsr>
            <AiOutlineShopping />
          </NoSsr>
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
      {/* Hamburger Menu Content */}
      <div className={isMenuOpen ? "menu-items active" : "menu-items"}>
        <p className="navbar-btn">
          <Link href="/products">Products</Link>
        </p>
        <p className="navbar-btn">
          <Link href="/about">About</Link>
        </p>
        <p className="navbar-btn">
          <Link href="/commissions">Commissions</Link>
        </p>
      </div>
    </div>
  )
}

export default Navbar