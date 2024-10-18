import { useLoading } from '../../contexts/LoadingContext';
import './LoaderSpinner.css';


function LoaderSpinner() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoaderSpinner;