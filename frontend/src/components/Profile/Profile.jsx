import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUserData(response.data);
        setFormData({
          email: response.data.user.email,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
        });
      } catch (error) {
        console.log("Failed to fetch user data:", error.message);
        setUserData(null);
        setError("Failed to load user data");
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('first_name', formData.first_name);
    formDataToSubmit.append('last_name', formData.last_name);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/profile/update/",
        formDataToSubmit,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data', 
          },
        }
      );
      setIsEditing(false);
    
    } catch (error) {
      console.log("Failed to update profile:", error.message);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full">
      {userData.profile_pic && (
        <img
          src={`http://127.0.0.1:8000${userData.profile_pic}`}
          alt="Profile"
          width={80}
          className="rounded-full h-20 w-20 my-5 mx-auto"
        />
      )}
      {!isEditing ? (
        <>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border border-black">Field</th>
                <th className="px-4 py-2 text-left border border-black">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-black">Username</td>
                <td className="px-4 py-2 border border-black">{userData.user.username || "NA"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black">Email</td>
                <td className="px-4 py-2 border border-black">{userData.user.email}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black">Firstname</td>
                <td className="px-4 py-2 border border-black">{userData.user.first_name || "Not set yet"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black">Lastname</td>
                <td className="px-4 py-2 border border-black">{userData.user.last_name || "Not set yet"}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="flex gap-x-2 mt-8 mx-auto border border-black px-6 py-2 text-center hover:shadow-[7px_-7px_0px_#000000]"
            onClick={() => setIsEditing(true)}
          >
            <img src={assets.blog_icon} alt="" className="h-6" />
            Edit
          </button>
        </>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-start gap-4 mx-10"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="border border-black px-2 py-1"
              placeholder="Enter here"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="border border-black px-2 py-1"
              placeholder="Enter here"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-black px-2 py-1"
              placeholder="Enter here"
            />
          </div>

          <div className="flex flex-row gap-2">
            <button
              type="submit"
              className="flex gap-x-2 border border-black px-4 py-2 text-center hover:shadow-[7px_-7px_0px_#000000] bg-gray-500"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="flex gap-x-2 border border-black px-4 py-2 text-center hover:shadow-[7px_-7px_0px_#000000] bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;