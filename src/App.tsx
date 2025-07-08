import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'
import './App.css'

function App() {
  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
