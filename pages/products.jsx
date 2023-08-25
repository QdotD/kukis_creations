import React from "react";

//import product component
import { ProductPageItem } from '../components';

// pages/products.js
import { client } from '../lib/client';

const ProductsPage = ({ products }) => {

    console.log(products)

    return (
        <div>
            <div className="products-heading">
                <div className="horizontal-bar"></div> {/* Left horizontal bar */}
                <h2>Best Selling Products</h2>
                <div className="horizontal-bar"></div> {/* Right horizontal bar */}
            </div>
            <div class="products-page-container">
                {products.map((item) => (
                    <ProductPageItem key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const productsQuery = `*[_type == "product"]`;
    const products = await client.fetch(productsQuery);

    return {
        props: { products }
    }
}

export default ProductsPage;

