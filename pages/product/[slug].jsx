//dynamic product details component
import React, { useState, useRef } from 'react';

//import icons
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from '../../components/NoSsr';

//import stuff from sanity client
import { client, urlFor } from '../../lib/client';

//import BestSellers component
import { MayLike, ReadMore } from '../../components';

//import global state and functions
import { useStateContext } from '../../context/StateContext';

import toast from 'react-hot-toast';

const ProductDetails = ({ products, product }) => {
  // destructure the values from props so you don't have to write products.blank each time
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  // lets us use these functions here in our code
  const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();

  // const handleBuyNow = () => {
  //   onAdd(product, qty);

  //   setShowCart(true);
  // }

  const imageRefs = useRef([]);

  const handleNext = () => {
    const imageEl = document.querySelector('.product-detail-image');
    imageEl.classList.add('fade-out');

    setTimeout(() => {
      // Increase your image index or however you change your image
      setIndex((index + 1) % image.length);

      // Refresh image source
      imageEl.src = urlFor(image && image[index]);

      // Remove fade-out class after image source has been updated
      imageEl.classList.remove('fade-out');
    }, 100); // This should match the transition duration defined in the CSS (0.4s = 400ms)
  };

  const handlePrev = () => {
    const imageEl = document.querySelector('.product-detail-image');
    imageEl.classList.add('fade-out');

    setTimeout(() => {
      // Decrease your image index or however you change your image
      setIndex((index - 1 + image.length) % image.length);

      // Refresh image source
      imageEl.src = urlFor(image && image[index]);

      // Remove fade-out class after image source has been updated
      imageEl.classList.remove('fade-out');
    }, 100); // This should match the transition duration defined in the CSS (0.4s = 400ms)
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
    <div>
      <div className='product-detail-container'>
        <div className='product-detail-heading'>
          <h1>{name}</h1>
          <div className="horizontal-bar"></div>
        </div>
        <div className='product-detail-subcontainer'>
          <div className='all-images-container'>
            <div className='image-container' onTouchStart={startSwipe} onTouchMove={moveSwipe} onTouchEnd={endSwipe}>
              {/* Left Arrow */}
              <button onClick={handlePrev} className="arrow-button arrow-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" className="flipped-svg arrow-svg">
                  <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                </svg>
              </button>

              <div className="product-image-container">
                <img src={urlFor(image && image[index])} className="product-detail-image" />

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
                  {index + 1}/{image?.length}
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
              {image?.map((item, i) => (
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

          {/* <div className="product-detail-desc"> */}
          {/* <div className='details-and-buy'> */}
          <div className='top-details-desc'>

            <div className="price"><strong>USD ${price}</strong></div>
            <div>
              <h5>Product Details:</h5>
              <p>
                <div>
                  Materials: plastic, acrylic, paint, zinc
                </div>
                <div>
                  Weight: 5g
                </div>
                <div>
                  Dimensions: 4.2 x 2 x 2 cm
                </div>
              </p>
            </div>

            <div>
              <h5>Description: </h5>
              <p>{details}</p>
            </div>

            <div>
              <h5>Shipping:</h5>
              <p>
                This item ships in 3-5 business days.
              </p>
            </div>
          </div>


          <div className='bottom-details-desc'>
            {/* <div className='buy'> */}

            <div className="reviews">
              <div>
                <NoSsr>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </NoSsr>
              </div>
              <p>(20)</p>
            </div>

            <div className='variants'>
              <h5>variant title</h5>
              <div className="dropdown">
                {/* Trigger for the dropdown */}
                <button className="dropdown-toggle">Dropdown</button>

                {/* Dropdown content */}
                <div className="dropdown-content">
                  {/* Dropdown items */}
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>
              </div>
            </div>

            <div className='buy-right'>
              <div className="quantity">
                <div className="quantity-desc">
                  <button className="minus" onClick={decQty}><NoSsr><AiOutlineMinus /></NoSsr></button>

                  <input
                    type="number"
                    className='input'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          onAdd(product, newQuantity);
                          setShowCart(true);
                        } else {
                          toast.error("Please enter a valid quantity.");
                        }
                      }
                    }}
                  />

                  <button className="plus" onClick={incQty}><NoSsr><AiOutlinePlus /></NoSsr></button>
                </div>
              </div>

              <button type="button" className={`add-to-cart ${buttonClicked ? 'add-to-cart-clicked' : ''}`}
                onClick={() => {
                  setButtonClicked(true);

                  let cleanedQuantity = parseInt(qty, 10);
                  if (isNaN(cleanedQuantity) || cleanedQuantity <= 0) cleanedQuantity = 1;


                  onAdd(product, qty);  // Use the product from the product listing and the qty from the state
                  setTimeout(() => {
                    setButtonClicked(false);
                    setShowCart(true);
                  }, 150);
                }}
              >
                Add to Cart
              </button>

            </div>


            {/* </div> */}
          </div>
          {/* </div> */}


          {/* </div> */}
        </div>

        <ReadMore />

      </div>

      <MayLike products={products} />

    </div>
  )
}

// allows us to use getStaticProps
export const getStaticPaths = async () => {
  // give me the data for all the procuts
  const query = `*[_type == "products"] {
      // but dont return all of it just give me the current slug property
      slug {
        current
      }
    }`;

  const products = await client.fetch(query);

  // add parenthesis and then curly braces to instantly return an object from a function
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

// getStaticProps (special nextjs function) check nextjs docs for more info, allows you to go to other pages without reloading because we already have the data rendered
export const getStaticProps = async ({ params: { slug } }) => {
  // lets us grab all the product details of the product page we are on
  const query = `*[_type == "products" && slug.current == '${slug}'][0]`;

  // fetch all similar products
  const productsQuery = `*[_type == "products"]`;

  // grabs the individual product
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails