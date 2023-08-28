import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const themes = [
    {
        name: 'Dark Theme',
        primaryColor: '#1a202c',
        secondaryColor: '#718096',
        accentColor: '#4299e1',
        backgroundColor: '#2d3748',
    },
    {
        name: 'Light Theme',
        primaryColor: '#2a4365',
        secondaryColor: '#4a5568',
        accentColor: '#f6ad55',
        backgroundColor: '#edf2f7',
    },
    {
        name: 'Ocean Theme',
        primaryColor: '#0d47a1',
        secondaryColor: '#1565c0',
        accentColor: '#64b5f6',
        backgroundColor: '#e1f5fe',
    },
    {
        name: 'Forest Theme',
        primaryColor: '#1b5e20',
        secondaryColor: '#388e3c',
        accentColor: '#81c784',
        backgroundColor: '#e8f5e9',
    },
    {
        name: 'Sunset Theme',
        primaryColor: '#d84315',
        secondaryColor: '#f4511e',
        accentColor: '#ffb74d',
        backgroundColor: '#fbe9e7',
    },
];


const ThemeSelector = ({ onSelectTheme }) => {


    const handleThemeClick = (theme) => {
        onSelectTheme(theme);
    };


    useEffect(() => {
        gsap.fromTo(fontsRef.current.children, {
            opacity: 0,
            y: -100,
        },
            {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.2,



            }

        );
    }, []);
    const fontsRef = useRef()



    return (
        <div ref={fontsRef}
            className="flex flex-col justify-around h-4/5">
            {themes.map((theme, index) => (
                <div
                    key={index}
                    className="w-12 h-12 rounded-full cursor-pointer mx-2"
                    style={{ background: theme.primaryColor }}
                    onClick={() => handleThemeClick(theme)}
                ></div>
            ))}
        </div>
    );
};

export default ThemeSelector;