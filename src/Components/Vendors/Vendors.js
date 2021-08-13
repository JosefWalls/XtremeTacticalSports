import React, {useEffect, useState} from 'react';
import "./Vendors.css";
import { Link } from 'react-router-dom';
import {db} from "./../../firebase";
import VendorCard from './VendorCard';

function Vendors() {

    const [vendors, setVendors] = useState([]);

    useEffect(async () => {
        const vendorsFound = [];
        await db.collection("vendors").get().then((snapshot) => {
            snapshot.docs.forEach(doc => vendorsFound.push([doc.data(), doc.id]));
        })

        setVendors(vendorsFound);
    }, [])
    
    return (
        <div className="vendors">
            <Link to="/SiteManagement/Vendors/New">
                <button>Add a new vendor</button>
            </Link>
            <div className="vendorList">
                {vendors.map((val, i) => {
                    return (
                        <VendorCard
                            city={val[0].city}
                            state={val[0].state}
                            name={val[0].name}
                            logo={val[0].logo}
                            vendorId={val[1]}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Vendors
