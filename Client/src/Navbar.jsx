import logo from './assets/Saarthi_logo_1.png';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMentor, setIsMentor] = useState(false);

  const handleLogout = () => {
    auth.signOut();
    window.location.href="/login";
  }

  useEffect(() => {
    if (auth.currentUser) {
      setIsLogged(true);
      setUserName(auth.currentUser.displayName || "User"); 
    } else {
      // navigate('/login');
    }
  }, [auth.currentUser, navigate]);

  useEffect(() => {
    let userToken = localStorage.getItem("user");
    if(userToken === "mentor"){
      setIsMentor(true);
      setIsLogged(true);
    }
  }, []);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-10 rounded-full"
              />
            </Link>
            <div className="flex space-x-4">
              <Link to="/inbox" className="flex items-center space-x-1 hover:text-blue-500">
                <span>Inbox</span>
              </Link>
              {
                isMentor &&
                <Link to="/video" className="flex items-center space-x-1 hover:text-blue-500">
                <span>Video Call</span>
              </Link>
              }
              <Link to="/resources" className="flex items-center space-x-1 hover:text-blue-500">
                <span>Study Resources</span>
              </Link>
              <Link to="/news-feed" className="flex items-center space-x-1 hover:text-blue-500">
                <span>News Feed</span>
              </Link>
              {
                !isMentor &&
                <Link to="http://localhost:8501/" target='_blank' className="flex items-center space-x-1 hover:text-blue-500">
                <span>Resume Checker</span>
              </Link>
              }
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isLogged ? (
              <>
                <div className="flex items-center space-x-3 text-gray-700 px-4 py-2">
      <div className="relative">
        
          <img 
            src="https://tse3.mm.bing.net/th?id=OIP.EwG6x9w6RngqsKrPJYxULAHaHa&pid=Api&P=0&h=180" 
            alt={`${userName}'s avatar`} 
            className="w-10 h-10 rounded-full object-cover"
          />
        
        
        <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      <span className="font-medium">{userName}</span>
    </div>
              {
                isMentor && (
                  <span className="px-2 py-2 font-medium">
                    Monu Kumar
                  </span>
                )
              }
                <button
                onClick={handleLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (

              <Link
              to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
