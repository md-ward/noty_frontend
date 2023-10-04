import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faBars, faPlus, faExternalLinkAlt, faArrowLeft, faFont, faSearch, faClose, faGear, faStickyNote, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import  { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSidebarStore from '../global_stores/useSidebarStore';


import { gsap } from 'gsap';
import FontSettings from '../widgets/font_settings';
import useAuth from '../../useAuth';
import useNotesStore from '../../notes_component/stateManagementStores/notesStore';
import useTaskStore from '../../tasks_component/stateManagementStores/useTaskStore';
const SideBar = () => {


    const { isOpen, toggleSidebar, openSidebar, closeSidebar } = useSidebarStore();
    const [handleSettingChange, sethandleSettingChange] = useState(false);
    const [changeThemAndFont, setchangeThemAndFont] = useState('');
    const { setShowSearchInput, showSearchInput, isNewNoteOpen, setisNewNoteOpen } = useNotesStore();

    const { openCreateTaskDialog } = useTaskStore();


    //! get Refrence of the search bar  
    const searchIconRef = useRef(null);

    //! get the path ...........    
    const urlPath = useLocation();

    //? custom hook for authentecation 
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
            logout(navigate)
        }
    };


    // ! open and close the search bar /

    function handleSearchToggleAndNavToTeam(pathname) {

        switch (pathname) {
            case '/':
            case '/notes':
                // Handle search toggle for '/' and '/notes' paths
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

                break;

            case '/tasks':
                navigate('/teams');
                break;

            default:
                break;
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

    function handleCreateNoteOrTask() {
        if (urlPath.pathname == '/' || urlPath.pathname == '/notes') {
            setisNewNoteOpen(!isNewNoteOpen)

        }
        else {

            openCreateTaskDialog()

        }
    }


    // ! buttons style 
    const iconsStyles = 'relative flex items-center justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md hover:bg-opacity-75  duration-200 ease-in-out cursor-pointer';


    //! to handle the navigation process..... 

    function handleNavigation(url) {

        navigate(url, { replace: true })

    }

    return (
        <div
            className={`  ${isOpen ? 'h-screen max-sm:col-span-2' : 'fixed h-fit max-sm:mt-2 right-0'
                } transition-all duration-300 ease-in-out   flex flex-col justify-around rounded-l-lg items-center sm:h-screen bg-gradient-to-b from-indigo-500 to-blue-500    overflow-y-hidden hover:bg-opacity-75  `}
        >

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

                {/* Search/Teams icon */}
                <div className={iconsStyles} onClick={() => handleSearchToggleAndNavToTeam(urlPath.pathname)} ref={searchIconRef}>
                    <FontAwesomeIcon
                        icon={urlPath.pathname === '/tasks' ? faUserGroup : (!showSearchInput ? faSearch : faClose)}
                        size="lg"
                        className="text-indigo-900"
                    />
                </div>
                {/* StyickyNote icon: nav to notes page */}
                <div
                    className={iconsStyles}
                    onClick={() => handleNavigation('/notes')}
                    style={{ backgroundColor: (urlPath.pathname === '/notes' || urlPath.pathname === '/') ? 'white' : '' }}
                >
                    <FontAwesomeIcon icon={faStickyNote} size="lg" className="text-indigo-900" />
                </div>
                {/* Check Square icon: nav to tasks page */}
                <div
                    className={iconsStyles}
                    onClick={() => handleNavigation('/tasks')}
                    style={{ backgroundColor: urlPath.pathname === '/tasks' ? 'white' : '' }}
                >
                    <FontAwesomeIcon icon={faCheckSquare} size="lg" className="text-indigo-900" />
                </div>
                {/* Plus icon */}
                <div onClick={handleCreateNoteOrTask} className={iconsStyles}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        size="lg"
                        className={`text-indigo-900 ${isNewNoteOpen ? 'rotate-45' : ''} duration-300 ease-in-out`}
                    />
                </div>
                {/* External Link/Settings icon */}
                <div onClick={handleSettingsToggle} className={iconsStyles}>
                    <FontAwesomeIcon icon={faGear} size="xl" />
                </div>
            </div>

            {/* settings menue itmes */}
            <div
                className={`flex flex-col justify-around h-full  ${(handleSettingChange && isOpen) ? 'sm:flex' : 'hidden'
                    }`}
                id="new_items"
            >
                {/* Change font */}
                {changeThemAndFont === '' ? (
                    <div className="flex flex-col justify-around h-4/5">
                        {/* Logout icon */}
                        <div onClick={handleLogout} className={iconsStyles}>
                            <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="text-indigo-900" />
                            <h3 className="absolute top-10 text-white">Logout</h3>
                        </div>
                        <div onClick={() => setchangeThemAndFont('font')} className={iconsStyles}>
                            {/* Add your implementation for the change font type icon */}
                            <FontAwesomeIcon icon={faFont} size="lg" />
                        </div>
                    </div>
                ) : changeThemAndFont === 'font' ? (
                    <FontSettings />
                ) : (
                    ''
                )}
                {/* Back icon */}
                <div
                    onClick={changeThemAndFont === '' ? handleBackToggle : handleChangeingThemeAndFontBack}
                    className="cursor-pointer mx-auto -translate-y-11 p-1 flex items-center  justify-center rounded-full w-10 h-10 bg-white bg-opacity-50 text-indigo-900 shadow-md
                hover:bg-opacity-75  duration-200 ease-in-out
                "
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-indigo-900 " />
                </div>
            </div>
        </div>
    );
};

export default SideBar;