// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import {LoginPage} from './pages/LoginPage';
import {HomePage} from './pages/HomePages';
import {SignupPage} from './pages/SignupPage';

function App() {
  return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
  )
}

export default App