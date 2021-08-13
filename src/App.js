import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import {HashRouter, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import routes from "./routes";
import React, {useEffect} from 'react';
require("dotenv").config();

function App() {

  useEffect(() => {
    // console.log(window.locaa)
  }, [])

  return (
    <HashRouter>
      <Router>
        <Navbar/>
        {routes}
        <Footer/>
      </Router>
    </HashRouter>
  );
}

export default App;
