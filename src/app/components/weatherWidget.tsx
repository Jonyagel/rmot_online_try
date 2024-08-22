'use client'
import React, { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import './weatherWidget.css';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 150, y: window.innerHeight - 80 });

      const handleMouseMove = (e: MouseEvent) => {
        if (dragging && widgetRef.current) {
          const newX = e.clientX - offset.x;
          const newY = e.clientY - offset.y;
          setPosition({ x: newX, y: newY });
        }
      };

      const handleMouseUp = () => {
        setDragging(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, offset]);

  useEffect(() => {
    const doApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=jerusalem,il&APPID=d278cce52712f5f684f33d50a3e1be93&units=metric`;
      const resp = await fetch(url);
      const data = await resp.json();
      setWeather(data);
    };
    doApi();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    setDragging(true);
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
