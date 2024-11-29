import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import VideoVoice from './VideoVoice.jsx'
import Navbar from './Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/room/:id" element={<VideoVoice />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
