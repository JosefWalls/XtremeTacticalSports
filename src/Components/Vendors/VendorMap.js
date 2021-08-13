import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';

function Map(){
    return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{lat: 32.500759, lng: -92.111221 }}
        />
    )
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

function VendorMap() {
    return (
        <div style={{height: '100%', width: '100%'}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{height: '100%'}}/>}
                containerElement={<div style={{height: '100%'}}/>}
                mapElement={<div style={{height: '100%'}}/>}
            />
        </div>
    )
}

export default VendorMap
