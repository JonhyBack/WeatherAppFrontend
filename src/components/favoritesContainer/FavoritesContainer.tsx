import { useState, useEffect, memo } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { ForecastData, WeatherService } from '../../services/WeatherService';
import './FavoritesContainer.css';
import WeatherChart from '../weatherChart/WeatherChart';
import ToggleButton from '../toggleButton/ToggleButton';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import { FavoriteData } from '../../services/FavoriteService';
import Skeleton from '../../ui/skeleton/Skeleton';
import Button from '../../ui/button/Button';
import CloseButton from '../../ui/closeButton/CloseButton';
import ModalDialog from '../../ui/modalDialog/ModalDialog';
import HorizontalLine from '../../ui/horizontalLine/HorizontalLine';

interface FavoritesContainerProps {
    locationFavorite: FavoriteData;
    onDelete: (id: number) => Promise<boolean>
}

const FavoritesContainer = memo(
    ({ locationFavorite, onDelete }: FavoritesContainerProps) => {
        const { setLoading } = useLoading();
        const [forecastData, setForecastData] = useState<ForecastData>();
        const [error, setError] = useState<string>('');
        const [isToday, setIsToday] = useState(true);
        const [modalConfirmDeletion, setModalConfirmDeletion] = useState<string>('');
        const [modalInfo, setModalInfo] = useState<string>('');

        const handleToggle = () => {
            setIsToday(!isToday);
        };

        const handleFavoriteDeletion = async () => {
            try {
                await onDelete(locationFavorite.id);
            } catch (error: any) {
                console.error('Error during favorite deletion:', error);
                setModalInfo(error.message);
            } finally {
                setModalConfirmDeletion('')
            }
        };

        const fetchWeatherData = async () => {
            try {
                setLoading(true);

                if (isToday) {
                    const byDay = await WeatherService.getWeather(locationFavorite.city, locationFavorite.country);
                    setForecastData(byDay);
                } else {
                    const byFiveDays = await WeatherService.getFiveDayForecast(locationFavorite.city, locationFavorite.country);
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
            fetchWeatherData();
        }, [isToday, locationFavorite]);

        return (
            <div className="favorites-container">
                <ToggleButton initialOnLeft={isToday} onToggle={handleToggle} />
                {!forecastData ? <Skeleton /> : forecastData ? (
                    <>
                        <WeatherInfo fd={forecastData} />
                        <HorizontalLine />
                        <WeatherChart data={forecastData} />
                    </>
                ) : error}

                <CloseButton onClick={() => { setModalConfirmDeletion('Ви бажаєте видалити цей блок з обраних?') }} />
                {modalConfirmDeletion && (
                    <ModalDialog
                        handleClose={() => setModalConfirmDeletion('')}
                        title='Confim Deletion'
                    >
                        <p>{modalConfirmDeletion}</p>
                        <Button label='Ok' onClick={handleFavoriteDeletion} />
                    </ModalDialog>
                )}
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
    }
);

export default FavoritesContainer;