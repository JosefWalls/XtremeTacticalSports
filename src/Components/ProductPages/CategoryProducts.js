import React, { useEffect, useState } from 'react';
import "./CategoryProducts.css";
import firebase from 'firebase';
import {db} from "./../../firebase";
import ProductCard from "./../ProductCard";
import { Link } from 'react-router-dom';

function CategoryProducts({category}){

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState([]);

    useEffect(async() => {
        let productsFound = [];
        let productsFoundId = [];
        await db.collection("products").where("category", '==',  category).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                productsFound.push(doc.data())
                productsFoundId.push(doc.id);
                //this makes it where you can link, essentially puts at exact same index
            })
        })
        .catch(err => console.warn(err.message))

        setProducts(productsFound);
        setProductId(productsFoundId);
    }, [])

    return (
        <div className="categoryProducts">
            {products.map((val, i) => {
                return (
                    <ProductCard
                        name={val.name}
                        sku={val.sku}
                        msrp={val.msrp}
                        mainImage={val.images[0]}
                        productId={productId[i]}
                    />
                )
            })}
        </div>
    )
};

export default CategoryProducts;