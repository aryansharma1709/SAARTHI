import Footer from "./Footer"
import BannerSlide from "./BannerSlide"
import MessagingCircle from "./MessagingCircle"
import Book from "./Book"
// import Signup from "./SignUp"
import NewsFeed from "./NewsFeed"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
function App() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  return (
   <>
     {/* <BannerSlide/> */}
     {/* <MessagingCircle/> */}
    {/* <Footer/> */}
    {/* <Book/> */}
    <input type="text" className="mt-40" placeholder="Enter Room ID"  onChange={(e) => setRoomId(e.target.value)} value={roomId} />
    <input type="button" className="mt-40" value="Go to VideoVoice" onClick={() => navigate(`/room/${roomId}`)} />
    {/* <Signup /> */}
    {/* <NewsFeed /> */}
    {/* <VideoVoice />   */}
    </>
  )
}

export default App
