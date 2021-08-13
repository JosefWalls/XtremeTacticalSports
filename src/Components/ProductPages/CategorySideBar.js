import React from "react";
import "./CategorySidebar.css"

function CategorySidebar({categoryName}){
    return (
        <div className="categorySidebar">
            <div className="categorySidebar__pricing">
                <h2>Pricing Range</h2>
                <p>$0 - $19.99</p>
                <p>$20.00 - $39.99</p>
                <p>$40.00 - $49.99</p>
                <p>$50.00 - $99.99</p>
                <p>$100.00 - $199.99</p>
            </div>
            <div className="categorySidebar__colors">
                <h2>Color Range</h2>
                <section>
                    <span id="color_black"></span>
                    <span id="color_blue"></span>
                    <span id="color_red"></span>
                    <span id="color_purple"></span>
                    <span id="color_bronze"></span>
                    <span id="color_odg"></span>
                    <span id="color_fde"></span>
                    <span id="color_orange"></span>
                </section>
            </div>
            <div className="categorySidebar__platform">
                <h2>Platform</h2>
                <p>AR15</p>
                <p>AR10</p>
                <p>AR 9MM</p>
            </div>
        </div>
    )
};

export default CategorySidebar;