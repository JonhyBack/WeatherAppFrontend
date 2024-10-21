import { useState } from 'react';
import './ToggleButton.css';

interface ToggleButtonProps {
    initialOnLeft?: boolean;
    onToggle?: (isYearly: boolean) => void;
}

function ToggleButton({
    initialOnLeft = true,
    onToggle,
}: ToggleButtonProps) {
    const [isOnLeft, setIsOnLeft] = useState(initialOnLeft);

    const handleToggle = (toggle: boolean) => {
        setIsOnLeft(toggle);
        if (onToggle) {
            onToggle(toggle);
        }
    };

    return (
        <div className="toggle-container">
            <div className={`slider ${isOnLeft ? 'left' : 'right'}`}></div>
            <button
                className={`toggle-button ${isOnLeft ? 'active' : ''}`}
                onClick={() => handleToggle(true)}
            >
                Current
            </button>
            <button
                className={`toggle-button ${!isOnLeft ? 'active' : ''}`}
                onClick={() => handleToggle(false)}
            >
                5 days
            </button>
        </div>
    );
};

export default ToggleButton;