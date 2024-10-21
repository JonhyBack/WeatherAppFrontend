import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '474fc8af00494dc612903d72f8b36fa5';

interface Main {
    temp: number;
}

interface Weather {
    main: string;
    description: string;
    icon: string;
}

interface WeatherResponseData {
    main: Main;
    weather: Weather[];
    name: string;
    dt: number;
    sys: { country: string }
}

interface ForecastFiveResponeData {
    list: { main: Main, weather: Weather[], dt: Date }[];
    city: { name: string, country: string };
}

export interface ForecastData {
    list: { dt: Date, main: Main, weather: Weather }[];
    location: { city: string, country: string };
}

export class WeatherService {
    public static async getWeather(city: string, countryCode?: string): Promise<ForecastData> {
        try {
            const response = await axios.get<WeatherResponseData>(WEATHER_API_URL + '/weather', {
                params: {
                    q: `${city}${countryCode ? ',' + countryCode : ''}`,
                    units: 'metric',
                    appid: API_KEY,
                },
            });
            return {
                list: [{
                    dt: new Date(response.data.dt),
                    main: response.data.main,
                    weather: response.data.weather[0]
                }], location: { city: response.data.name, country: response.data.sys.country }
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw new Error('Failed to retrieve weather data');
        }
    }

    public static async getFiveDayForecast(city: string, countryCode?: string): Promise<ForecastData> {
        try {
            const response = await axios.get<ForecastFiveResponeData>(WEATHER_API_URL + '/forecast', {
                params: {
                    q: `${city}${countryCode ? ',' + countryCode : ''}`,
                    units: 'metric',
                    appid: API_KEY,
                },
            });
            return {
                list: response.data.list.map(item => ({
                    dt: new Date(item.dt),
                    main: item.main,
                    weather: item.weather[0]
                })),
                location: { city: response.data.city.name, country: response.data.city.country }
            };
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            throw new Error('Failed to retrieve forecast data');
        }
    }
}

