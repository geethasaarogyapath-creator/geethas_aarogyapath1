import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Clients from './components/Clients.jsx'
import Client from './components/Client.jsx';
import Login from './components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} />
      <Route path='/' element={<Clients />} />
      <Route path='/client/:id' element={<Client />} />
      <Route path='/login' element={<Login />} />
      <Route path='/clients' element={<Clients />} />
    </Routes>
  </BrowserRouter>
)
