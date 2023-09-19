import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faBars, faPlus, faExternalLinkAlt, faArrowLeft, faFont, faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSidebarStore from './useSidebarStore';

import { gsap } from 'gsap';
import FontSettings from './widgets/font_settings';
import useAuth from '../useAuth';
import useNotesStore from '../notes_component/stateManagementStores/notesStore';
const SideBar = ({ setisNewNoteOpen, isNewNoteOpen }) => {


    const { isOpen, toggleSidebar, openSidebar, closeSidebar } = useSidebarStore();
    const [handleSettingChange, sethandleSettingChange] = useState(false);
    const [changeThemAndFont, setchangeThemAndFont] = useState('');
    const { setShowSearchInput, showSearchInput } = useNotesStore();

    const searchIconRef = useRef(null);


    // !custom hook for authentecation 

    const { logout } = useAuth();


    const navigate = useNavigate();
    // ! handle closing the sideBar on screen resizing ......
    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600 && isOpen) {
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

    // ! log out from account...........
    const handleLogout = () => {
        if (window.confirm('want to logout ?')) {
            logout()
            navigate('/register', { replace: true });
        }
    };


    // ! open and close the search bar /
    function handleSearchToggle() {
        setShowSearchInput(!showSearchInput);

        // GSAP animation to rotate search icon
        const timeline = gsap.timeline();
        if (showSearchInput) {
            timeline.to(searchIconRef.current, {
                rotation: 0,
                duration: 0.2,
            });
        } else {
            timeline.to(searchIconRef.current, {
                rotation: 180,
                duration: 0.2,
            });
        }
    }
    //! the init animation for settings 

    function handleSettingsToggle() {
        const timeline = gsap.timeline();
        timeline
            .to('#menue_items', {
                y: -100,
                opacity: 0,
                duration: 0.3,
            })
            .add(() => {
                sethandleSettingChange(true);
            })
            .to('#new_items', {
                y: 0,
                opacity: 1,
                duration: 0.3,
            });
    }

    // ! the back animation for the settings ...
    function handleBackToggle() {
        const timeline = gsap.timeline();
        timeline
            .to('#new_items', {
                y: 100,
                opacity: 0,
                duration: 0.3,
            })
            .add(() => {
                sethandleSettingChange(false);
            })
            .to('#menue_items', {
                y: 0,
                opacity: 1,
                duration: 0.3,
            });
    }
    // ! to change the font type ......

    function handleChangeingThemeAndFontBack() {

        setchangeThemAndFont('');


    }

    // ! buttons style 
    const iconsStyles = 'relative flex items-center justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md hover:bg-opacity-75  duration-200 ease-in-out cursor-pointer';



    return (
        <div

            className={`  ${isOpen ? 'h-screen max-sm:col-span-2' : 'fixed h-fit max-sm:mt-2 right-0'
                } transition-all duration-300 ease-in-out   flex flex-col justify-around rounded-l-lg items-center sm:h-screen bg-gradient-to-b from-indigo-500 to-blue-500  overflow-hidden hover:bg-opacity-75  `}


        >

            {/* <img src="/assets/logo-no-background.svg" alt="noty logo" className='w-32 h-32  p-2 max-sm:hidden' /> */}
            {/* Menu toggle button */}
            <FontAwesomeIcon
                onClick={toggleSidebar}
                icon={faBars}
                size="lg"
                className="text-white cursor-pointer sm:hidden block p-1 sm:p-0 sm:mb-6"
            />





            <div
                className={`flex flex-col justify-around  h-full ${(!handleSettingChange && isOpen) ? 'sm:flex' : 'hidden'
                    }`}
                id="menue_items"
            >
                {/* Search  icon */}

                <div className={iconsStyles}
                    onClick={handleSearchToggle}
                    ref={searchIconRef}

                >
                    <FontAwesomeIcon

                        icon={!showSearchInput ? faSearch : faClose}
                        size="lg"
                        className="text-indigo-900"
                    />
                </div>

                {/* Check Square icon */}
                <div className={iconsStyles}>
                    <FontAwesomeIcon
                        icon={faCheckSquare}
                        size="lg"
                        className="text-indigo-900"
                    />
                </div>
                {/* Plus icon */}
                <div

                    onClick={() => setisNewNoteOpen(!isNewNoteOpen)}
                    className={iconsStyles}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        size="lg"
                        className={`text-indigo-900 ${isNewNoteOpen ? 'rotate-45' : ''} duration-300 ease-in-out`}


                    />
                </div>






                {/* External Link/Settings icon */}
                <div
                    onClick={handleSettingsToggle}
                    className={iconsStyles}>
                    <img src="/assets/icons/settings.svg" alt="settings" />
                </div>




            </div>


            {/* settings menue itmes */}

            <div
                className={`flex flex-col justify-around h-full  ${(handleSettingChange && isOpen) ? 'sm:flex' : 'hidden'
                    }`}
                id="new_items"
            >

                {/* Change font  */}
                {changeThemAndFont === '' ?

                    <div className='flex flex-col justify-around h-4/5'>
                        {/* Logout icon */}
                        < div
                            onClick={handleLogout}
                            className={iconsStyles}
                        >
                            <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="text-indigo-900" />
                            <h3 className='absolute top-10 text-white'>Logout</h3>
                        </div>
                        {/* 
                        Change theme icon
                        <div className={iconsStyles}
                            onClick={() => { setchangeThemAndFont('theme') }}
                        >
                            Add your implementation for the change theme icon
                            <FontAwesomeIcon icon={faPalette} size='lg' />
                        </div> */}

                        {/* Change font type icon */}
                        <div

                            onClick={() => { setchangeThemAndFont('font') }}
                            className={iconsStyles}
                        >
                            {/* Add your implementation for the change font type icon */}
                            <FontAwesomeIcon icon={faFont} size='lg' />

                        </div>
                    </div>

                    : changeThemAndFont == 'font' ? <FontSettings /> : ''
                    // changing theme
                    //  changeThemAndFont == 'theme' ? <ThemeSelector onSelectTheme={onSelectTheme} /> : ''


                }
                {/* Back icon */}
                <div
                    onClick={changeThemAndFont == '' ? handleBackToggle : handleChangeingThemeAndFontBack}
                    className="cursor-pointer mx-auto -translate-y-11 p-1 flex items-center  justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md
                
                    hover:bg-opacity-75  duration-200 ease-in-out
                    "
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-indigo-900 " />
                </div>

            </div>





        </div >
    );
};

export default SideBar;