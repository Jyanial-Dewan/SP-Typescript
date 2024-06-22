import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import DepartmentsPage from "./pages/DepartmentsPage"
import { GlobalContextProvider } from "./contexts/GlobalContext"
import { Toaster } from "react-hot-toast"



function App() {
  

  return (
    <GlobalContextProvider>
      <Toaster position="top-center"/>
      <Navbar/>
      <Routes>
        <Route path="/departmets" element={<DepartmentsPage/>}/>
      </Routes>
    </GlobalContextProvider>
  )
}

export default App
