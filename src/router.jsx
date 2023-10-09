import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect, lazy, Suspense } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import Loader from "./global/widgets/loader";
import Register from "./registering_component/view/registering_page"

const NotesPage = lazy(() => import("./notes_component/view/notes_page"));
const TasksPage = lazy(() => import("./tasks_component/view/tasks_main_page"));
const TeamsPage = lazy(() => import("./tasks_component/view/teams_main_page"));

const AppRouter = () => {
  const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1300);
    }, [navigate]);

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-indigo-500 to-blue-500 flex flex-col justify-center items-center">
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
        <Route index element={<Suspense fallback={<div>Loading...</div>}><NotesPage /></Suspense>} />
        <Route path="/notes" element={<Suspense fallback={<Loader />}><NotesPage /></Suspense>} />
        <Route path="/tasks" element={<Suspense fallback={<Loader />}><TasksPage /></Suspense>} />
        <Route path="/teams" element={<Suspense fallback={<Loader />}><TeamsPage /></Suspense>} />
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
  }, []);

  return isLoggedIn ? <Outlet /> : null;
};