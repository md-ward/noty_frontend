import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCheckSquare, faBurger, faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate()


    return (
        <div className={`min-h-screen col-span-1 rounded-tr-md rounded-br-md  bg-indigo-300`}>
            <FontAwesomeIcon
                onClick={() => setOpenMenu(!openMenu)}
                icon={faBurger} size='2xl' className=' text-white p-2 sm:hidden' />
            <ul className={` flex flex-col justify-start  sm:items-center text-center  gap-10 sm:mt-36  sm:block ${openMenu ? '' : 'hidden'}`}>
                <li className="mb-4 relative text-white group">
                    {/* <FontAwesomeIcon className='cursor-pointer' icon={faStickyNote} size="lg" /> */}
                    <img src="/assets/icons/sticky1.svg" className=' round object-scale-down w-10 mx-auto' />
                    <h2 className="absolute w-28 hidden duration-300 ease-in-out z-40 left-24 top-0 rounded-full text-center group-hover:block bg-dark-blue bg-opacity-80 text-white">
                        Notes
                    </h2>
                </li>
                <li className="mb-4 relative text-white group">
                    <FontAwesomeIcon className='cursor-pointer' icon={faCheckSquare} size="lg" />
                    <h2 className="absolute w-28 hidden duration-300 ease-in-out z-40 left-24 top-0 rounded-full text-center group-hover:block bg-dark-blue bg-opacity-80 text-white">
                        Tasks
                    </h2>
                </li>
            </ul>

            <FontAwesomeIcon icon={faExternalLinkSquare} size='lg' className='mx-auto w-full cursor-pointer'

                onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('naem')

                    navigate('/register', { replace: true })

                }}
            />
        </div>
    );
}

export default SideBar;