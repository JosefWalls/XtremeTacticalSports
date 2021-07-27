import React from 'react';
import "./ProductCard.css";

function ProductCard({}){
    return (
        <div className="productCard">
            <img className="productCard__image"></img>
            <div className="productCard__text">
                <header>Product Name</header>
                <p>Product Sku</p>
                <p>MSRP $19.99</p>
            </div>
        </div>
    )
}

export default ProductCard;