import React from 'react';
import Navigation from '../components/navigation/Navigation';
import './DefaultLayout.css';
import Container from '../ui/container/Container';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className="layout">
            <Navigation />
            <Container maxWidth="1200px" padding="20px">
                {children}
            </Container>
        </div>
    );
}

export default DefaultLayout;