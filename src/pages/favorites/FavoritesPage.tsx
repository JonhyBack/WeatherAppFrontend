import { useEffect, useState } from 'react';
import FavoritesContainer from '../../components/favoritesContainer/FavoritesContainer';
import DefaultLayout from '../../layouts/DefaultLayout';
import FavoriteService, { FavoriteData } from '../../services/FavoriteService';
import './FavoritesPage.css';
import { useLoading } from '../../contexts/LoadingContext';

function FavoritesPage() {
    const { setLoading } = useLoading();
    const [favorites, setFavorites] = useState<FavoriteData[]>([]);

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);

            await FavoriteService.remove(id);
            setFavorites(favorites.filter(favorite => favorite.id !== id));

            return true;
        } catch (error) {
            console.error('Error deleting favorite:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        try {
            setLoading(true);

            const favorites = await FavoriteService.getAll();
            setFavorites(favorites);
        } catch (error) {
            console.error('Error fetching favorites data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [])

    return (
        <DefaultLayout>
            {favorites.length > 0 &&
                favorites.map((favorite, index) =>
                    <FavoritesContainer
                        onDelete={handleDelete}
                        key={index}
                        locationFavorite={favorite} />)}
        </DefaultLayout>
    );
}

export default FavoritesPage;
