import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccess("Logged in successfully!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    setSuccess("");

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setSuccess(`Welcome back, ${user.displayName}!`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
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
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M21.35 11.1h-9.4v2.94h5.44c-.28 1.62-1.16 2.89-2.47 3.78v3.13h3.98c2.33-2.14 3.67-5.3 3.67-8.82 0-.94-.08-1.88-.22-2.78zm-9.35-9.9c-1.94 0-3.74.72-5.09 1.9l2.95 2.95c.7-.46 1.52-.72 2.4-.72 1.87 0 3.47 1.16 4.06 2.73h3.94c-1.1-3.2-4.19-5.49-8-5.49zm-11.45 11.1c0 3.51 1.34 6.68 3.67 8.82l3.98-3.13c-1.72-1.2-2.9-3.15-2.9-5.69 0-2.54 1.18-4.49 2.9-5.69l-3.98-3.13c-2.33 2.14-3.67 5.31-3.67 8.82z" />
          </svg>
          Login with Google
        </button>
        <p className="text-sm text-center text-gray-500">
          {"Don't have an account? "}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;