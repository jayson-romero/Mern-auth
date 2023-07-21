import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>  
        <Route path="/" element={
    
              <Home/>
    
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </>
    )
  )

  return (
    <>  
      <ToastContainer/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
