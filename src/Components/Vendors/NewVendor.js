import React, {useState} from 'react';
import "./NewVendor.css";
import {db, storage} from "./../../firebase";
import { useHistory } from 'react-router';
import UploadingModal from "./../SiteManagement/UploadingModal";

function NewVendor() {

    const [vendorName, setVendorName] = useState("");
    const [vendorAddress, setVendorAddress] = useState("");
    const [vendorCity, setVendorCity] = useState("");
    const [vendorState, setVendorState] = useState("");
    const [vendorPhoneNumber, setVendorPhoneNumber] = useState("");
    const [vendorEmail, setVendorEmail] = useState("");
    const [vendorWebsite, setVendorWebsite] = useState("");
    const [vendorLogo, setVendorLogo] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    const history = useHistory();

    const handleImageUpload = (e) => {
        if(e.target.files[0]){
            setImageUploading(true);
            //setImageUploading(true) takes care of loading modal popup thing
            const image = e.target.files[0];
            let uploadTask = storage.ref(`vendorLogos/${image.name}`).put(image);
            uploadTask.on("state_changed", (snapshot) => {

            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref("vendorLogos").child(image.name).getDownloadURL()
                .then(async (url) => {
                    await setVendorLogo(url);
                    console.log(url)
                })
            })
        }
        setImageUploading(false)
    }

    const handleNewVendor = async () => {
        console.log(vendorName, vendorAddress, vendorCity, vendorState, vendorPhoneNumber, vendorEmail, vendorWebsite);
        await db.collection("vendors").add({
            name: vendorName,
            address: vendorAddress,
            city: vendorCity,
            state: vendorState,
            phone: vendorPhoneNumber,
            email: vendorEmail,
            website: vendorWebsite,
            logo: vendorLogo,
            productsCarried: []
        })
        .then(() => history.push("/Vendors"))
        .catch(err => console.log(err.message))
    }

    return (
        <div className="addNew">     
        {imageUploading === true ? <UploadingModal stateOfDisplay={true} message={"Image is uploading"}/> : null}      
        <div className="addNew__textInformation">
            <div className="addNew__textInformation__InnerContainer">
                <h3>Vendor Name</h3>
                <input placeholder="DMA Inc" onChange={(e) => setVendorName(e.target.value)}></input>
                <h3>Vendor Address:</h3>
                <input placeholder="3015 E Randol Mill Rd" onChange={(e) => setVendorAddress(e.target.value)}/>
                <h3>Vendor City:</h3>
                <input placeholder="Arlington" onChange={(e) => setVendorCity(e.target.value)}/>
                <h3>Vendor State:</h3>
                <input placeholder="Texas" onChange={(e) => setVendorState(e.target.value)}></input>
                <h3>Vendor Phone Number:</h3>
                <input placeholder="817-633-6123" onChange={(e) => setVendorPhoneNumber(e.target.value)}></input>
                <h3>Vendor Contact Email:</h3>
                <input placeholder="sales@dma-inc.net" onChange={(e) => setVendorEmail(e.target.value)}></input>
                <h3>Vendor Website:</h3>
                <input placeholder="www.dma-inc.net" onChange={(e) => setVendorWebsite(e.target.value)}></input>
            </div>
        </div>
            <div className="addNew__photoManagement">
                <div className="addNew__photoManagement__InnerContainer">
                    <div className="addNew__allProducts">
                        <span>
                            <input type="file" onChange={handleImageUpload}/>
                            <p>Please be 1024 x 1024</p>
                        </span>
                    </div>
                </div>
            </div>
        <button onClick={() => handleNewVendor()}>Add Vendor</button>
        </div>
    )
}

export default NewVendor
