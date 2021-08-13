import React, { useState } from 'react';
import "./NewProduct.css";
import { CheckBox, Add } from '@material-ui/icons';
import { db, storage } from "./../../firebase";
import firebase from "firebase";
import UploadingModal from './UploadingModal';

function NewProduct(){

    const [productHasVariants, setproductHasVariants] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [productVariants, setProductVariants] = useState([]);
    const [productSKU, setProductSKU] = useState('');
    const [productMSRP, setProductMSRP] = useState('');
    const [productCategory, setProductCategory] = useState("");
    const [productSubCategory, setProductSubCategory] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    const [productUploading, setProductUploading] = useState(false);

    // these below are the inputs for the variants fields
    const [variantColor, setVariantColor] = useState('');
    const [variantMSRP, setVariantMSRP] = useState('');
    const [variantSKU, setVariantSKU] = useState('');

    const handleAddVariant =  async (e) => {
        await setProductVariants([...productVariants, {variantColor, variantMSRP, variantSKU}])
        setVariantColor("");
        setVariantMSRP("");
        setVariantSKU("");
    }

    const handleFileUpload = (e) => {
        if(e.target.files[0]){
            setImageUploading(true);
            //setImageUploading(true) takes care of loading modal popup thing
            const image = e.target.files[0];
            let uploadTask = storage.ref(`productImages/${image.name}`).put(image);
            uploadTask.on("state_changed", (snapshot) => {

            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref("productImages").child(image.name).getDownloadURL()
                .then(async (url) => {
                    await setProductImages([...productImages, url]);
                    setImageUploading(false);
                })
            })
        }
    }

    const handleRemoveImage = async (index) => {
        alert(index);
        const currentImages = productImages;
        currentImages.splice(index, 1);
        await setProductImages(currentImages)
    }

    const handleCategorySelection = (e) => {
        setProductCategory(e.target.value)
    }

    const handleSubCategorySelection = (e) => {
        setProductSubCategory(e.target.value)
    }

    const addProductToDatabase = () => {
        setProductUploading(true);
        let LowestPrice = null;

        //function below checks that if the product is a variant, then find the lowest priced variant for "from price" on front end
        if(productVariants){
            for(let i = 0; i <= productVariants.length - 1; i++){
                if(i === 0){
                    LowestPrice = +productVariants[i].variantMSRP
                } else {
                    if(+productVariants[i].variantMSRP < LowestPrice){
                        LowestPrice = +productVariants[i].variantMSRP
                    }
                }
            }
        }

        if(productVariants.length !== 0){
            db.collection("products").add({
            name: productName,
            description: productDescription,
            category: productCategory,
            subCategory: productSubCategory,
            productVariants: productVariants,
            images: productImages,
            sku: productSKU,
            msrp: LowestPrice,
            vendors: []
        })
            .then(() =>{
                setProductUploading(false);
            })
            .catch(err => {
                console.log(err.message)
            })
        } else {
            db.collection("products").add({
            name: productName,
            description: productDescription,
            category: productCategory,
            subCategory: productSubCategory,
            productVariants: productVariants,
            images: productImages,
            sku: productSKU,
            msrp: productMSRP,
            vendors: []
        })
            .then(() =>{
                setProductUploading(false);
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    return (
        <div className="addNew">
            {imageUploading ? <UploadingModal stateOfDisplay={true} message={"Image is uploading"}/> : null}
            {productUploading ? <UploadingModal stateOfDisplay={true} message={"Product is uploading"}/> : null}
            <div className="addNew__textInformation">
                <div className="addNew__textInformation__InnerContainer">
                    <h3>Product Name</h3>
                    <input value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                    <h3>Product Description</h3>
                    <input id="productDescriptionField" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></input>
                </div>
            </div>
            <div className="addNew__textInformation">
                <div className="addNew__categorySelection__InnerContainer">
                    <h3 id="ProductCategorySelection">Product Category : {productCategory}</h3>
                    <select onChange={handleCategorySelection}>
                        <option>---</option>
                        <option value="AR_Parts">AR Parts & Accessories</option>
                        <option value="Optics">Optics</option>
                        <option value="Lasers_Flashlights">Lasers/Flashlights</option>
                    </select>
                    <h3 id="ProductCategorySelection">Product Subcategory : {productSubCategory}</h3>
                        {productCategory === 'AR_Parts' ?
                        <select onChange={handleSubCategorySelection}>
                            <option>---</option>
                            <option value="Stocks">Stocks</option>
                            <option value="Grips">Grips</option>
                            <option value="Anodized">Anodized Parts</option>
                            <option value="Mounts">Mounts</option>
                            <option value="Rails">Rails</option>
                            <option value="Sights">Sights</option>
                            <option value="Muzzles">Muzzle Brakes</option>
                        </select>
                        :productCategory === 'Optics' ?
                        <select onChange={handleSubCategorySelection}>
                            <option>---</option>
                            <option value="DotSights">Dot Sights</option>
                            <option value="Scopes">Scopes</option>
                        </select>
                        :productCategory === 'Lasers_Flashlights' ?
                        <select onChange={handleSubCategorySelection}>
                            <option>---</option>
                            <option value="Laser_Green">Green Lasers</option>
                            <option value="Red_Green">Red Lasers</option>
                            <option value="Combination">Combination Lasers</option> 
                            {/* combination means like cgll2, ml2 */}
                        </select>
                        : null}
                </div>
            </div>
            <div className="addNew__photoManagement">
                <div className="addNew__photoManagement__InnerContainer">
                    <div className="addNew__mainImage">
                        <img src={productImages[0]}/>
                    </div>
                    <div className="addNew__allProducts">
                        {productImages.map((val, i) => {
                            return (
                                <img src={val} onClick={(i) => handleRemoveImage(i)}/>
                            )
                        })}
                        <span>
                            <input type="file" onChange={handleFileUpload}/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="addNew__textInformation">
                <div className="addNew__textInformation__InnerContainer">
                    <h3>Does this product have variants?</h3>
                    <CheckBox onClick={() => productHasVariants ? setproductHasVariants(false) : setproductHasVariants(true)}/>
                </div>
            </div>
            {productHasVariants?
            <div className="addNew__textInformation">
                <div className="addNew__textInformation__InnerContainer">
                    <h3>Variant Details:</h3>
                    <div className="addNew__variants">
                    {productVariants.map((val, i) => {
                        return (
                            <div>
                                <p>{val.variantColor}</p>
                                <p>${val.variantMSRP}</p>
                                <p>{val.variantSKU}</p>
                            </div>
                        )
                    })}
                    </div>
                    <div className="addNew__variantsForm">
                        <input placeholder="Color" value={variantColor} onChange={(e) => setVariantColor(e.target.value)}></input>
                        <input placeholder="SKU" value={variantSKU} onChange={(e) => setVariantSKU(e.target.value)}></input>
                        <input placeholder="MSRP" value={variantMSRP} onChange={(e) => setVariantMSRP(e.target.value)}></input>
                        <span>
                            <Add onClick={handleAddVariant}/>
                        </span>
                    </div>
                </div>
            </div>
            :
            <div className="addNew__textInformation">
                <div className="addNew__textInformation__InnerContainer">
                    <h3>PRODUCT SKU:</h3>
                    <input placeholder="" value={productSKU} onChange={(e) => setProductSKU(e.target.value)}></input>
                    <h3>MSRP:</h3>
                    <input placeholder="$" value={productMSRP} onChange={(e) => setProductMSRP(e.target.value)}></input>
                </div>
            </div>}
            <button onClick={() => addProductToDatabase()}>Add Product</button>
        </div>
    )
};

export default NewProduct;