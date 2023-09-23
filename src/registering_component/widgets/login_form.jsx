import React, { useState } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import useAuth from '../../useAuth';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(true);

  const { login, errorMessage, setErrorMessage } = useAuth();
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    else {
      login(email, password, navigate)
    }
  };

  const handleSwitchToSignUp = () => {
    gsap.to('#login-form', {
      skew: -10,
      translateX: 150,
      translateY: 100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsLogin(false);
      },
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg mx-auto w-96 h-1/2 my-auto z-30" id="login-form">
      <h1 className="text-3xl mb-4 text-center text-dark-blue font-serif">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="mb-6 space-y-2">
          <label htmlFor="email" className="block text-sm font-bold leading-5 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring focus:translate-y-1 transition-all duration-300 ring-indigo-500"
          />
        </div>

        <div className="mb-6 space-y-2">
          <label htmlFor="password" className="block text-sm font-bold leading-5 text-gray-700">
            Password
          </label>
          <span className="relative flex justify-end items-center">
            <input
              type={togglePassword ? 'password' : 'text'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring ring-indigo-500"
            />
            <FontAwesomeIcon
              onClick={handleTogglePassword}
              icon={togglePassword ? faEye : faEyeSlash}
              size="lg"
              className="ml-3 cursor-pointer text-indigo-500"
            />
          </span>
        </div>

        {errorMessage && <div className="text-red-500 text-xs italic mb-2">{errorMessage}</div>}

        <button
          type="submit"
          className="font-serif bg-indigo-500 hover:bg-indigo-600 w-1/2 text-white font-bold mt-4 mb-2 py-2 px-4 place-self-center rounded"
        >
          Submit
        </button>

        <h2 className="mx-auto underline mb-1">Don't have an account?</h2>
        <button
          type="button"
          onClick={handleSwitchToSignUp}
          className="cursor-pointer bg-dark-blue hover:bg-opacity-90 rounded-lg place-self-center w-fit p-2 text-white"
        >
          SignUp
        </button>
      </form>
    </div>
  );
}

export default LoginForm;