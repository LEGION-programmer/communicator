import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PulpitPage from './pages/PulpitPage'

function App() {
  document.body.style.backgroundColor = '#41D3BD'
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pulpit" element={<PulpitPage />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
