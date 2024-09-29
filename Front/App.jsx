// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from './src/pages/HomePages';
import {LoginPage} from './src/pages/LoginPage';
import {SignupPage} from './src/pages/SignupPage';

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