'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <LoadingScreen onLoadingComplete={handleLoadingComplete} />
            ) : (
                children
            )}
        </AnimatePresence>
    );
}