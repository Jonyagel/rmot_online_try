'use client'
import React, { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import './WeatherWidget.css';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: window.innerWidth - 150, y: window.innerHeight - 80 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=jerusalem,il&APPID=d278cce52712f5f684f33d50a3e1be93&units=metric`;
    const resp = await fetch(url);
    const data = await resp.json();
    setWeather(data);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const newX = e.clientX - widgetRef.current!.offsetWidth / 2;
      const newY = e.clientY - widgetRef.current!.offsetHeight / 2;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    isVisible && (
      <div
        ref={widgetRef}
        className="weather-widget-container"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {weather && (
          <div className="weather-widget">
             <button className="close-button" onClick={handleClose}>
              <FaTimes />
            </button>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
            <span className="temperature">{weather.main.temp.toFixed(1)}°</span>
           
          </div>
        )}
      </div>
    )
  );
};

export default WeatherWidget;
