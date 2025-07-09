import {BrowserRouter, Route, Routes, useNavigate, Navigate} from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Send from './pages/send'
import Profile from './pages/profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home'
import { Toaster } from 'sonner';

function App() {

  return (<>
  <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/send' element={<Send/>}/>
      <Route path='/dashboard' element={<Dashboard user={'User'} pfplink={'johnpork.jpeg'}/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path="*" element={<Navigate to="/home" />}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer/>
    <Toaster richColors  position="top-center" />
    </>
  )
}

export default App
