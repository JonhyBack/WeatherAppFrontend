import React from 'react';
import './HorizontalLine.css';

interface HorizontalLineProps {
    color?: string;
    thickness?: string;
    margin?: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
    color = '#ccc',
    thickness = '1px',
    margin = '10px 0',
}) => {
    return (
        <hr className="horizontal-line" style={{ borderColor: color, borderWidth: thickness, margin }} />
    );
};

export default HorizontalLine;
