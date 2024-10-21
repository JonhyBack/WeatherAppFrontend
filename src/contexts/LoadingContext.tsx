import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
} | null>(null);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

function useEffect(arg0: () => () => void, arg1: boolean[]) {
    throw new Error('Function not implemented.');
}
