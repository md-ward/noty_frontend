import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import NotesPage from "./notes_component/view/notes_page";
import Register from "./registering_component/view/registering_page";
import TasksPage from "./tasks_component/view/tasks_main_page";
import TeamsPage from "./tasks_component/view/teams_main_page";

const AppRouter = () => {

  const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate('/register', { replace: true });
      }, 1300);
    }, [navigate]);

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

      <Route element={<ProtectedRoute />} >
        <Route index element={<NotesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/register', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null;
};