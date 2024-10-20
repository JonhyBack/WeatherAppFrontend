import { useState } from 'react';
import './ToggleButton.css';

interface ToggleButtonProps {
    initialOnRight?: boolean;
    onToggle?: (isYearly: boolean) => void;
}

function ToggleButton({
    initialOnRight = true,
    onToggle,
}: ToggleButtonProps) {
    const [isOnRight, setIsOnRight] = useState(initialOnRight);

    const handleToggle = (newIsYearly: boolean) => {
        setIsOnRight(newIsYearly);
        if (onToggle) {
            onToggle(newIsYearly);
        }
    };

    return (
        <div className="toggle-container">
            <div className={`slider ${isOnRight ? 'left' : 'right'}`}></div>
            <button
                className={`toggle-button ${isOnRight ? 'active' : ''}`}
                onClick={() => handleToggle(true)}
            >
                Current
            </button>
            <button
                className={`toggle-button ${!isOnRight ? 'active' : ''}`}
                onClick={() => handleToggle(false)}
            >
                5 days
            </button>
        </div>
    );
};

export default ToggleButton;