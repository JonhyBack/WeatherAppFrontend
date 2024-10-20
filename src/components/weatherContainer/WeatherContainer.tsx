import { useState, useEffect } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { IPService } from '../../services/IPService';
import { ForecastData, WeatherService } from '../../services/WeatherService';
import './WeatherContainer.css';
import WeatherChart from '../weatherChart/WeatherChart';
import ToggleButton from '../toggleButton/ToggleButton';
import SuggestionsSearch from '../suggestionsSearch/SuggestionsSearch';

function WeatherContainer() {
    const { setLoading } = useLoading();
    const [forecastData, setForecastData] = useState<ForecastData>();
    const [error, setError] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [isToday, setIsToday] = useState(true);

    const handleToggle = () => {
        setIsToday(!isToday);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);

                const location = await IPService.getClientLocation();
                setCity(location.city);

                const weather = await WeatherService.getWeather(location.city);
                setForecastData(weather);
                console.log(weather);

                setLoading(false);
            } catch (err) {
                setError('Unable to fetch weather data or location');
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (!city) return;

                setLoading(true);

                if (isToday) {
                    const byDay = await WeatherService.getWeather(city);
                    setForecastData(byDay);
                } else {
                    const byFiveDays = await WeatherService.getFiveDayForecast(city);
                    setForecastData(byFiveDays);
                }

                setLoading(false);
            } catch (err) {
                setError('Unable to fetch weather data or location');
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [isToday]);

    const calculateAverageTemperature = (forecastData: ForecastData) => {
        if (forecastData.list.length === 0) return 0;

        const totalTemperature = forecastData.list.reduce((sum, weather) => sum + weather.main.temp, 0);
        const averageTemperature = totalTemperature / forecastData.list.length;

        return averageTemperature.toFixed(1);
    }

    const formatTime = (time: number, i: number): string => {
        const temp = time + i * 3;
        if (temp >= 24) {
            return (temp % 24).toString();
        }
        return temp.toString();
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        forecastData && <div className="weather-container">
            <SuggestionsSearch onSuggestionSelect={() => { }} />
            <ToggleButton initialOnRight={isToday} onToggle={handleToggle} />
            <h2>{city}</h2>
            <div className="weather-info">
                <img
                    src={`https://openweathermap.org/img/wn/${forecastData.list[0].weather.icon}@2x.png`}
                />
                <div className="weather-details">
                    <p className="weather-description">{forecastData.list[0].weather.description}</p>
                    <p className="weather-temperature">{calculateAverageTemperature(forecastData)}°C</p>
                </div>
            </div>
            <WeatherChart data={
                isToday
                    ? forecastData && [
                        {
                            temp: forecastData.list[0].main.temp,
                            time: forecastData.list[0].dt.getHours().toString()
                        }
                    ]
                    : forecastData?.list.map((w, i) => ({
                        temp: w.main.temp,
                        time: formatTime(w.dt.getHours(), i)
                    }))
            } />
        </div>

    );
}

export default WeatherContainer;