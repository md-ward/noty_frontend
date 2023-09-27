
import NotificationContainer from "./global/widgets/notification_snackbar";
import AppRouter from "./router"


function App() {


  document.body.style.fontFamily = localStorage.getItem("fontFamily");


  return (
    <>
      <NotificationContainer />
      <AppRouter></AppRouter>


      
    </>

  )
}

export default App
