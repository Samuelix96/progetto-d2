import React, { Component } from "react";
import Navigation from "./Components/navbar/Navigation";
import './index.css';
import Main from "./Components/main/Main";
import horrorbooks from "./data/esercizi/horror.json";



class App extends Component {

  render () {
    return(
      <>
        <Navigation/>
        <Main horrorbooks= {horrorbooks}/>
       
        
      </>
    )
  }
}
export default App;