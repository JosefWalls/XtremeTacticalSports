import React from 'react';
import "./HomeCategories.css";
import ProductCard from "./ProductCard";
import {ArrowForward} from "@material-ui/icons"

function HomeCategories({categoryName}){
    return (
        <div className="homeCategories">
            <header id="homeCategories__header">
                <h1>{categoryName}</h1>
            </header>
            <div className="homeCategories__Products">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <section className="homeCategories__viewAll__Image">
                    <img></img>
                </section>
            </div>
        </div>
    )
}

export default HomeCategories;