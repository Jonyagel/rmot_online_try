'use client'
import React, { useEffect, useState, useRef } from 'react';
import { FaThermometerHalf, FaTimes, FaCalendarAlt } from 'react-icons/fa';
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
  const [isFlipped, setIsFlipped] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hasLoadedWeather, setHasLoadedWeather] = useState(false);
  const [hebDate, setHebDate] = useState<string[]>([]);

  useEffect(() => {
    dateDoApi();
    if (typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 150, y: window.innerHeight - 120 });
    }
  }, []);

  useEffect(() => {
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
  }, [dragging, offset]);

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() מחזיר 0-11, לכן מוסיפים 1
    const day = today.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
}

  const dateDoApi = async () => {
    const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=8&ss=on&mf=on&c=on&geo=geoname&geonameid=281184&M=on&s=on&d=on&lg=he&start=${getDate()}&end=${getDate()}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.items[0].heDateParts);
    setHebDate([data.items[0].heDateParts]);
  }

  const fetchWeather = async () => {
    if (!hasLoadedWeather) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=jerusalem,il&APPID=d278cce52712f5f684f33d50a3e1be93&units=metric`;
      const resp = await fetch(url);
      const data = await resp.json();
      // console.log(data);
      console.log('the api is done now');
      setWeather(data);
      setHasLoadedWeather(true);
    }
  };

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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !hasLoadedWeather) {
      fetchWeather();
    }
  };

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('he-IL', options);
  };

  return (
    isVisible && (
      <div
        ref={widgetRef}
        className="weather-widget-wrapper"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className={`weather-widget ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <button className="weather-widget__close" title="closeWeather" onClick={(e) => { e.stopPropagation(); handleClose(); }}>
            <FaTimes />
          </button>
          <div className="weather-widget__content weather-widget__front">
            <span className="weather-widget__date">
              {hebDate &&
                hebDate.map((item: any) => {
                  return (
                    <div className=''>
                      <p className=''>{item.d} {item.m} {item.y} </p>
                    </div>
                  )
                })
              }</span>
              <span className="weather-widget__date mb-2">{getCurrentDate()}</span>
          </div>
          <div className="weather-widget__content weather-widget__back m-0 ">
            {weather ? (
              <div className='m-0 mb-4'>
                <img
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="weather-widget__weather-icon mx-auto "
                />
                <span className="weather-widget__temperature mb-4">{weather.main.temp.toFixed(1)}°C</span>
              </div>
            ) : (
              <span>טוען...</span>
            )}
          </div>
          <div className="weather-widget__icons">
            <FaCalendarAlt className={`weather-widget__icon ${!isFlipped ? 'weather-widget__icon--active weather-widget__icon--pulse' : ''}`} />
            <FaThermometerHalf className={`weather-widget__icon ${isFlipped ? 'weather-widget__icon--active weather-widget__icon--pulse' : ''}`} />
          </div>
        </div>
      </div>
    )
  );
};

export default WeatherWidget;