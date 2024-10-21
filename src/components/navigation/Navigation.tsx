import React, { useState } from 'react';
import LinkTabs from '../linkTabs/LinkTabs';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    to: string;
}

function NavButton({ onClick, children, to }: NavButtonProps) {
    return (
        <Link to={to} className="nav-button" onClick={onClick}>{children}</Link>
    );
}


function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { token, username, logout } = useAuth();

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = (): void => {
        logout();
    };

    return (
        <nav className="navigation">
            <div className="nav-content">
                <div className="nav-left">
                    <div className="logo-text">
                        <span>Weather App</span>
                    </div>
                </div>
                <div className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
                    <LinkTabs
                        tabs={[{ label: 'Головна', to: '/' },
                        { label: 'Обрані', to: '/favorites' }]} />

                    {token && username ? (
                        <div className='auth-buttons'>
                            <div>Welcome, {username}!</div>
                            <NavButton to='/' onClick={handleLogout}>Вийти</NavButton>
                        </div>
                    ) : (
                        <div className='auth-buttons'>
                            <NavButton to='/login'>Увійти</NavButton>
                            <NavButton to='/signup'>Зареєструватися</NavButton>
                        </div>
                    )}

                </div>
                <div className="burger-menu" onClick={toggleMenu}>
                    <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
                </div>
            </div>
        </nav >
    );
};

export default Navigation;