import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import './App.css';

function App() {


  const apiKey = "d6036013bb0cfa3ea5f4a548b5f2a3dd"
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  useEffect(() => {
    getWeatherDetails("asuncion")
  }, [])

  return (
    <div className='col-md-12'>
      <div className='weatherBg'>
        <h1 className='heading'>Weather App</h1>
        <div className='d-grid gap-3 col-4 mt-4'>
          <input type='text' className='form-control' />
          <button className='btn btn-primary' type='button'>Buscar</button>
        </div>
      </div>

      <div className='col-md-12 text-center mt-5'>
        <div className="shadow rounded weatherResultBox">

          <img className='weatherIcon'
            src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png' />
          <h5 className='weatherCity'>Asunción</h5>
          <h6 className='weatherTemp'>18°C
          </h6>
        </div>
      </div>

    </div>
  );
}

export default App;
