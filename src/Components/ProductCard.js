import React from 'react';
import "./ProductCard.css";
import { useHistory } from 'react-router-dom';

function ProductCard({name, sku, msrp, mainImage, productId, renderRoute}){

    const history = useHistory();

    const handleProductCardRoute = () => {
        if(renderRoute === 'Customer'){
            history.push(`/Products/${productId}`);
        } else if (renderRoute === 'Management'){
            history.push(`/SiteManagement/Product/${productId}`)
        }
    }

    return (
        <div className="productCard" onClick={() => handleProductCardRoute()}>
            <img className="productCard__image" src={mainImage}></img>
            <div className="productCard__text">
                <header>{name}</header>
                <p>{`#` + sku}</p>
                {msrp? <p className="productCard__msrp">From ${msrp}</p>: null}
            </div>
        </div>
    )
}

export default ProductCard;