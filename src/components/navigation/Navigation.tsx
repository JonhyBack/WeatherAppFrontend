import React, { useState } from 'react';
import LinkTabs from '../linkTabs/LinkTabs';
import './Navigation.css';
import LoginModal from '../loginModal/LoginModal';
import SignUpModal from '../signUpModal/SignUpModal';
import { useLoading } from '../../contexts/LoadingContext';

interface NavButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

function NavButton({ onClick, children }: NavButtonProps) {
    return (
        <button className="nav-button" onClick={onClick}>{children}</button>
    );
}


function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
    // const { setLoading } = useLoading();
    // setLoading(true);
    const handleLoginOpenModal = () => {
        setIsLoginModalOpen(true);
    };

    const handleLoginCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleSignUpOpenModal = () => {
        setIsSignUpModalOpen(true);
    };

    const handleSignUpCloseModal = () => {
        setIsSignUpModalOpen(false);
    };

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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
                        <NavButton onClick={handleLoginOpenModal}>Увійти</NavButton>
                        <NavButton onClick={handleSignUpOpenModal}>Зареєструватися</NavButton>
                    </div>
                    <div className="burger-menu" onClick={toggleMenu}>
                        <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
                        <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
                        <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
                    </div>
                </div>
            </nav >
            {isLoginModalOpen && <LoginModal onClose={handleLoginCloseModal} />}
            {isSignUpModalOpen && <SignUpModal onClose={handleSignUpCloseModal} />}
        </>
    );
};

export default Navigation;