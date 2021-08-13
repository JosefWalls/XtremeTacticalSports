import React from 'react';
import "./Dropdown.css";
import {Link} from "react-router-dom"

function Dropdown(){
    return (
        <div className="dropdown">
            <main className="dropdown__cards">
                <Link to="/Category/AR_Parts">
                    <div className="dropdown__card">
                        <img></img>
                        <footer>AR Parts & Accessories</footer>
                    </div>
                </Link>
                <Link to="/Category/Optics">
                <div className="dropdown__card">
                    <img></img>
                    <footer>Optics</footer>
                </div>
                </Link>
                <Link to="/Category/Lasers">
                <div className="dropdown__card">
                    <img></img>
                    <footer>Lasers/Flashlights</footer>
                </div>
                </Link>
            </main>
            <footer className="dropdown__quote">
                <h2>• Where Quality and Accuracy come together •</h2>
            </footer>
        </div>
    )
}


export default Dropdown;