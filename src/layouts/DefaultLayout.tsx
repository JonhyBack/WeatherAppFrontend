import React from 'react';
import './DefaultLayout.css';
import Navigation from '../components/navigation/Navigation';
import { LoadingProvider } from '../contexts/LoadingContext';
import LoaderSpinner from '../ui/loaderSpinner/LoaderSpinner';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <LoadingProvider>
            <LoaderSpinner />
            <div className="layout">
                <Navigation />
                <main className="layout-main">
                    {children}
                </main>
            </div>
        </LoadingProvider>
    );
}

export default DefaultLayout;