import React, { useEffect, useState } from 'react';
import "./Product.css";
import {db} from "./../../firebase";
import firebase from 'firebase';
import ReviewCard from '../Review/ReviewCard';
import UploadingModal from "./../SiteManagement/UploadingModal";
import EditProductModal from "./../SiteManagement/EditProductModals/EditProduct";

function Product(props){

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [reviewName, setReviewName] = useState("");
    const [reviewRating, setReviewRating] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isThisManagement, setIsThisManagement] = useState(false);
    const [openEditProductModal, setOpenEditProductModal] = useState(false);

    useEffect(async() => {
        if(props.location.pathname === `/SiteManagement/Product/${props.match.params.Product_id}`) {
            setIsThisManagement(true);
        }
        const ProductId = (props.match.params.Product_id);
        const ReviewsFound = [];
        await db.collection("products").where(firebase.firestore.FieldPath.documentId(), "==", ProductId).get().then(snapshot => {
            snapshot.docs.forEach((doc => setProduct(doc.data())));
            setMainImage(product?.images[0])
        });
        await db.collection("reviews").where("productId", "==", ProductId).get().then(snapshot => {
            snapshot.docs.forEach((doc => ReviewsFound.push(doc.data())));
        })

        setReviews(ReviewsFound)
    }, [])

    const handleReviewSubmit = () => {
        db.collection("reviews").add({
            productId: props.match.params.Product_id,
            name: reviewName,
            rating: reviewRating,
            title: reviewTitle,
            content: reviewContent
        })
        .then(() => alert("success"))
        .catch(err => alert(err.message))
    }


    return (
        <div className="product">
            <header className="product__path">
                <h1>Gun Parts / Anodized Charging Handle</h1>
            </header>
            <div className="product__info">
                <div className="product__leftSide">
                    <div className="product__mainImage">
                        <img src={product?.images[0]}/>
                    </div>
                    <div className="product__imageGrid">
                        {product?.images.map((val, i) => {
                            return (
                                <img src={val}/>
                            )
                        })}
                    </div>
                </div>
                <div className="product__rightSide">
                    <div className="product__header">
                        <h2>{product?.name}</h2>
                        <h5>#{product?.sku}</h5>
                        <p>MSRP: {product?.productVariants.length > 0 ? "From": null} ${product?.msrp}</p>
                    </div>
                    {product?.productVariants.length > 0? 
                    <div className="product__variantColors">
                        <h2>Colors Available:</h2>
                        <span id="product__red"></span>
                        <span id="product__blue"></span>
                        <span id="product__bronze"></span>
                        <span id="product__purple"></span>
                    </div>: null}
                    <div className="product__description">
                        <p>{product?.description}</p>
                    </div>
                    {isThisManagement ? <button className="product__editButton" onClick={() => {openEditProductModal ? setOpenEditProductModal(false): setOpenEditProductModal(true)}}>Edit Product</button>: null}
                    {openEditProductModal ? <EditProductModal stateOfDisplay={true} product={[product, props.match.params.Product_id]}/>: null}
                    <header className="product__reviewHeader">Customer Reviews: </header>
                    <div className="product__reviews">
                        {reviews?.map((val, i) => {
                            return(
                                <ReviewCard
                                    name={val.name}
                                    rating={val.rating}
                                    title={val.title}
                                    content={val.content}
                                />
                            )
                        })}
                    </div>
                    {isThisManagement === false ? 
                    <div className="product__reviewInputs">
                        <p id="product__reviewInputsHeader">Write review for {product?.name}</p>
                        <span>
                            <p>Please leave your name:</p>
                            <input onChange={(e) => setReviewName(e.target.value)}/>
                        </span>
                        <span>
                            <p>Review Title:</p>
                            <input onChange={(e) => setReviewTitle(e.target.value)}/>
                        </span>
                        <span>
                            <p>Enter Rating:</p>
                            <input placeholder="5/5" onChange={(e) => setReviewRating(e.target.value)}/>
                        </span>
                        <input placeholder="Write a five star" id="product__reviewInputField" onChange={(e) => setReviewContent(e.target.value)}/>
                        <button onClick={()=> handleReviewSubmit()}>Submit Review</button>
                    </div>
                    : null}
                </div>
            </div>
            <div className="product__related">
                <header>
                    <h3>Related Products</h3>
                </header>
                <div className="product__relatedGrid">
                </div>
            </div>
            <div className="product__vendors">
                <header>
                    <h3>Where to buy:</h3>
                </header>
                <div className="product__vendorGrid">
                </div>
            </div>
        </div>
    )
};

export default Product;