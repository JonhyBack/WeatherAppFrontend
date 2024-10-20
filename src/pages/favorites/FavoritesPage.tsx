import DefaultLayout from '../../layouts/DefaultLayout';
import './FavoritesPage.css';

function FavoritesPage() {
    return (
        <DefaultLayout>
            <div className="favorites-page">
                <h2>Обрані міста</h2>
                {/* Тут буде список обраних міст */}
            </div>
        </DefaultLayout>
    );
}

export default FavoritesPage;