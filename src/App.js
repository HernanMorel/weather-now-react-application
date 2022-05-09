import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import './App.css';
{/*the bootstrap library must be imported as always*/}

function App() {

  {/*although this is a relativey small project the api key is fine where it currently is. 
this would be stored in either an env file then through git ignore through secret key or even better, outside the folder.*/}
  const apiKey = "d6036013bb0cfa3ea5f4a548b5f2a3dd"

  {/*first implementation of useState, which will allow you to track changes in memory, facilitating the syntax and making this app possible through react*/}
  const [inputCity, setInputCity] = useState('')
  const [data, setData] = useState({})

  {/*Here you are editing the api url, so that it becomes dynamic, making cityName a variable which can be changed according to the call*/}
  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey

    {/*this is using axios to handle the respond events from the api call. */}
    axios.get(apiURL).then((res) => {

      console.log("response", res.data)

      setData(res.data)
      {/*here axios is handling the error call, in case there is one*/}
    }).catch((err) => {
      console.log("err", err)
    })
  }
  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleSearch();

    }
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
  }
  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }



  return (
    <div className='col-md-12'>
    {/*those columns are responsive, the app will be much more complicated without the bootstrap library*/}
      <div className='weatherBg'>
        <h1 className='heading'>Weather Now</h1>
        <div className='d-grid gap-3 col-4 mt-4'>
          <input type='text' className='form-control'
            value={inputCity}
            onKeyPress={handleKeypress}
            onChange={handleChangeInput} />
          <button className='btn btn-primary' type='button'
            onClick={handleSearch}
          >Buscar</button>
        </div>
      </div>
      {Object.keys(data).length > 0 &&
        <div className='col-md-12 text-center mt-5'>
          {/*standard bootstrap stuffs*/}
          <div className="shadow rounded weatherResultBox">

            <img className='weatherIcon'
              src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png' alt="weather-logo" />
            <h5 className='weatherCity'>{data?.name}</h5>
            <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
