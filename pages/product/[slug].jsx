//dynamic product details component
import React, { useState, useRef } from 'react';

//import icons
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from '../../components/NoSsr';

//import stuff from sanity client
import { client, urlFor } from '../../lib/client';

//import BestSellers component
import { MayLike } from '../../components';

//import global state and functions
import { useStateContext } from '../../context/StateContext';

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
    // Increment the index or reset to 0 if end is reached
    setIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % image.length;
      imageRefs.current[newIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      return newIndex;
    });
  };

  const handlePrev = () => {
    // Decrement the index or set to last image if beginning is reached
    setIndex(prevIndex => {
      const newIndex = (prevIndex - 1 + image.length) % image.length;
      imageRefs.current[newIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      return newIndex;
    });
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
            <div className='image-container'>
              {/* Left Arrow */}
              <button onClick={handlePrev} className="arrow-button arrow-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" className="flipped-svg arrow-svg">
                  <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                </svg>
              </button>

              <div>
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

          <div className="product-detail-desc">
            <div className='details-and-buy'>
              <div className='top-details-desc'>
                <div className='price-and-reviews'>
                  <p className="price"><strong>USD ${price}</strong> <em>(plus shipping & tax)</em></p>
                  {/* <div className="reviews">
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
              </div> */}
                </div>
                <div className='details'>
                  {/* <h4>Details: </h4> */}
                  <p>{details}</p>
                </div>

              </div>

              <div className='bottom-details-desc'>
                <div className='buy'>
                  <div className='buy-left'>
                    <div>
                      Materials: plastic, acrylic, paint, zinc
                    </div>
                    <div>
                      Weight: 5g
                    </div>
                    <div>
                      Dimensions: 4.2 x 2 x 2 cm
                    </div>
                  </div>
                  <div className='buy-right'>
                    <div className="quantity">
                      <div className="quantity-desc">
                        <button className="minus" onClick={decQty}><NoSsr><AiOutlineMinus /></NoSsr></button>
                        <input
                          type="number"
                          className="input"
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value, 10))}
                          min="1"
                        />
                        <button className="plus" onClick={incQty}><NoSsr><AiOutlinePlus /></NoSsr></button>
                      </div>
                    </div>
                    <div className="buttons">
                      <button type="button" className={`add-to-cart ${buttonClicked ? 'add-to-cart-clicked' : ''}`}
                        onClick={() => {
                          console.log("Button was clicked"); // Add this line
                          setButtonClicked(true);
                          onAdd(product, qty);
                          setTimeout(() => setButtonClicked(false), 150), setShowCart(true);
                        }}>Add to Cart</button>
                      {/* <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button> */}
                    </div>
                  </div>


                </div>
              </div>
            </div>


          </div>
        </div>
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