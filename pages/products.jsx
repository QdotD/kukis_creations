import React from "react";
import { ProductPageItem } from '../components';
import { client } from '../lib/client';

const ProductsPageItem = ({ products }) => {

    const productCategories = ["3D-Printed", "Earrings", "Figurines"];  // Add more categories as needed

    // Function to compare product categories in a case-insensitive manner
    const caseInsensitiveIncludes = (arr, value) => {
        return arr.some(arrValue => arrValue.toLowerCase() === value.toLowerCase());
    }

    // Group products by their category
    const categorizedProducts = products.reduce((acc, product) => {
        if (caseInsensitiveIncludes(productCategories, product.productCategory)) {
            const categoryKey = productCategories.find(cat => cat.toLowerCase() === product.productCategory.toLowerCase());
            if (!acc[categoryKey]) {
                acc[categoryKey] = [];
            }
            acc[categoryKey].push(product);
        }
        return acc;
    }, {});

    return (
        <div>
            {productCategories.map(category => (
                categorizedProducts[category] && (
                    <div key={category}>
                        <div className="product-detail-heading products-page-heading">
                            <h1>{category}</h1>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="products-page-container">
                            {categorizedProducts[category].map(product => (
                                <ProductPageItem key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export const getStaticProps = async () => {
    const productsQuery = `*[_type == "products"]`;
    const products = await client.fetch(productsQuery);

    return {
        props: { products }
    }
}

export default ProductsPageItem;
