import { useLoading } from '../../contexts/LoadingContext';
import './PreloaderSpinner.css';


function PreloaderSpinner() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    

    return (
        <div className="overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default PreloaderSpinner;