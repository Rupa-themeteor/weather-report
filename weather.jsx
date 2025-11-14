
import { useState } from "react";
import axios from "axios";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    function handleCity(evt) {
        setCity(evt.target.value);
    }

    function getWeather() {
        if (!city) return;
        const weatherData = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d60df67fbb9e68a42ab1919f1c97c27&units=metric`);
        weatherData.then(function(success) {
            setWeather(success.data);
        }).catch(function(error) {
            console.error("Error fetching weather data:", error);
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-cyan-500 flex items-center justify-center p-4">
            <div className="bg-slate-800 bg-opacity-95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-slate-700">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white mb-3 drop-shadow-lg">Weather Report</h1>
                    <p className="text-slate-300 text-lg">Discover the weather in your city!</p>
                </div>

                <div className="space-y-6">
                    <input
                        type="text"
                        value={city}
                        onChange={handleCity}
                        className="w-full px-5 py-4 bg-slate-700 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 shadow-inner"
                        placeholder="Enter city name"
                    />
                    <button
                        onClick={getWeather}
                        className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-cyan-600 hover:to-teal-700 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                        Get Weather
                    </button>
                </div>

                <div className="mt-8 p-6 bg-slate-700 rounded-2xl border border-slate-600">
                    {weather ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-300 text-lg">Weather:</span>
                                <span className="text-xl font-extrabold text-cyan-400">{weather.weather[0].main}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-300 text-lg">Temperature:</span>
                                <span className="text-xl font-extrabold text-orange-400">{weather.main.temp}°C</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-300 text-lg">Description:</span>
                                <span className="text-xl font-extrabold text-lime-400">{weather.weather[0].description}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 text-slate-500">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">Weather:</span>
                                <span className="text-xl">-</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">Temperature:</span>
                                <span className="text-xl">-</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">Description:</span>
                                <span className="text-xl">-</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Weather;
