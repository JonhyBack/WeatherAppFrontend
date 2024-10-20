import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './WeatherChart.css';

interface WeatherChartProps {
    data: { time: string; temp: number }[];
}

function WeatherChart({ data }: WeatherChartProps) {
    console.log(data);
    return (
        <div className="weather-chart">
            <ResponsiveContainer width={500}
                height={150}>
                <LineChart
                    data={data}>
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