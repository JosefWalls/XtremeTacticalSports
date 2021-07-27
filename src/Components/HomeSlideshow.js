import React from 'react';
import {Carousel} from "react-bootstrap";
import "./HomeSlideShow.css";
import Image from "./../assets/08-19-2020.jpg";

function HomeSlideshow(){
    return (
    <Carousel className="homeSlideShow">
        <Carousel.Item>
          <img src={Image} />
        </Carousel.Item>
        {/* <Carousel.Item>
          <img src={Image} />
        </Carousel.Item> */}
    </Carousel>
    )
}


export default HomeSlideshow;