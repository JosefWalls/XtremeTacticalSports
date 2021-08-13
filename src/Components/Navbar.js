import React, { useState } from 'react';
import "./Navbar.css";
import Logo from "./../assets/logo.png";
import {Menu} from "@material-ui/icons";
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

function Navbar(){

    const [displayDropdown, setDisplayDropdown] = useState(false);

    return (
        <nav>
        <div className="navbar">
            <Link to="/">
            <div className="navbar__logo">
                <img src={Logo}></img>
            </div>
            </Link>
            <div className="navbar__link">
                <Menu id="navbar__link__icon" onClick={() => displayDropdown ? setDisplayDropdown(false): setDisplayDropdown(true)}/>
            </div>
        </div>
            <div className={`navbar__dropdown${`_`+ displayDropdown}`}  onClick={() => setDisplayDropdown(false)}>
                <Dropdown/>
            </div>
        </nav>
    )
}


export default Navbar;