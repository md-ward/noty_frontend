import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotesPage from "./notes_component/view/notes_page";
import Register from "./registering_component/view/registering_page";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  useEffect(() => {
    // Check if the user is logged in or not
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const ErrorPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
      setTimeout(() => {
        navigate('/register', { state: { from: location }, replace: true, relative: "route" })


      }, 1300);

    }, [])

    return (
      <div className="min-h-screen w-full bg-dark-blue flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faWarning} className="text-white " size="9x" />
        <h1 className="text-white text-lg "> Error page not found 404 </h1>
        <h2 className="text-white text-lg" >Rediecting  ......</h2>
      </div>

    )
  }


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />

      <Route path="/" element={
        isLoggedIn ?
          <NotesPage />
          :
          <Navigate to='/register' replace={true} />
        // <Register />

      } />
    </Routes>
  );
};

export default AppRouter;