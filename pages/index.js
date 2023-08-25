// rafce
// imports react to the project
import React from 'react'

// imports sanityClient to the project
import { client } from '../lib/client';

//imports react components to the project
import { Product, Carousel, Review } from '../components';

const Home = ({ products, carousel, reviews }) => (
  <div>
    {/* <HeroBanner heroBanner={ bannerData.length && bannerData[0] }/> */}
    <Carousel carousel={carousel} />

    <div className='products-main-container'>
      <div className="products-heading">
        <div className="horizontal-bar"></div> {/* Left horizontal bar */}
        <h2>Best Selling Products</h2>
        <div className="horizontal-bar"></div> {/* Right horizontal bar */}
      </div>

      <div className="products-container">
        {/* question mark makes sure products exist before executing .map */}
        {products.slice(0, 4)?.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>

    <div className=''>
      <div className="products-heading">
        <div className="horizontal-bar"></div> {/* Left horizontal bar */}
        <h2>Customer Reviews</h2>
        <div className="horizontal-bar"></div> {/* Right horizontal bar */}
      </div>

      <div className="reviews-container">
        {/* question mark makes sure reviews exist before executing .map */}
        {reviews?.map((reviews) => <Review key={reviews._id} review={reviews} />)}
      </div>
    </div>
  </div>
);



// async function that allows us to fetch data from APIs ("Next.js will pre-render this page on each request using the data returned by getServerSideProps")
export const getServerSideProps = async () => {
  // grabs all our products from the sanity dashboard
  const query = '*[_type == "products"]';
  const products = await client.fetch(query);

  // grabs all carousel data
  const queryCarousel = '*[_type == "carouselContent"]';
  const carousel = await client.fetch(queryCarousel);

  // grabs all reviews data
  const queryReviews = '*[_type == "reviews"]';
  const reviews = await client.fetch(queryReviews);


  return {
    props: { products, reviews, carousel }
  }
}

export default Home;