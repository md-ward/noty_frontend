import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import REACT_APP_API_URL from '../../../env';

function SignUpForm({ setIsLogin }) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [togglePassword, settogglePassword] = useState(true);
    const [errorState, seterrorState] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            '#sign-up-form',
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        );
    }, []);

    function handleTogglerPassword() {
        settogglePassword(!togglePassword);
    }

    function handleSwitchToLogin() {
        gsap.to('#sign-up-form', {
            skew: -10,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setIsLogin(true);
            }
        });
    }

    async function handleSignUp(event) {
        event.preventDefault();

        const passwordValidation = /^([a-zA-Z0-9_]+)$/.test(password);
        if (passwordValidation) {
            try {
                const response = await axios.post(`${REACT_APP_API_URL}/reg/signup`, {
                    name,
                    email,
                    password
                });

                console.log(response);
                localStorage.setItem('token', response.data['token']);
                localStorage.setItem('name', response.data['name']);
                navigate('/', { replace: true });
            } catch (error) {
                seterrorState(error.response.data.errorMessage);
            }
        } else {
            seterrorState('Please enter a valid password: [a-zA-Z0-9]');
        }
    }

    return (
        <div className='bg-white rounded-xl p-4 shadow-lg col-span-4 ' id='sign-up-form'>
            <div className='flex flex-col justify-center gap-14'>
                <h2 className='place-self-center text-2xl text-dark-blue font-serif'>Sign Up</h2>
                <form className='font-serif flex flex-col'>
                    <div className='mb-6 space-y-2'>
                        <label htmlFor='name' className='block text-sm font-bold leading-5 text-blue-600'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring ring-indigo-500'
                        />
                    </div>
                    <div className='mb-6 space-y-2'>
                        <label htmlFor='email' className='block text-sm font-bold leading-5 text-blue-600'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring ring-indigo-500'
                        />
                    </div>
                    <div className='mb-6 space-y-2'>
                        <label htmlFor='password' className='block text-sm font-bold leading-5 text-blue-600'>
                            Password
                        </label>
                        <span className='relative flex justify-end items-center'>
                            <input
                                type={togglePassword ? 'password' : 'text'}
                                id='password'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errorState) {
                                        seterrorState(false);
                                    }
                                }}
                                className='w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring ring-indigo-500'
                            />
                            <FontAwesomeIcon
                                onClick={handleTogglerPassword}
                                icon={togglePassword ? faEye : faEyeSlash}
                                size='lg'
                                className='ml-3 cursor-pointer text-indigo-500 '
                            />
                        </span>
                        {errorState && <p className='text-red-700 rounded-lg'>{errorState}</p>}
                    </div>
                    <button
                        onClick={handleSignUp}
                        type='submit'
                        className='font-serif bg-indigo-500 hover:bg-indigo-600 w-1/2 text-white font-bold mt-4 mb-2 py-2 px-4 place-self-center rounded'
                    >
                        Submit
                    </button>
                    <h3 className='mx-auto underline mb-1'>Already have an account?</h3>
                    <h2
                        onClick={handleSwitchToLogin}
                        className='cursor-pointer bg-dark-blue hover:bg-opacity-90 rounded-lg place-self-center w-fit p-2 text-white'
                    >
                        Login
                    </h2>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;