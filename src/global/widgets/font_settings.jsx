import { useEffect, useRef } from "react";

import { gsap } from "gsap";

const FontSettings = () => {
    const fontSettings = [
        { Quicksand: "Quicksand" },
        { Poppins: "Poppins" },
        { Bombing: "Bombing" },
        { Dyna: "Dyna" },
    ];
    const fontsRef = useRef()


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


    const handleFontChange = (fontFamily) => {


        document.body.style.fontFamily = fontFamily;
        localStorage.setItem("fontFamily", fontFamily);
    };
    return (
        <div ref={fontsRef} className="h-full w-full items-center flex flex-col justify-evenly">
            {fontSettings.map((item, index) => (
                <span
                    onClick={() => handleFontChange(Object.values(item)[0])}
                    key={index} className="cursor-pointer hover:shadow-lg hover:scale-105 duration-200 ease-in-out hover:bg-opacity-75 bg-white bg-opacity-50 text-indigo-900 shadow-md rounded-lg p-0.5 text-lg">
                    {Object.values(item)}
                </span>
            ))}
        </div>
    );
};

export default FontSettings;