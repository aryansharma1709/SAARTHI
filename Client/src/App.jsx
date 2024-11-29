import { useNavigate } from "react-router-dom"
import { 
  getAuth, 
} from "firebase/auth";
import LandingPage from "./LandingPage"
function App() {
  const navigate = useNavigate();
  const auth = getAuth();

  if (auth.currentUser) {
    console.log('User is logged in');
  }
  else{
    navigate('/login');
  }
  

  return (
    <LandingPage/>
  )
}

export default App
