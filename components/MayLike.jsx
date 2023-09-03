import React from 'react';
import { Product } from '../components';

const MayLike = ({ products, currentProductId }) => {
    return (
        <div className='products-main-container maylike-container'>
            <div className="products-heading">
                <div className="horizontal-bar"></div> {/* Left horizontal bar */}
                <h2>You May Also Like</h2>
                <div className="horizontal-bar"></div> {/* Right horizontal bar */}
            </div>

            <div className="products-container">
                {products
                    ?.filter(product => product.isBestSeller && product._id !== currentProductId)
                    .slice(0, 4)
                    .map(product => <Product key={product._id} product={product} />
                    )}
            </div>
        </div>
    )
}

export default MayLike;
