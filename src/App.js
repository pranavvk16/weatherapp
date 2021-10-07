import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Wind from "./accets/wind.png"
import Compass from "./accets/compass.png"
import Rain from "./accets/rain.png"


function App() {
  const [querry, setquerry] = useState("")
  const [apiresponse, getapiresponse] = useState([])
  const [forecast, getforecast] = useState([1, 2])
  const [show, setshow] = useState(false)


  const weatherdata = async (querry) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=610933441a874e8887d222215210510&q=${querry}&days=6&aqi=yes&alerts=yes`)
    await getapiresponse(response.data)
    // await console.log(apiresponse.location.name);
    // await console.log(apiresponse.location.region);
    // await console.log(apiresponse.current.temp_c);
    getforecast(response.data.forecast.forecastday.splice(1, 2));
    console.log(forecast);
    await setshow(true);
  }



  return (

    <div className="App"><center>
      <h1>Weather</h1>
      <input placeholder="Find your location..." onChange={e => setquerry(e.target.value)} type="search" /><button onClick={() => weatherdata(querry)}>Find</button><br /><br />
      <div className="cardcontainer"><div className="weathercard">
        <div className="topnav">
          Today
        </div>
        <div className="box">
          <div className="content">
            <h4 className="place"><span className="location">{show ? apiresponse.location.name : "London"}</span><span className="region">{show ? apiresponse.location.region : "United Kingdom"}</span></h4>
            <div className="container">
              <div className="temp">{show ? apiresponse.current.temp_c : 24}<sup>o</sup>C</div>
              <div>
                <div className="condtion">{show ? apiresponse.current.condition.text : "Sunny"}</div>
                <img alt='icons' src={show ? apiresponse.current.condition.icon : "//cdn.weatherapi.com/weather/64x64/day/116.png"} />
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="data"><img alt="wind" className="imageclass" src={Rain} /><span className="value">2</span></div>
            <div className="data"><img alt="wind" className="imageclass" src={Wind} /><span className="value">{show ? apiresponse.current.wind_kph : 10}<span className='units'>km/h</span></span></div>
            <div className="data ">
              <img style={{ width: '16px', height: '16px' }} alt="wind" className="imageclass" src={Compass} />
              <span className="value">{show ? apiresponse.current.wind_dir : "N"}</span>
            </div>
          </div></div>
      </div>
        {forecast.map((x, index) => {
          // console.log(x.day.avgtemp_c);
          // console.log(x.day.condition.icon);
          return (<div style={{ width: '12%' }} className="weathercard">
            <div className="topnav">
              {show ? `${x.date.split("").splice(8,).join("")}/${x.date.split("").splice(5, 2).join("")} ` : "NaN"}

            </div>
            <div style={{
              height: "154.2px",
              overflow: "hidden",
              backgroundColor: '#37474f'
            }} className="box2">
              <div className="content">
                <div style={{ flexDirection: "column" }} className="container">
                  <div style={{ fontSize: '28px' }} className="temp">{show ? x.day.avgtemp_c : 24}<sup>o</sup>C</div>
                  <div>
                    <img style={{ width: '64px', height: '64px', margin: '3px' }} alt='icons' src={show ? x.day.condition.icon : "//cdn.weatherapi.com/weather/64x64/day/116.png"} />
                  </div>
                </div>
              </div>
              <div style={{ gap: "1px" }} className="footer">
                <div className="data"><img alt="wind" className="imageclass" src={Rain} /><span className="value">2</span></div>
                <div className="data"><img alt="wind" className="imageclass" src={Wind} /><span className="value">{show ? apiresponse.current.wind_kph : 10}<span className='units'>km/h</span></span></div>
              </div>
            </div>
          </div>)
        })}
      </div>
    </center >
    </div >
  );
}

export default App;
