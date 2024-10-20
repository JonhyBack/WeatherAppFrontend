import React from 'react';
import './AuthLayout.css';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="layout">
            <nav className="navigation">
                <div className="nav-content">
                    <Link to='/' className="logo-text">Weather App</Link>
                </div>
            </nav >
            <main className="layout-main">
                {children}
            </main>
        </div>
    );
}

export default AuthLayout;