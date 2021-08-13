import './Home.css';
import HomeSlideshow from './HomeSlideshow';
import HomeCategories from './HomeCategories';
import HomeStory from './HomeStory';
import React, {useEffect} from 'react';

function Home() {
  return (
        <div className="home">
              <HomeSlideshow/>
              <div className="home__homeCategories">
                <HomeCategories subCategoryName="Rails"/>
                <HomeCategories subCategoryName="Anodized"/>
                <HomeCategories subCategoryName="Grips"/>
              </div>
              <HomeStory/>
              <div className="home_Distrubitors">
                <h1>Distrubors/Vendors</h1>
              </div>
              <div className="home_Cataloug">
                <h1><strong>Download</strong> Our</h1>
                <h3>Catalouge</h3>
              </div>
        </div>
  );
}

export default Home;
