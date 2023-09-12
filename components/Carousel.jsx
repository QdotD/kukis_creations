import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { urlFor } from '../lib/client';
import Image from 'next/image';

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

  const handleCarouselClick = (e, item) => {
    e.preventDefault(); // Stop the link from navigating immediately

    window.dataLayer.push({
      event: "click_carousel_promotion",
      carousel_item_url: item.url
    });

    setTimeout(() => {
      window.location.href = item.url;
    }, 200);
  }

  // console.log(carousel)
  // console.log(carousel[0].image)

  return (
    <div className='carousel-banner'>
      <Slider {...settings}>
        {/* <video controls autoPlay muted loop className="carousel-img">
          <source src="/jettVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        {carousel.map((item, index) => {
          return (
            <a
              className="carousel-a"
              href={item.url}
              key={index}
              onClick={() => handleCarouselClick(item)}
            >
              <Image
                src={urlFor(item.image).url()}
                alt={item.altText}
                layout="fill"
                objectFit="cover"
                className="carousel-img"
                priority={index === 0} // Only set priority for the first image, adjust if necessary
              />
            </a>
          );
        })}


      </Slider>
      {/* <div className="carousel-shop-now-button"> SHOP NOW </div> */}

    </div>

  );

}

export default Carousel