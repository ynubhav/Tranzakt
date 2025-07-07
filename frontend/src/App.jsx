import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Send from './pages/send'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/send' element={<Send/>}/>
      <Route path='/dashboard' element={<Dashboard user={'Anubhav'} pfplink={'johnpork.jpeg'}/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
