import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './components/Profile';
import HeroSection from './components/HeroSection';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>  
        <Route path="/" element={<Home/>}>
          <Route path="/" element={<HeroSection/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
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
