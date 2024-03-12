import React from "react";
import { ProductPageItem } from '../components';
import { client } from '../lib/client';

const ProductsPageItem = ({ products }) => {
    // Group products by their category
    let categorizedProducts = {};

    for (let product of products) {
        const categoryName = product.productCategory?.title;
        // Skip products with undefined category names
        if (categoryName === undefined) continue;
        if (!categorizedProducts[categoryName]) {
            categorizedProducts[categoryName] = [];
        }
        categorizedProducts[categoryName].push(product);
    }

    return (
        <div>
            {Object.entries(categorizedProducts)
            .sort((a, b) => a[0].localeCompare(b[0])) // Sorting the categories alphabetically
            .map(([categoryName, categoryProducts]) => {
                // Check if the categoryProducts is undefined or empty, then skip rendering this category
                if (categoryProducts === undefined || categoryProducts.length === 0) {
                    return null;
                }

                return (
                    <div key={categoryName}>
                        <div className="product-detail-heading products-page-heading">
                            <h1>{categoryName}</h1>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="products-page-container">
                            {categoryProducts.map(product => (
                                <ProductPageItem key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export const getStaticProps = async () => {
    const productsQuery = `
  *[_type == "products"]{
    ...,
    productCategory->{
      title
    }
  }
`;
    const products = await client.fetch(productsQuery);

    return {
        props: { products }
    }
}

export default ProductsPageItem;
