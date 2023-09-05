// rafce
// imports react to the project
import React from 'react'

// imports sanityClient to the project
import { client } from '../lib/client';

//imports react components to the project
import { Carousel, BestSellers, Review } from '../components';

const Home = ({ products, carousel, reviews }) => (
  <div>
    {/* <HeroBanner heroBanner={ bannerData.length && bannerData[0] }/> */}
    <Carousel carousel={carousel} />
    <BestSellers products={products} />
    <Review reviews={reviews} />
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