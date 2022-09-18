// rafce
// imports react to the project
import React from 'react'

// imports sanityClient to the project
import { client } from '../lib/client';

//imports react components to the project
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={ bannerData.length && bannerData[0] }/>

    {console.log(bannerData)}

    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Many types of speakers</p>
    </div>

    <div className="products-container">
      {/* question mark makes sure products exist before executing .map */}
      {products?.map((product) => product.name)}
    </div>

    <FooterBanner />
  </div>
);



// async function that allows us to fetch data from APIs ("Next.js with pre-render this page on each request using the data returned by getServerSideProps")
export const getServerSideProps = async () => {
  // lets grab all our products from the sanity dashboard
  const query  = '*[_type == "product"]';
  const products = await client.fetch(query);

  // grabs all banner data
  const bannerQuery  = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;