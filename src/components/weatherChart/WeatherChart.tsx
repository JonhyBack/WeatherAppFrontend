import { Line } from 'react-chartjs-2';
import './WeatherChart.css';

function WeatherChart() {
    const data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [
            {
                label: 'Температура',
                data: [22, 23, 25, 24, 22, 21],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div className="weather-chart">
            <h2>Прогноз погоди на день</h2>
            <Line data={data} />
        </div>
    );
}

export default WeatherChart;