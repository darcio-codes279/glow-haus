import React, { useEffect } from 'react';

const CuratorFeed = () => {
    useEffect(() => {
        // Function to load the Curator.io script
        const loadCuratorScript = () => {
            // Check if script is already loaded to avoid duplicates
            if (document.querySelector('script[src*="9849814d-64bb-4513-8b41-52e876adec67"]')) {
                return;
            }

            const script = document.createElement('script');
            script.async = true;
            script.charset = 'UTF-8';
            script.src = 'https://cdn.curator.io/published/9849814d-64bb-4513-8b41-52e876adec67.js';

            // Insert script into document
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode?.insertBefore(script, firstScript);
        };

        // Load the script when component mounts
        loadCuratorScript();

        // Cleanup function (optional)
        return () => {
            // Remove script when component unmounts if needed
            const existingScript = document.querySelector('script[src*="9849814d-64bb-4513-8b41-52e876adec67"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div>
            <h2>Latest Instagram Posts</h2>
            <div id="curator-feed-default-feed-layout">
                <a
                    href="https://curator.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crt-logo crt-tag"
                >
                    Powered by Curator.io
                </a>
            </div>
        </div>
    );
};

export default CuratorFeed;