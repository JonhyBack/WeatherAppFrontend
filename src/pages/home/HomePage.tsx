import WeatherCard from '../../components/weatherCard/WeatherCard';
// import WeatherChart from '../../components/weatherChart/WeatherChart';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <WeatherCard />
            {/* <WeatherChart /> */}
        </div>
    );
}

export default HomePage;