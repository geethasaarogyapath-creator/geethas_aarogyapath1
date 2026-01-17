import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
