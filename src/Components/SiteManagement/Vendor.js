import React, {useEffect, useState} from 'react';
import "./Vendor.css";
import {db} from "./../../firebase";
import firebase from 'firebase';
import VendorNewProduct from './VendorNewProduct';
import ProductCard from '../ProductCard';

function Vendor(props) {

    const [vendor, setVendor] = useState(null);
    const [productsCarried, setProductsCarried] = useState([]);

    useEffect(async () => {
        const vendorId = props.match.params.VendorId;
        await db.collection("vendors").where(firebase.firestore.FieldPath.documentId(), "==", vendorId).get().then(snapshot => {
            snapshot.docs.forEach((doc => setVendor(doc.data())));

        });
        await grabVendorProducts();
    }, [])

    console.log(productsCarried)

    const grabVendorProducts = async () => {
        const productsFound = [];
        vendor.productsCarried.map(async (val, i) => {
            console.log(val)
            await db.collection("products").where(firebase.firestore.FieldPath.documentId(), "==", val).get().then(snapshot => {
                snapshot.docs.forEach((doc) => productsFound.push(doc.data()))
            })
            
            await setProductsCarried(productsFound)
        })
    }


    return (
        <div className="vendor">
            <div className="vendor__top">
                <div className="vendor__information">
                    <img src={vendor?.logo}/>
                    <h2>{vendor?.name}</h2>
                    <p>{vendor?.website}</p>
                    <span className="vendor__contact">
                        <p>
                            <span className="vendor__contactMethod">Phone:</span>
                            <span>{vendor?.phone}</span>
                        </p>
                        <p>
                            <span className="vendor__contactMethod">Email:</span>
                            <span>{vendor?.email}</span>
                        </p>
                    </span>
                    <p>{vendor?.address} - {vendor?.city}, {vendor?.state}</p>
                </div>
                <div className="vendor__map">
                    {/* <header>Where to find </ onChange={(e) => setProductName(e.target.value)} */}
                </div>
            </div>
            <div className="vendor__products">
                <div className="vendor__productsHeader">
                    <h2>Products carried by {vendor?.name}: </h2>
                </div>
                <div className="vendor__productGrid">
                    { productsCarried.length !== 0? productsCarried.map((val, i) => {
                        return (
                            <ProductCard 
                                name={val.name}
                                sku={val.sku}
                                msrp={val.msrp}
                                mainImage={val.images[0]}
                                renderRoute="Management"
                                productId="Osl3nTCSXnQEwnWY6JE4"
                            />
                        )
                    }): null}
                </div>
            </div>
            <VendorNewProduct isItOpen={false} vendor={[vendor, props.match.params.VendorId]}/>
        </div>
    )
}

export default Vendor
