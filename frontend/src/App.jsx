import {BrowserRouter, Route, Routes, useNavigate, Navigate} from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Send from './pages/send'
import Profile from './pages/profile'
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home'
import { Toaster } from 'sonner';
import { toast } from "sonner";
import History from './pages/history'
import Homenav from './components/homenavbar'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

function App() {
const online=useIsonline();
if(!online)
  toast.error('You are offline');
else
  toast.success('Connected')
  return (<>
  <BrowserRouter>
  <AnimatePresence mode="wait">
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/send' element={<Send/>}/>
      <Route path='/dashboard' element={<Dashboard user={'User'} pfplink={'johnpork.jpeg'}/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/tranzaktions' element={<History/>} />
      <Route path="*" element={<Navigate to="/home" />}/>
    </Routes>
    </AnimatePresence>
    </BrowserRouter>
    <ToastContainer position="bottom-right"/>
    <Toaster richColors  position="bottom-right" />
    </>
  )
}

function useIsonline(){
  const [isonline,setonline]=useState(window.navigator.onLine);

  useEffect(()=>{
    window.addEventListener("online",()=>{setonline(true)});
    window.addEventListener("offline",()=>{setonline(false)});
  },[])

  return isonline;
}

export default App
