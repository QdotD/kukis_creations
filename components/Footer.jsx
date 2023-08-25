import React from 'react';
import NoSsr from './NoSsr';

import Image from 'next/image';

const Footer = () => {
  return (
    <div className="footer-container">
      <p className="icons">
        <NoSsr>
          <a href="https://www.instagram.com/kukiscreationsdotcom/" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" width={30} height={30} />
          </a>
          <a href="https://www.etsy.com/shop/KUKIsCREATIONSdotcom/" target="_blank" rel="noopener noreferrer">
            <Image src="/etsy.svg" alt="Instagram" width={50} height={40} />
          </a>
        </NoSsr>
      </p>
    </div>
  )
}

export default Footer;