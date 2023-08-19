import React , { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { urlFor } from '../lib/client';

//import global state and functions
import { useStateContext } from '../context/StateContext';

const Carousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjust the speed of slide transition
    autoplay: true, // Enable autoplay for automatic sliding
    autoplaySpeed: 2000, // Adjust the time interval between slides (in milliseconds)
    arrows: true, // Hide arrows
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  return (
    <div className='carousel-banner'>
      <Slider {...settings}>
        <div>
          <img src="/carousel-images/10838035.jpg" alt="Image 1" className="carousel-img"/>
        </div>
        <div>
          <img src="/carousel-images/HD-wallpaper-scottish-fold-cute-cat-pets-cats-cute-animals-close-up-domestic-cat-scottish-fold-cat.jpg" alt="Image 2" className="carousel-img"/>
        </div>
        <video controls autoPlay muted loop className="carousel-img">
          <source src="/carousel-images/jettVideo.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </Slider>

      <div className='desc'>
          <h5>
            Welcome to Kuki's Creations
          </h5>
          <h6>
          Discover captivating video game character sculptures, 
          mesmerizing 3D printed models, charming keychains, elegant jewelry, 
          and more. Each piece is infused with passion and craftsmanship, making it a perfect addition 
          to any art enthusiast's collection. Explore this treasure trove of imagination and find unique art that resonates with you. Shop now and experience the magic of Kuki's Creations!
          </h6>
      </div>

      <button type="button" className="shop-now-btn">
        <Link href="/products">SHOP NOW</Link>
      </button>

    </div>

  );

}

export default Carousel