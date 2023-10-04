import { create } from 'zustand';
import axios from 'axios';
import REACT_APP_API_URL from '../env';
import { getCookie, removeCookie, setCookie } from './useCookies';
import useNotificationStore from './global/global_stores/notificationStore'
import socketManager from './socketManager';


const useAuth = create((set) => ({
    isLoggedIn: getCookie('token'),
    errorMessage: '',
    setErrorMessage: (errorMessage) => {
        set({ errorMessage: errorMessage })
    },
    login: async (email, password, navigate) => {


        try {
            const response = await axios.post(`${REACT_APP_API_URL}/reg/login`, {
                email,
                password,
            });

            if (response.status === 200) {


                setCookie('token', response.data.token);
                setCookie('name', response.data.name);
                set({ isLoggedIn: true });

                navigate('/notes', { replace: true });
                useNotificationStore.getState().addNotification(`wellcom back ${response.data.name}`)

            
            } else {
                useAuth.getState().setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            useAuth.getState().setErrorMessage(error.response?.data?.errorMessage || 'An error occurred during login');
        }


    },
    logout: (navigate) => {
        removeCookie()
        set({ isLoggedIn: false });
        socketManager.disconnect()
        navigate('/register', { replace: true });

    },
}));

export default useAuth;