import React, { useEffect, useState } from 'react';
import "./CategoryPage.css";
import firebase from 'firebase';
import {db} from "../../firebase";
import CategorySidebar from './CategorySideBar';
import CategoryHeader from './CategoryHeader';
import CategoryProducts from './CategoryProducts';

function CategoryPage(props){

    const [products, setProducts] = useState();

    return (
        <div className="category">
            <CategorySidebar/>
            <div className="category__body">
                <CategoryHeader category={props.match.params.Category}/>
                <CategoryProducts category={props.match.params.Category}/>
            </div>
        </div>
    )
}

export default CategoryPage;