import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBlogs = () => {
  const [data, setData] = useState([]);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://127.0.0.1:8000/api/myblogs", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const deleteBlog = async(id)=>{{
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/blogs/${id}/delete/`,{
        headers:{
          Authorization:`Token ${localStorage.getItem("authToken")}`,
        }
      })
      if(response.status === 204){
        fetchBlogs()
        alert("Blog deleted successfully");
      }
    } catch (error) {
      console.log(error);
      
    }
  }}

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="h-screen w-full mt-2 overflow-hidden">
      <p className="my-2">All Blogs</p>
      {data.length > 0 ? (
        <>
          <table className="min-w-full">
            <thead className="border border-black">
              <tr className="font-semibold bg-gray-100 text-sm sm:text-lg text-gray-700">
                <td className="sm:px-5 px-1">AUTHOR NAME</td>
                <td className="sm:px-5 px-1">BLOG TITLE</td>
                <td className="sm:px-5 px-1">DATE</td>
                <td className="sm:px-5 px-1">ACTION</td>
              </tr>
            </thead>

            <tbody>
              {data.map((blog, index) => (
                <tr key={index} className="border border-black">
                  <td className="sm:px-5 px-1 flex flex-wrap items-center gap-2 py-2">
                    <img
                      src={`http://127.0.0.1:8000/${blog.author_pic}`}
                      alt="Author"
                      className="h-7 w-7 rounded-full"
                    />
                    <p>{blog.author.username}</p>
                  </td>
                  <td className="sm:px-5 px-1 py-2">{blog.title}</td>
                  <td className="sm:px-5 px-1 py-2">
                    {new Date(blog.created_at).toLocaleString()}
                  </td>
                  <td className="sm:px-5 px-1 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mx-2" 
                    onClick={() => window.location.href = `/blogs/${blog.id}`}>
                      View
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteBlog(blog.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="font-bold text-lg">
          You Don't Have Created Any Blogs !!
        </p>
      )}
    </div>
  );
};

export default UserBlogs;
