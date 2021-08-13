import React, {useState} from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Loop } from '@material-ui/icons';
import {db} from "./../../../firebase";
import "./EditProduct.css";

function getModalStyle(){
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    }
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 1000,
        height: '80vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'scroll'
    }
}))

function EditProductModal({stateOfDisplay, product}){

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle());
    const [productName, setProductName] = useState(product[0]?.name);
    const [productCategory, setProductCategory] = useState(product[0]?.category);
    const [productSubcategory, setProductSubcategory] = useState(product[0]?.subCategory);
    const [productDescription, setProductDescription] = useState(product[0]?.description);
    const [productImages, setProductImages] = useState(product[0]?.images);
    const [productMSRP, setProductMSRP] = useState(product[0]?.msrp);
    const [productSKU, setProductSKU] = useState(product[0]?.sku);

    const submitChanges = async () => {
        await db.collection("products").doc(product[1]).update({
            name: productName,
            category: productCategory,
            subCategory : productSubcategory,
            description: productDescription,
            images: productImages
        })
        .then(() => {alert("success")})
        .catch(err => console.log(err.message))
    }

    const handleRemoveImage = async (index) => {
      const array = productImages;
      await array.splice(index, 1);
      await db.collection("products").doc(product[1]).update({
          images: array
      })
      .then(() => {alert(index + " has been removed")})
      .catch(err => console.log(err.message))
      setProductImages(array)
    }

    console.log(product[0])

    return (
        <div>
            <Modal open={stateOfDisplay} onClose={stateOfDisplay}>
                <div style={modalStyle} className={classes.paper}>
                  <div className="editProduct__modalInner">
                    <div className="editProduct__modalPictures">
                        {product[0]?.images.map((val, i) => {
                          return (
                            <img src={val} onClick={() => handleRemoveImage(i)}/>
                          )
                        })}
                    </div>
                    <div className="editProduct__modalInputs">
                        <p>Product Name:</p>
                        <input defaultValue={product[0]?.name} onChange={(e) => setProductName(e.target.value)}/>
                        <p>Product Category:</p>
                        <input defaultValue={product[0]?.category} onChange={(e) => setProductCategory(e.target.value)}/>
                        <p>Product Subcategory:</p>
                        <input defaultValue={product[0]?.subCategory} onChange={(e) => setProductSubcategory(e.target.value)}/>
                        <p>Product Description:</p>
                        <input defaultValue={product[0]?.description} className="editProduct__modalDescription" onChange={(e) => setProductDescription(e.target.value)}/>
                        {product[0].productVariants.length !== 0 ?
                        <section>
                          <p>Product Variants:</p>
                          {/* map over variants */}
                        </section>
                        : 
                        <section>
                          <p>Product MSRP:</p>
                          <input defaultValue={product[0]?.msrp} onChange={(e) => setProductDescription(e.target.value)}/>
                          <p>Product SKU:</p>
                          <input defaultValue={product[0]?.sku}  onChange={(e) => setProductDescription(e.target.value)}/>
                        </section>
                        }
                    </div>
                  </div>
                  <button>Cancel Changes</button>
                  <button onClick={() => submitChanges()}>Submit Changes</button>
                </div>
            </Modal>
        </div>
    )
};

export default EditProductModal;