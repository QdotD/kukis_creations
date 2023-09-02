import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { urlFor } from '../lib/client';

const Carousel = ({ carousel }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjust the speed of slide transition
    autoplay: true, // Enable autoplay for automatic sliding
    autoplaySpeed: 5000, // Adjust the time interval between slides (in milliseconds)
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  return (
    <div className='carousel-banner'>
      <Slider {...settings}>
        <video controls autoPlay muted loop className="carousel-img">
          <source src="/jettVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {carousel.map((item, index) => (
          <div key={index}>
            <img src={urlFor(item.image)} alt={item.altText} className="carousel-img" />
          </div>
        ))}
      </Slider>
      <div className="carousel-shop-now-button"> SHOP NOW </div>

    </div>

  );

}

export default Carousel