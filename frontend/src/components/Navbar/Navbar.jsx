import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios if not already imported
import { assets } from "../../assets/assets";

const Navbar = () => {
  // const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const token = localStorage.getItem("authToken");
    //     const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
    //       headers: {
    //         'Authorization': `Token ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     setUser(response.data);
    //   } catch (error) {
    //     console.log("Failed to fetch user data:", error.message);
    //     setUser(null);
        
    //   }
    // };
  
    // fetchUserData();
    const token = localStorage.getItem("authToken");
    setToken(token);
  }, []);
  
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={assets.logo} alt="Logo" />
        </Link>

        {token ? (
          <Link to="/userpanel/add-blog">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
              User Panel
            </button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
