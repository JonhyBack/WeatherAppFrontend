import React from 'react';
import './FavoriteButton.css';

interface FavoriteButtonProps {
    onClick?: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ onClick }) => {
    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="favorite"
        >
            В обране
        </button>
    );
};

export default FavoriteButton;
