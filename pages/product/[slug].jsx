//dynamic product details component
import React, { useState } from 'react';

//import icons
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from '../../components/NoSsr';

//import stuff from sanity client
import { client, urlFor } from '../../lib/client';

//import product component
import { Product } from '../../components';

//import global state and functions
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ products, product }) => {
  // destructure the values from props so you don't have to write products.blank each time
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  // lets us use these functions here in our code
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
              {image?.map((item, i) => (
                <img 
                  key={i}
                  src={urlFor(item)}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
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
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><NoSsr><AiOutlineMinus /></NoSsr></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><NoSsr><AiOutlinePlus /></NoSsr></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">{/* marquee is a list of scrolling divs/scrolling parts*/}
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// allows us to use getStaticProps
export const getStaticPaths = async () => {
  // give me the data for all the procuts
  const query = `*[_type == "product"] {
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
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  // fetch all similar products
  const productsQuery = `*[_type == "product"]`;

  // grabs the individual product
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails