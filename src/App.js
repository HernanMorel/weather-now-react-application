import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import {useEffect, useState } from 'react';
import './App.css';
{/*the bootstrap library must be imported as always*/}

function App() {

  {/*although this is a relativey small project the api key is fine where it currently is. 
this would be stored in either an env file then through git ignore through secret key or even better, outside the folder.*/}
  const apiKey = "d6036013bb0cfa3ea5f4a548b5f2a3dd"

  {/*first implementation of useState, which will allow you to track changes in memory, facilitating the syntax and making this app possible through react*/}
  const [inputCity, setInputCity] = useState('')
  {/*this is the useState hook being implemented, it will intake the city name and allow it to change when needed*/}
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
    {/*this triggers by pressing the enter key, this wasnt the case initially,
    I had to bind the enter key to this event in order for it to work, making it easier for the user to access the weather of their desired city.*/}
    if (e.key === 'Enter') {
      handleSearch();

    }
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
  }
  {/*here the useState hook is being used,setInputCity is now bound to it, making it dynamic, therefore making it useful!*/}
  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }
  
  
  {/* useEffect(()=>{
   getWeatherDeatils('San Lorenzo')
  }), [])*/}
  {/*that was originally used to test the change in state before the city input was made dynamically*/}

  return (
    <div className='col-md-12'>
    {/*those columns are responsive, the app will be much more complicated without the bootstrap library*/}
      <div className='weatherBg'>
        <h1 className='heading'>Weather Now</h1>
        <div className='d-grid gap-3 col-4 mt-4'>
          <input type='text' className='form-control'
            value={inputCity}
            {/*the value is now the inputCity variable destructured*/}
            onKeyPress={handleKeypress}
            onChange={handleChangeInput} />
              {/*here the onChange property binds this input to a change event when needed.*/}
          <button className='btn btn-primary' type='button'
            onClick={handleSearch}
          >Buscar</button>
        </div>
      </div>
      {/*this Object.keys(data) method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
      this is what returns and displays the weather information onto the dom*/}
      {Object.keys(data).length > 0 &&
        <div className='col-md-12 text-center mt-5'>
          {/*standard bootstrap stuffs*/}
          <div className="shadow rounded weatherResultBox">

            <img className='weatherIcon'
              src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png' alt="weather-logo" />
            <h5 className='weatherCity'>{data?.name}</h5>
            {/*turns out the data that comes from the weather api is in Kelvin units, you need to convert it to celsius*/}
            <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
