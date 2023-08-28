
import AppRouter from "./router"


function App() {


  document.body.style.fontFamily = localStorage.getItem("fontFamily");


  return (
    <>
      <AppRouter></AppRouter>
    </>

  )
}

export default App
