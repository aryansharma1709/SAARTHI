import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/Saarthi_logo_1.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess("Logged in successfully!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
      <div className="rounded-lg overflow-hidden h-24 w-80 mx-auto">
        <img src={logo} alt="logo" className="w-full h-full object-cover" />
      </div>

        <h1 className="text-2xl font-bold text-center text-gray-700">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <a href="/forgot-password" className="text-sm text-indigo-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-500">or</span>
        </div>
        <p className="text-sm text-center text-gray-500">
          {"Don't have an account? "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;