import React from 'react';
import Link from 'next/link';

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
      <p className="logo">
        <Link href="/">Cool Headphones</Link>
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