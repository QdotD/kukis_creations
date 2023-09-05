import React, { useRef } from 'react';

import { urlFor } from '../lib/client.js';

const ProductImages = ({ productImages, index, setIndex }) => {

    const imageRefs = useRef([]);

    const handleNext = () => {
        const imageEl = document.querySelector('.product-detail-image');
        imageEl.classList.add('fade-out');

        setTimeout(() => {
            setIndex(prevIndex => (prevIndex + 1) % productImages.length);
            imageEl.classList.remove('fade-out');
        }, 100);
    };

    const handlePrev = () => {
        const imageEl = document.querySelector('.product-detail-image');
        imageEl.classList.add('fade-out');

        setTimeout(() => {
            setIndex(prevIndex => (prevIndex - 1 + productImages.length) % productImages.length);
            imageEl.classList.remove('fade-out');
        }, 100);
    };


    let startX; // Where the touch starts
    let distance; // Distance swiped

    const startSwipe = (e) => {
        startX = e.touches[0].clientX;
    };

    const moveSwipe = (e) => {
        if (!startX) return;
        const x = e.touches[0].clientX;
        distance = startX - x;
    };

    const endSwipe = () => {
        if (distance > 100) {
            handleNext();
        } else if (distance < -100) {
            handlePrev();
        }
        startX = null;
        distance = null;
    };

    return (
        <div className='all-images-container'>
            <div className='image-container' onTouchStart={startSwipe} onTouchMove={moveSwipe} onTouchEnd={endSwipe}>
                {/* Left Arrow */}
                <button onClick={handlePrev} className="arrow-button arrow-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" className="flipped-svg arrow-svg">
                        <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                    </svg>
                </button>

                <div className="product-image-container">
                    <img src={urlFor(productImages && productImages[index])} className="product-detail-image" />


                    {/* Text overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px'
                    }}>
                        {index + 1}/{productImages?.length}
                    </div>
                </div>


                {/* Right Arrow */}
                <button onClick={handleNext} className="arrow-button arrow-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" className="arrow-svg">
                        <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                    </svg>
                </button>
            </div>

            {/* Small Images */}
            <div className="small-images-container">
                {productImages?.map((item, i) => (
                    <img
                        key={i}
                        ref={el => imageRefs.current[i] = el}
                        src={urlFor(item)}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductImages;