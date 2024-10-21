import { ForecastData } from "../../services/WeatherService";
import './WeatherInfo.css'

interface WeatherInfoProps {
    fd: ForecastData;
}

function WeatherInfo({ fd }: WeatherInfoProps) {
    const calculateAverageTemperature = () => {
        if (fd.list.length === 0) return 0;

        const totalTemperature = fd.list.reduce((sum, weather) => sum + weather.main.temp, 0);
        const averageTemperature = totalTemperature / fd.list.length;

        return averageTemperature.toFixed(1);
    }

    return <div className="weather-info">
        <span>
            <h2>{`${fd?.location.city}, ${fd?.location.country}`}</h2>
            <img className="weather-icon"
                src={`https://openweathermap.org/img/wn/${fd.list[0].weather.icon}@2x.png`}
            />
        </span>
        <div className="weather-details">
            <p className="weather-description">{fd.list[0].weather.description}</p>
            <p className="weather-temperature">{calculateAverageTemperature()}°C</p>
        </div>
    </div>
}

export default WeatherInfo;
