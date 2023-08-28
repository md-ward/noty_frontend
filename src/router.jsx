import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import NotesPage from "./notes_component/view/notes_page";
import Register from "./registering_component/view/registering_page";
import useAuth from "./useAuth";

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const AppRouter = () => {
  // const { isLoggedIn } = useAuth();
  const ErrorPage = () => {

    const navigate = useNavigate()
    useEffect(() => {
      setTimeout(() => {
        navigate('/register', { replace: true })

      }, 1300);

    }, [])

    return (
      <div className="min-h-screen w-full bg-dark-blue flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faWarning} className="text-white" size="9x" />
        <h1 className="text-white text-lg">Error page not found 404</h1>
        <h2 className="text-white text-lg">Redirecting......</h2>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<NotesPage />} />


      </Route>
    </Routes>
  );
};

export default AppRouter;


const ProtectedRoute = () => {

  const isLoggedIn = useAuth();

  return isLoggedIn ? <Outlet /> : <Register />


}