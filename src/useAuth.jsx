import { create } from 'zustand';
import axios from 'axios';
import REACT_APP_API_URL from '../env';


const useAuth = create((set) => ({
    isLoggedIn: !!localStorage.getItem('token'),
    errorMessage: '',
    setErrorMessage: (errorMessage) => {
        set({ errorMessage: errorMessage })
    },
    login: async (email, password,navigate) => {


        try {
            const response = await axios.post(`${REACT_APP_API_URL}/reg/login`, {
                email,
                password,
            });

            if (response.status === 200) {


                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.name
                );
                set({ isLoggedIn: true });
                
                navigate('/notes', { replace: true });

            } else {
                useAuth.getState().setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            useAuth.getState().setErrorMessage(error.response?.data?.errorMessage || 'An error occurred during login');
        }


    },
    logout: (navigate) => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('fontFamily');
        set({ isLoggedIn: false });
        navigate('/register', { replace: true });
    },
}));

export default useAuth;