import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './WeatherChart.css';
import { ForecastData } from '../../services/WeatherService';

interface WeatherChartProps {
    data: ForecastData;
}

function WeatherChart({ data }: WeatherChartProps) {
    const formatNumberToHours = (time: number, i: number): string => {
        const temp = time + i * 3;
        if (temp >= 24) {
            return numberToTimeFormat(temp % 24);
        }
        return numberToTimeFormat(temp);
    }

    function numberToTimeFormat(hours: number): string {
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);

        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }

    const getHourlyData = (weather: { dt: Date, main: { temp: number } }, i: number) => ({
        temp: weather.main.temp,
        time: formatNumberToHours(weather.dt.getHours(), i)
    });

    const buildChartData = () => (
        data?.list.map((w, i) => getHourlyData(w, i))
    )

    return (
        <div className="weather-chart">
            <ResponsiveContainer width={500}
                height={150}>
                <LineChart
                    data={buildChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeatherChart;