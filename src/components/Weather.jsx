import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search-icon.png'
import cloud_icon from '../assets/cloud.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import raining_icon from '../assets/raining.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sun.png'
import wind_icon from '../assets/wind-icon.png'



const Weather = () => {

    const inputRef = useRef()
    const[weatherData, setWeatherData] = useState(false);

    const allIcons = {
      "01d": sun_icon,
      "01n": sun_icon,
      "02d": cloudy_icon,
      "02n": cloudy_icon,
      "03d": cloudy_icon,
      "03n": cloudy_icon,
      "04d": cloud_icon,
      "04n": cloud_icon,
      "09d": drizzle_icon,
      "09n": drizzle_icon,
      "10d": raining_icon,
      "10n": raining_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    }

    const search = async (city)=>{
      if(city === ""){
        alert("Please Insert Location\n Enter Name of The City");
        return;
      }
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }

        console.log(data);
        const icon = allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        })

      } catch (error) {
          setWeatherData(false);
          console.error("Error in fetching Weather Data");
      }
    }

    useEffect(()=>{
      search("Amman");
    },[])

  return (
    <div className='weather'>
      
      <div className="search-bar">
      <input 
        ref={inputRef} 
        type='text' 
        placeholder='Search'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
          search(inputRef.current.value);
          }
        }}
        />
      <img src={search_icon} alt='' className='search-icon'onClick={()=> search(inputRef.current.value)}/>
      </div>
      
      {weatherData?<>
      
            <img src={weatherData.icon} alt='' className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>

      <div className='weather-data'>
        
        <div className='col'>
          <img src={humidity_icon} alt='' />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className='col'>
          <img src={wind_icon} alt='' />
          <div>
            <p>{weatherData.windSpeed} Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>

      </>:<></>}

    </div>
  )
}

export default Weather
