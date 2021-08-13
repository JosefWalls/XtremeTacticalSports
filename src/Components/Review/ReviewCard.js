import React, { useState } from 'react';
import "./ReviewCard.css";

function ReviewCard({name, rating, title, content}){

    return (
        <div className="reviewCard">
            <div className="reviewCard__rating">
            {Array(+rating).fill().map((val, i) => {
                return (
                    <p id="rating__star">★</p>
                )
            })}
            </div>
            <div className="reviewCard__title">
                <p>{title}</p>
            </div>
            <div className="reviewCard__name">
                <p>From: {name}</p>
            </div>
            <div className="reviewCard__review">
                <p>{content}</p>
            </div>
        </div>
    )
};

export default ReviewCard;