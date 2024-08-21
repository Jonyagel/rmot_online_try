'use client'
import React, { useEffect, useState } from 'react';
import { WiThermometer, WiHumidity, WiWindy } from 'react-icons/wi';
import './weatherWidget.css';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  useEffect(() => {
    doApi();
  }, []);

  const currentDate = new Date().toLocaleDateString();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const doApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=jerusalem,il&APPID=d278cce52712f5f684f33d50a3e1be93&units=metric`
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    setWeather(data);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`weather-widget-container ${isHovered ? 'weather-widget-container--hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {weather && (
        <div className={`weather-widget ${isHovered ? 'weather-widget--hovered' : ''}`}>
          <div className="weather-icon">
            <WiThermometer className="weather-icon-primary" />
            <span className="weather-temperature">{weather.main.temp}°</span>
          </div>
          {isHovered && (
            <div className="weather-details">
              <div className="weather-detail">
                <WiHumidity className="weather-icon-primary" />
                <span className="weather-detail-text">{weather.main.humidity}% לחות</span>
              </div>
              <div className="weather-detail">
                <WiWindy className="weather-icon-primary" />
                <span className="weather-detail-text">{weather.wind.speed} קמ"ש</span>
              </div>
              <p className="weather-date ">{currentDate}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
