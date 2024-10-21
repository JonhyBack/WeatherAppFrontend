import './CloseButton.css'

interface CloseButtonProps {
    onClick: () => void;
    top?: string;
    right?: string;
}

function CloseButton({ onClick, top = '5px', right = '10px' }: CloseButtonProps) {
    return (
        <button className="close-button" onClick={onClick} style={{ top, right }}>
            &times;
        </button>
    );
}

export default CloseButton;