import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import VideoVoice from './VideoVoice.jsx'
import Navbar from './Navbar.jsx'
import Login from './Login.jsx'
import Signup from './SignUp.jsx'
import Book from './Book.jsx'
import NewsFeed from './NewsFeed.jsx'
import Inbox from './Inbox.jsx'
import SetupVideo from './SetupVideo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path='/login' element={<Login />} />
        <Route path='/video' element={<SetupVideo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/room/:id" element={<VideoVoice />} />
        <Route path="resources" element={<Book />} />
        <Route path='/news-feed' element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
