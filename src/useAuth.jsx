import { useState, useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in or not
        const checkLoggedIn = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkLoggedIn();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('fontFamily');
        setIsLoggedIn(false);
    };

    return { isLoggedIn, login, logout };
};

export default useAuth;