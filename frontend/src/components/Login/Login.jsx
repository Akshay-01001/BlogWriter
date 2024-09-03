import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });
      alert("LogIn successful");
      if (response.status === 200) {
        const { token } = response.data; 
        localStorage.setItem('authToken', token); 
        navigate('/');
      }
      
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="w-full flex justify-center mb-6">
          <Link to={'/'}>
            <img src={assets.logo} alt="Logo" height={150} width={120} />
          </Link>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Login Here
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="username" className="block">
            <input
              type="text"
              id="username"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="block">
            <input
              type="password"
              id="password"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to={'/register'} className="text-teal-600 hover:text-teal-700">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
