//dynamic product details component
import React, { useState, useEffect } from 'react';

//import icons
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from '../../components/NoSsr';

//import stuff from sanity client
import { client } from '../../lib/client.js';

//import BestSellers component
import { MayLike, ReadMore, ProductImages } from '../../components';

//import global state and functions
import { useStateContext } from '../../context/StateContext';

import toast from 'react-hot-toast';


// Function to convert newline characters to <br> tags
function newlineToBreak(input) {
  return input.replace(/\n/g, '<br/>');
}

const ProductDetails = ({ products, product }) => {
  // destructure the values from props so you don't have to write products.blank each time
  const { nameShort, nameLong, description, price, readMore, reviewStars, numOfReviews, productDetails, _id } = product;

  const [updatedPrice, setUpdatedPrice] = useState(price);

  const [productImages, setProductImages] = useState(product.images);

  const [index, setIndex] = useState(0);

  const defaultVariantName = product.variants && product.variants.length > 0 ? "Select an option:" : "";

  const [selectedVariantName, setSelectedVariantName] = useState(defaultVariantName);

  useEffect(() => {
    if (product.variants) {
      setSelectedVariantName("Select an option:");
      // setProductImages([...product.images, ...product.variants[0].variantImages]);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this useEffect runs only once after the initial render.

  // console.log(product);

  const [buttonClicked, setButtonClicked] = useState(false);
  // lets us use these functions here in our code
  const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();

  const updateDropdown = (variant) => {
    if (variant == "default") {
      setSelectedVariantName("Select an option:");
      setProductImages([...product.images]);
      setIndex(0);
      setUpdatedPrice(price);
    } else {
      setSelectedVariantName(variant.variantName);
      setProductImages([...product.images, ...variant.variantImages]);
      const indexValue = product.images.length;
      setIndex(indexValue);
      setUpdatedPrice(variant.variantPrice);
    }
  }

  return (
    <div>
      <div className='product-detail-container'>
        <div className='product-detail-heading'>
          <h1>{nameLong}</h1>
        </div>

        <div className='product-detail-subcontainer'>

          <ProductImages product={product} productImages={productImages} index={index} setIndex={setIndex} />

          <div className='subcontainer-right'>

            <div className='price-and-reviews'>
              <div className="price"><strong>USD ${updatedPrice}</strong></div>

              <div className='reviews'>
                {reviewStars && numOfReviews ?
                  <div className="reviews">
                    <div>
                      <NoSsr>
                        {[...Array(5)].map((_, index) =>
                          index < reviewStars ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
                        )}
                      </NoSsr>
                    </div>
                    <p>({numOfReviews})</p>
                  </div>
                  : null}
              </div>
            </div>

            {/* this div has both bottom right and left sections */}
            <div className='bottom-details-desc'>

              {/* this div has the description section on the left */}
              <div className='details-desc'>
                <div>
                  <h5>Product Details:</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: newlineToBreak(productDetails) }}
                  />
                </div>

                <div>
                  <h5>Description: </h5>
                  <p>{description}</p>
                </div>

                <div>
                  <h5>Shipping:</h5>
                  <p>
                    This item ships in 3-5 business days.
                  </p>
                </div>
              </div>

              {/* this div has the variants and the buy buttons section on the right */}
              <div className='variants-and-buy'>

                {product.variants && product.variants.length > 0 && (
                  <div className='variants'>
                    <h5>{product.variantTitle}</h5>
                    <div className="dropdown">
                      {/* Trigger for the dropdown */}
                      <button className="dropdown-toggle">{selectedVariantName}</button>

                      {/* Dropdown content */}
                      <div className="dropdown-content">
                        {/* Dropdown items */}
                        <a onClick={() => updateDropdown("default")}>
                          Select an option:
                        </a>
                        {product.variants.map((variant, index) => (
                          <a key={index} onClick={() => updateDropdown(variant)}>
                            {variant.variantName}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

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

                            if (selectedVariantName == "Select an option:") {
                              toast.error("Please select an option.");
                            } else if (!isNaN(newQuantity) && newQuantity > 0) {
                              onAdd(product, newQuantity, selectedVariantName, updatedPrice);
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

                  <button type="button" className={`add-to-cart${buttonClicked ? 'add-to-cart-clicked' : ''}`}
                    onClick={() => {
                      setButtonClicked(true);
                      
                      let cleanedQuantity = parseInt(qty, 10);
                      if (isNaN(cleanedQuantity) || cleanedQuantity <= 0) cleanedQuantity = 1;
                      
                      // Push the event to dataLayer
                      window.dataLayer.push({
                        product_name: nameShort,
                        quantity: cleanedQuantity,
                        variant: selectedVariantName
                      });
                      

                      if (selectedVariantName == "Select an option:") {
                        toast.error("Please select an option.");
                      } else {
                        onAdd(product, qty, selectedVariantName, updatedPrice);
                        setShowCart(true);
                      }
                      setTimeout(() => {
                        setButtonClicked(false);
                      }, 150);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {readMore ? <ReadMore readMore={readMore} /> : null}

      </div>

      <MayLike currentProductId={_id} products={products} />

    </div >
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
  try {
    // Parameterized query for safety.
    const query = `*[_type == "products" && slug.current == $slug]`;
    const results = await client.fetch(query, { slug });
    const product = results[0];

    // fetch all similar products
    const productsQuery = `*[_type == "products"]`;
    const products = await client.fetch(productsQuery);

    if (!product) {
      // This will return a 404 page if product is not found
      return {
        notFound: true,
      };
    }

    return {
      props: { products, product }
    };

  } catch (error) {
    console.error("Error fetching the data:", error);

    // Returning an error status or you could return fallback data or show a specific error page.
    return {
      notFound: true,
    };
  }
}

export default ProductDetails