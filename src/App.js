import React from "react";
import "./App.css";
import Location from "./Location";
import Weather from "./Weather";

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      lat: "",
      lng: "",
      temperature: "",
      description: "",
      image: "",
      textbox:""
    };
  }

  componentDidMount() { //when react page renders, react executes this function.so this function's result will be loaded when we view for the first time-->l
    this.getWeather("Tokyo");
  }

  getWeather = (location) => {
      const apiKey = "be1356b2b174bac2ab439938298879d6";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      return fetch(url).then(res => res.json()) //res denotes promise is given (only).convert res (i.e) promise to json using res => res.json
              .then(json => {
                console.log(json);
                this.setState({
                   city: json.name,
                   country: json.sys.country,
                   lat: json.coord.lat,
                   lng:json.coord.lon,
                   temperature: Math.floor(json.main.temp - 273.15),
                   description: json.weather[0].description,
                   image: json.weather[0].main

                  });
              });
    }

 /* setCity(event) {
    console.log("event",event);
    console.log("event.target.value",event.target.value); //event.target.value is input tag's value in this case
    //this.state.textbox=event.target.value;
    this.setState({textbox:event.target.value})   //describe changes here and rect does the changes. 
  }

  */

  setCity = event => {
    console.log("event",event);
    console.log("event.target.value",event.target.value); //event.target.value is input tag's value in this case
    //this.state.textbox=event.target.value;
    this.setState({textbox:event.target.value})   //describe changes here and react does the changes. 
  }

  handleSubmit =() => {
    this.getWeather(this.state.textbox);
  }

  render () {
    return (

     <div className="weather-app__container">
      <div className="weather-app__searchbar">
        <input 
        className="weather-app__textbox"
        placeholder="Search a city"
        value={this.state.textbox}
        onChange={this.setCity}
        />
        <button onClick={this.handleSubmit} className="weather-app__button"> Find
        </button>
      </div>
        <Location city={this.state.city} country={this.state.country} lat={this.state.lat} lng={this.state.lng}/>
        <Weather 
            image={this.state.image}
            description={this.state.description}
            temperature={this.state.temperature}

        />
     </div>
     
    );

    }
}
export default App;