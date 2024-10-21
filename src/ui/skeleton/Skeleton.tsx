import React from 'react';
import './Skeleton.css'

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "300px" }) => (
    <div
        className="skeleton"
        style={{ width, height }}
    />
);

export default Skeleton;