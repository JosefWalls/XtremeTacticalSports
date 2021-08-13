import React, { useEffect, useState } from 'react';
import "./VendorNewProduct.css";
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {db} from "./../../firebase";
import ProductCard from '../ProductCard';
import firebase from 'firebase';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 1000,
      height: 750,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow: 'scroll'
    },
  }));

function VendorNewProduct({isItOpen, vendor}) {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle());
    const [products, setProducts] = useState([]);
    const [modalStatus, setmodalStatus] = useState(isItOpen)

    useEffect(async() => {
        const productsFound = [];
        await db.collection("products").get().then(snapshot => {
            snapshot.docs.forEach(doc => productsFound.push([doc.data(), doc.id]))
        })

        setProducts(productsFound)
    }, [])
    
    const handleAddProductToVendor = async (product) => {
        // first add vendor information to the product's venor list
        await db.collection("products").doc(product[1]).update({vendors: firebase.firestore.FieldValue.arrayUnion(vendor[1])})
        .catch(err => console.log(err.message))
        // now add product information to the vendors products list
        await db.collection("vendors").doc(vendor[1]).update({productsCarried: firebase.firestore.FieldValue.arrayUnion(product[1])})
        .catch(err => console.log(err.message))
    }

    return (
        <div>
            <Modal open={isItOpen} onClose={() => setmodalStatus(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <p>Search products:</p>
                    <input></input>
                    <button>Done</button>
                    <div className="vendor__productModalGrid">
                        {products.map((val, i) => {
                            return (
                                <section onClick={() => handleAddProductToVendor(val)}>
                                <ProductCard
                                    name={val[0].name}
                                    sku={val[0].sku}
                                    mainImage={val[0].images[0]}
                                    productId={val[1]}
                                    renderRoute={false}
                                />
                                </section>
                            )
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default VendorNewProduct
