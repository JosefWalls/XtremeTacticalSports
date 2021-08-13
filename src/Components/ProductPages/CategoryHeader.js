import React from 'react';
import "./CategoryHeader.css";

function CategoryHeader({category}){
    return (
        <div className="categoryHeader">
            <header>
                <h1>{category}</h1>
                {category === 'AR_Parts' ? <h3>AR Parts and Accessories</h3> :
                 category === 'Optics' ? <h3>Rifle & Handgun Optics</h3>:
                 category === 'Lasers' ? <h3>Rifle & Handgun Lasers/Flashlights</h3>: null}
            </header>
        </div>
    )
};

export default CategoryHeader;