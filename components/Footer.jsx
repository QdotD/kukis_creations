import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from './NoSsr';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Cool Headphones All rights reserved</p>
      <p className="icons">
        <NoSsr>
        <AiFillInstagram />
        <AiOutlineTwitter />
        </NoSsr>
          
      </p>
    </div>
  )
}

export default Footer