import React from "react";

//import product component
import { ProductPageItem } from '../components';

// pages/products.js
import { client } from '../lib/client';

const ProductsPage = ({ products }) => {
    return (
        <div class="products-page-container">
            {products.map((item) => (
                <ProductPageItem key={item._id} product={item} />
            ))}
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

