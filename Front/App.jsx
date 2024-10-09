// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from './src/pages/HomePages';
import {LoginPage} from './src/pages/LoginPage';
import {SignupPage} from './src/pages/SignupPage';
import {ProfilePage} from './src/pages/ProfilePage';
import {EditProfilePage} from './src/pages/EditProfilePage';
import { ChangedPasswordPage } from './src/pages/ChangePasswordPage';

function App() {
  return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditProfilePage />} />
        <Route path="/password" element={<ChangedPasswordPage />} />
      </Routes>
  )
}

export default App