'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 500); // Delay before hiding
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center"
        >
            {/* Extra Large Logo */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className=""
            >
                <Image
                    src="/images/logoIcon.png"
                    alt="Glow Haus Logo"
                    width={400}
                    height={400}
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </motion.div>

            {/* Company Name */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center mb-8"
            >
                <span className="text-6xl text-[#1bc2ff] font-display font-black outlined-text tracking-wider">GLOW HAUS</span>

                <p className="text-gray-600 text-lg font-medium">
                    Premium Cleaning Services
                </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="relative h-1 bg-gray-200 rounded-full overflow-hidden"
            >
                <motion.div
                    className="h-full bg-glowHausBlue rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </motion.div>

            {/* Loading Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 text-gray-500 text-sm font-medium"
            >
                Loading... {progress}%
            </motion.p>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                    animate={{
                        y: [-20, -100, -20],
                        x: [0, Math.random() * 100 - 50, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                    style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${60 + Math.random() * 20}%`,
                    }}
                />
            ))}
        </motion.div>
    );
}