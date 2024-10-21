import { useState } from 'react';
import WeatherContainer from '../../components/weatherContainer/WeatherContainer';
import DefaultLayout from '../../layouts/DefaultLayout';
import './HomePage.css';
import AddButton from '../../ui/addButton/AddButton';

function HomePage() {
    const [weatherContainers, setWeatherContainers] = useState<number[]>([]);

    const addWeatherContainer = () => {
        setWeatherContainers([...weatherContainers, new Date().getTime()]);
    };

    const removeWeatherContainer = (id: number) => {
        setWeatherContainers(weatherContainers.filter((containerId: number) => containerId !== id));
    };

    return (
        <DefaultLayout>
            <WeatherContainer />
            {weatherContainers.map((id: number) => (
                <WeatherContainer key={id} onDelete={() => {
                    removeWeatherContainer(id)
                }} />
            ))}
            {weatherContainers.length < 4 && <AddButton onClick={addWeatherContainer} />}
        </DefaultLayout>
    );
}

export default HomePage;