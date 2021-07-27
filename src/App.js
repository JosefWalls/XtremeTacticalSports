import './App.css';
import Navbar from './Components/Navbar';
import HomeSlideshow from './Components/HomeSlideshow';
import HomeCategories from './Components/HomeCategories';
import HomeStory from './Components/HomeStory';
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <HomeSlideshow/>
      <div className="app__homeCategories">
        <HomeCategories categoryName="Stocks"/>
        <HomeCategories categoryName="Anodized Parts"/>
        <HomeCategories categoryName="Grips"/>
      </div>
      <HomeStory/>
      <div className="app_Distrubitors">
        <h1>Distrubors/Vendors</h1>
      </div>
      <div className="app_Cataloug">
        <h1><strong>Download</strong> Our</h1>
        <h3>Catalouge</h3>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
