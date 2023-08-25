import React from 'react';
import NoSsr from './NoSsr';

import Image from 'next/image';

const Footer = () => {
  return (
    <div className="footer-container">
      <p className="icons">
        <NoSsr>
          <a href="https://www.instagram.com/kukiscreationsdotcom/" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram-logo.svg" alt="Instagram" width={40} height={40} />
          </a>
          <a href="https://www.etsy.com/shop/KUKIsCREATIONSdotcom/" target="_blank" rel="noopener noreferrer">
            <Image src="/etsy.svg" alt="Instagram" width={50} height={45} />
          </a>
        </NoSsr>
      </p>
    </div>
  )
}

export default Footer;