import React from 'react';
import "./Dropdown.css";

function Dropdown(){
    return (
        <div className="dropdown">
            <main className="dropdown__cards">
                <div className="dropdown__card">
                    <img></img>
                    <footer>AR15 Parts</footer>
                </div>
                <div className="dropdown__card">
                    <img></img>
                    <footer>AR15 Accessories</footer>
                </div>
                <div className="dropdown__card">
                    <img></img>
                    <footer>AR Platform Parts</footer>
                </div>
                <div className="dropdown__card">
                    <img></img>
                    <footer>AR Platform Accessories</footer>
                </div>
                <div className="dropdown__card">
                    <img></img>
                    <footer>Optics</footer>
                </div>
                <div className="dropdown__card">
                    <img></img>
                    <footer>Lasers/Flashlights</footer>
                </div>
                </main>
            <footer className="dropdown__quote">
                <h2>• Where Quality and Accuracy come together •</h2>
            </footer>
        </div>
    )
}


export default Dropdown;