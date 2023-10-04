import NotificationContainer from "./global/widgets/notification_snackbar";
import AppRouter from "./router";

import { useEffect } from "react";
import { getCookie } from "./useCookies";
import socketManager from "./socketManager";

function App() {
  useEffect(() => {
    socketManager.init().then(() => {
      const socket = socketManager.getInstance();

      // Clean up the socket connection when the component unmounts
      return () => {
        socketManager.disconnect();
      };
    }).catch((error) => {
      console.error("Socket initialization error:", error);
      // Handle initialization error, e.g., show an error message to the user
    });
  }, []);

  document.body.style.fontFamily = getCookie("fontFamily");

  return (
    <>
      <NotificationContainer />
      <AppRouter />
    </>
  );
}

export default App;