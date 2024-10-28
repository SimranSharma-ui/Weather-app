import React, { useState, useEffect } from 'react';

import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { IoSunnySharp } from "react-icons/io5";

const Form = () => {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [cityName, setCityName] = useState('');
    const openWeatherApiKey = process.env.Api_Key;

    const fetchWeatherData = async (city) => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            console.log("Error:", err);
            setWeather({}); 
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (cityName) {
            fetchWeatherData(cityName);
        }
    };

    useEffect(() => {
        fetchWeatherData('London');
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const today = new Date().toLocaleDateString();

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-400 border-solid">
            <div className='max-w-screen-sm w-full p-10 border border-gray-300 rounded-lg shadow-lg bg-white'>
                <div className="relative flex mb-6">
                    <input 
                        type="text" 
                        placeholder="Search for a city name..." 
                        className="w-full p-3 border border-blue-600 rounded-md focus:outline-none"
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button 
                        className='ml-3 border border-white bg-blue-400 p-3 rounded-md'
                        onClick={handleSearch} 
                    >
                        <FaSearch />
                    </button>
                </div>
                {weather.name && (
                    <>
                        <h1 className='text-2xl font-bold text-center mb-5'>{weather.name}</h1>
                        <h2 className='text-center border p-2 mx-4 bg-blue-300 rounded-full'>{today}</h2>
                        <div className="flex items-center justify-center mb-4">
                            <div><IoSunnySharp className='mr-5 text-2xl'/></div>
                            <h3 className='text-center text-xl my-5'>
                                {weather.weather && weather.weather.map((item) => (
                                    <div key={item.id}>{item.description}</div>
                                ))}
                            </h3>
                        </div>
                        <h1 className='text-9xl font-bold text-center mb-8'>{weather.main?.temp ? weather.main.temp : 'N/A'}°C</h1>
                        <div className="flex justify-between gap-3">
                            <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-1/3 text-center">
                                <FaWind className='text-3xl ml-14'/>
                                <div className="font-bold">{weather.wind?.speed} KM/H</div>
                                <span>Wind</span>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-1/3 mx-2 text-center">
                                <WiHumidity className='text-4xl ml-14'/>
                                <div className="font-bold">{weather.main?.humidity}%</div>
                                <span>Humidity</span>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-1/3 text-center">
                                <FaEye className='text-3xl ml-14' />
                                <div className="font-bold">{weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} KM</div>
                                <span>Visibility</span>
                            </div>
                        </div>
                    </>
                )}
                {!weather.name && !loading && (
                    <div className="text-center mt-4">No weather data available. Please try another city.</div>
                )}
            </div>
        </div>
    );
};

export default Form;
