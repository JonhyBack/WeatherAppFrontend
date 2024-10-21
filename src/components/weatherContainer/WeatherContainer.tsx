import { useState, useEffect, memo } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { IPService } from '../../services/IPService';
import { ForecastData, WeatherService } from '../../services/WeatherService';
import './WeatherContainer.css';
import WeatherChart from '../weatherChart/WeatherChart';
import ToggleButton from '../toggleButton/ToggleButton';
import SuggestionsSearch from '../suggestionsSearch/SuggestionsSearch';
import FavoriteButton from '../favoriteButton/FavoriteButton';
import FavoriteService from '../../services/FavoriteService';
import { Suggestion } from '../../services/PlacesService';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import Skeleton from '../../ui/skeleton/Skeleton';
import ModalDialog from '../../ui/modalDialog/ModalDialog';
import Button from '../../ui/button/Button';
import CloseButton from '../../ui/closeButton/CloseButton';
import HorizontalLine from '../../ui/horizontalLine/HorizontalLine';

interface FavoritesContainerProps {
    onDelete?: () => void
}

const WeatherContainer = memo(({ onDelete }: FavoritesContainerProps) => {
    const { setLoading } = useLoading();
    const [forecastData, setForecastData] = useState<ForecastData>();
    const [error, setError] = useState<string>('');
    const [modalInfo, setModalInfo] = useState<string>('');
    const [modalConfirmDeletion, setModalConfirmDeletion] = useState<string>('');
    const [location, setLocation] = useState<{ city: string, country: string } | null>(null);
    const [isToday, setIsToday] = useState(true);

    const handleToggle = () => {
        setIsToday(!isToday);
    };

    const handleSuggestionSelect = (suggestion: Suggestion) => {
        setLocation({ city: suggestion.city, country: suggestion.country });
    };

    const handleSetFavorite = async () => {
        try {
            setLoading(true);
            if (!location) throw new Error();
            await FavoriteService.create({ city: location.city, country: location.country });
        } catch (error: any) {
            setModalInfo(error.message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            if (!location) return;

            if (isToday) {
                const byDay = await WeatherService.getWeather(location.city, location.country);
                setForecastData(byDay);
            } else {
                const byFiveDays = await WeatherService.getFiveDayForecast(location.city, location.country);
                setForecastData(byFiveDays);
            }
            setError('');
        } catch (err) {
            console.error('Unable to fetch weather data', err);
            setError('Unable to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialLocation = async () => {
            try {
                const location = await IPService.getClientLocation();
                setLocation(location);

                setError('');
            } catch (err) {
                console.error('Unable to fetch location', err);
                setError('Unable to fetch location');
            }
        };

        fetchInitialLocation();
    }, []);

    useEffect(() => {
        fetchWeatherData();
    }, [isToday, location]);

    return (
        <div className="weather-container">
            <span className='search-block'>
                <SuggestionsSearch onSuggestionSelect={handleSuggestionSelect} />
                <FavoriteButton onClick={handleSetFavorite} />
            </span>
            <ToggleButton initialOnLeft={isToday} onToggle={handleToggle} />
            {!forecastData ? <Skeleton /> : forecastData ? (
                <>
                    <WeatherInfo fd={forecastData} />
                    <HorizontalLine />
                    <WeatherChart data={forecastData} />
                </>
            ) : error}
            {onDelete && <>
                <CloseButton onClick={() => { setModalConfirmDeletion('Ви бажаєте видалити цей блок?') }} />
                {modalConfirmDeletion && (
                    <ModalDialog
                        handleClose={() => setModalConfirmDeletion('')}
                        title='Confim Deletion'
                    >
                        <p>{modalConfirmDeletion}</p>
                        <Button label='Ok' onClick={onDelete} />
                    </ModalDialog>
                )}
            </>}
            {modalInfo && (
                <ModalDialog
                    handleClose={() => setModalInfo('')}
                    title='Info'
                >
                    <p>{modalInfo}</p>
                </ModalDialog>
            )}
        </div>
    );
});

export default WeatherContainer;

