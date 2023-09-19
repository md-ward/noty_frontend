import React, { useState, useEffect } from 'react';

const ErrorPage = ({ error }) => {
    const [countdown, setCountdown] = useState(5); // Initial countdown value

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Clear the interval when component is unmounted
        return () => {
            clearInterval(countdownInterval);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            // Reload the component or perform any necessary action
            window.location.reload();
        }
    }, [countdown]);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-blend-hard-light bg-gray-100 overflow-hidden rounded-lg">
            <h1 className="text-4xl font-bold mb-4">Ops Something went wrong</h1>
            <p className="text-red-500">{error}</p>
            <p>Reloading in {countdown} seconds...</p>
        </div>
    );
};

export default ErrorPage;