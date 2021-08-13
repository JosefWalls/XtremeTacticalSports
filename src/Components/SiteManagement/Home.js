import React, {useEffect, useState} from 'react';
import "./SiteManagement.css";
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {db} from "./../../firebase";

function Home(){

    const [products, setProducts] = useState([]);

    useEffect(async() => {
        let ProductsFound = [];
        await db.collection("products").get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                ProductsFound.push(doc.data())
            })
        })
        return setProducts(ProductsFound)
    }, [])

    return (
        <div className="siteManagamentHome">
            <div className="siteManagementHome__Header">
                <Link to="/SiteManagement/NewProduct">
                    <button>Add New Product</button>
                </Link>
                <Link to="/SiteManagement/Vendors">
                    <button>Manage Vendors</button>
                </Link>
            </div>
            <div className="categoryProducts">
                {products.map((val, i) => {
                    console.log(val)
                    return (
                        <ProductCard
                            name={val.name}
                            msrp={val.msrp}
                            sku={val.sku}
                            mainImage={val.images[0]}
                        />
                    )
                })}
            </div>
        </div>
    )
};

export default Home;