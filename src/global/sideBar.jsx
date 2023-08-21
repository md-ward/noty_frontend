import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCheckSquare, faBars, faPlus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSidebarStore from './useSidebarStore';

const SideBar = ({ setisNewNoteOpen, isNewNoteOpen }) => {
    const { isOpen, toggleSidebar, openSidebar, closeSidebar } = useSidebarStore();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600 && !isOpen) {
                openSidebar(); // Open the sidebar for larger screens
            } else {
                closeSidebar(); // Close the sidebar for mobile screens
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('naem');
        navigate('/register', { replace: true });
    };

    return (
        <div
            className={`  ${isOpen ? 'h-screen max-sm:col-span-2' : 'fixed h-fit max-sm:mt-2 right-0'
                } transition-all duration-300 ease-in-out   flex flex-col justify-around rounded-l-lg items-center sm:h-screen bg-gradient-to-b from-indigo-500 to-blue-500 text-white`}
        >
            {/* Menu toggle button */}
            <FontAwesomeIcon
                onClick={toggleSidebar}
                icon={faBars}
                size="lg"
                className="text-white cursor-pointer sm:hidden block p-1 sm:p-0 sm:mb-6"
            />

            <div
                className={`flex flex-col justify-around h-full ${isOpen ? 'sm:flex' : 'hidden'
                    }`}
                id="menue_items"
            >
                {/* Sticky Note icon */}
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md">
                    <FontAwesomeIcon
                        icon={faStickyNote}
                        size="lg"
                        className="text-indigo-900"
                    />
                </div>

                <div>
                    {/* Check Square icon */}
                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md mb-6">
                        <FontAwesomeIcon
                            icon={faCheckSquare}
                            size="lg"
                            className="text-indigo-900"
                        />
                    </div>
                    {/* Plus icon */}
                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md mb-6">
                        <FontAwesomeIcon
                            icon={faPlus}
                            size="lg"
                            className="cursor-pointer text-indigo-900"

                            onClick={() => setisNewNoteOpen(!isNewNoteOpen)}
                        />
                    </div>
                </div>
                <div>
                    {/* External Link/Settings icon */}
                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md">
                        <img src="/assets/icons/settings.svg" alt="settings" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;