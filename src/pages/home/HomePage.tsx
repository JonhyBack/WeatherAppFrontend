import WeatherContainer from '../../components/weatherContainer/WeatherContainer';
import DefaultLayout from '../../layouts/DefaultLayout';
import './HomePage.css';

function HomePage() {
    return (
        <DefaultLayout>
            <WeatherContainer />
        </DefaultLayout>
    );
}

export default HomePage;