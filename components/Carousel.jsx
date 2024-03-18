import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { urlFor } from '../lib/client';
import Image from 'next/image';

const Carousel = ({ carousel }) => {
  const [filteredCarousel, setFilteredCarousel] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const displayOptionFilter = screenWidth < 800 ? 'mobile' : 'desktop';
      const filteredItems = carousel.filter(item => item.displayOption === displayOptionFilter);
      setFilteredCarousel(filteredItems);
    };

    // call handleResize immediately to set the initial state
    handleResize();

    // add event listener
    window.addEventListener('resize', handleResize);

    // cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [carousel]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleCarouselClick = (item) => {
    window.dataLayer.push({
      event: "click_carousel_promotion",
      carousel_item_url: item.url,
    });

    setTimeout(() => {
      window.location.href = item.url;
    }, 200);
  };

  return (
    <div className='carousel-banner'>
      <Slider {...settings}>
        {filteredCarousel.map((item, index) => (
          <a
            className={`carousel-a ${item.displayOption}`}
            href={item.url}
            key={index}
            onClick={() => handleCarouselClick(item)}
          >
            <Image
              src={urlFor(item.image).url()}
              alt={item.altText}
              layout="fill"
              objectFit="cover"
              className={`carousel-img ${item.displayOption}`}
              priority={index === 0}
            />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
