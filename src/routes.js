import React from "react";
import {Switch, Route} from "react-router-dom";

import CategoryPage from "./Components/ProductPages/CategoryPage";
import Home from "./Components/Home";

import Login from "./Components/SiteManagement/Login";
import SiteManagement_Home from "./Components/SiteManagement/Home";
import SiteManagement_NewProduct from "./Components/SiteManagement/NewProduct";

import ProductPage from "./Components/ProductPages/Product";

import Vendors_Home from "./Components/Vendors/Vendors";
import Vendors_New from "./Components/Vendors/NewVendor";
import Vendor_Page from "./Components/SiteManagement/Vendor";

export default (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Category/:Category" component={CategoryPage}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/SiteManagement" component={SiteManagement_Home}/>
        <Route exact path="/SiteManagement/NewProduct" component={SiteManagement_NewProduct}/>
        <Route exact path="/Products/:Product_id" component={ProductPage}/>
        <Route exact path="/SiteManagement/Product/:Product_id" component={ProductPage}/>
        <Route exact path="/SiteManagement/Vendors" component={Vendors_Home}/>
        <Route exact path="/SiteManagement/Vendors/New" component={Vendors_New}/>
        <Route exact path="/SiteManagement/Vendor/:VendorId" component={Vendor_Page}/>
    </Switch>
)