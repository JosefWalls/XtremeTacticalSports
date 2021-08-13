import React from 'react';
import "./VendorCard.css";
import { useHistory } from 'react-router';

function VendorCard({city, state, name, logo, vendorId}) {

    const history = useHistory();

    return (
        <div className="vendorCard" onClick={() => history.push(`/SiteManagement/Vendor/${vendorId}`)}>
            <img src={logo}/>
            <p className="vendorCard__name">{name}</p>
            <p className="vendorCard__location">{city}, {state}</p>
        </div>
    )
}

export default VendorCard
