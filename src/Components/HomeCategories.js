import React, { useEffect, useState } from 'react';
import "./HomeCategories.css";
import ProductCard from "./ProductCard";
import {db} from "./../firebase";

function HomeCategories({subCategoryName}){

    const [products, setProducts] = useState([]);

    useEffect(async () => {
        let productsFound = [];
        await db.collection("products").where("subCategory", "==", subCategoryName).get().then((snapshot) => {
            snapshot.forEach(doc => {
                productsFound.push(doc.data());
            })
        })
        setProducts(productsFound)
    }, [])

    return (
        <div className="homeCategories">
            <header id="homeCategories__header">
                <h1>{subCategoryName}</h1>
            </header>
            <div className="homeCategories__Products">
                {products.slice(0, 2).map((val, i) => {
                    return (
                        <ProductCard
                            name={val.name}
                            sku={val.sku}
                            msrp={val.msrp}
                            mainImage={val.images[0]}
                        />
                    )
                })}
                <section className="homeCategories__viewAll__Image">
                    <img></img>
                </section>
            </div>
        </div>
    )
}

export default HomeCategories;