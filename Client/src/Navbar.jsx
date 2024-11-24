import logo from './assets/Saarthi_logo_1.png'
import { Link } from "react-router-dom";
export default function Navbar(){
    return  (
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
             {/* <Link to="/home" className="flex items-center space-x-1 hover:text-blue-500">
        <Home size={20} /> <span>Home</span>
      </Link>
      <Link to="/messaging" className="flex items-center space-x-1 hover:text-blue-500">
        <MessageCircle size={20} /> <span>Inbox</span>
      </Link>
      <Link to="/resources" className="flex items-center space-x-1 hover:text-blue-500">
        <Book size={20} /> <span>Study Resources</span>
      </Link>
      <Link to="/dashboard" className="flex items-center space-x-1 hover:text-blue-500">
        <Layout size={20} /> <span>Dashboard</span>
      </Link> */}
          </div>
        </div>
        <div className="flex items-center space-x-4">
        <Link 
            to="/login" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login/Signup
          </Link>
        </div>
      </div>
    </nav>
    </>
    )
};