// frontend/src/components/RegisterForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Link,useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_pic", profilePic);

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      setError("Registration failed");
      console.error(error);
    }
    if(!error){
        alert("Registration Successful")
        navigate('/login')
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="w-full flex justify-center mb-6">
          <Link to={"/"}>
            <img src={assets.logo} alt="Logo" height={150} width={120} />
          </Link>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Register Here
        </h2>
        <form className="space-y-6">
          <label htmlFor="username" className="block">
            <input
              required
              type="text"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="username" className="block">
            <input
              required
              type="email"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          
          <div className="relative">
            <img
                src={!profilePic?"https://via.placeholder.com/150":URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-teal-500 object-cover"/>
            <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full cursor-pointer text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm6 11a5 5 0 100-10 5 5 0 000 10zm1-5a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </label>
            <input
                id="profile-pic"
                required
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                />
                <span className="text-gray-500 mt-2">Upload Profile Picture</span>   
            </div>     
          <label htmlFor="password" className="block">
            <input
              type="password"
              required
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirm-password" className="block">
            <input
              required
              type="password"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Confirm Password"
              name="confirm-password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </label>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-400"
            onClick={handleSubmit}
          >
            Register
          </button>
          <p>Already Have An Accont?<Link to={"/login"} className="text-blue-900"> Login Here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
