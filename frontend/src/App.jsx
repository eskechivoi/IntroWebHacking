import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './login.jsx'
import Profile from './profile.jsx'

function App() {
  const [userToken, setUser] = useState('');
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login userToken={userToken}/>}/>
        <Route path="/profile" element={<Profile userToken={userToken}/>}/>
      </Routes>
    </>
  )
}

export default App
