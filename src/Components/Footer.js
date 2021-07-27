import React from 'react';
import "./Footer.css";
import Logo from "./../assets/logo.png";

function Footer(){
    return (
        <div className="footer">
            <header>
                <img src={Logo} className="footer__logo"></img>
            </header>
            <div className="footer__text">
                <div className="footer__left">
                    <h2>Products</h2>
                    <p>• Stocks</p>
                    <p>• Grips</p>
                    <p>• Parts</p>
                    <p>• Accessories</p>
                    <p>• Optics</p>
                    <p>• Lasers/Flashlights</p>
                </div>
                <div className="footer__center">
                    <span>
                        <h2>Xtreme Tactical Sports</h2>
                    </span>
                    <p>About Us</p>
                    <p>Support</p>
                    <p>Warranties</p>
                    <p>Catalougs</p>
                    <p>Contact</p>
                </div>
                <div className="footer__right">
                    <span>
                        <h2>Social</h2>
                    </span>
                    <div className="footer__right__images">

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;