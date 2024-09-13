import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/blogs/${id}/comments/`
      );
      setCommentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("content", comment);
      formData.append('blog_post', id); 
      const response = await axios.post(
        `http://127.0.0.1:8000/api/blogs/${id}/comments/create/`,
        {
          content: comment,
          blog_post: id,
        },
        {
          headers: {
           "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Comment added successfully");
        setComment("");
        fetchComments();
      } else {
        setError("Failed to add Comment");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
        <textarea
          name="comments"
          id="comment"
          rows={3}
          cols={60}
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md resize-none mb-2 sm:mb-0"
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleChange}
        ></textarea>
        <button
          className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={addComment}
        >
          ADD
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {commentList.map((item) => {
          return (
            <div key={item.id} className="flex items-start p-4 border border-gray-300 rounded-md bg-white shadow-md">
              {item.author_pic && (
                <img
                  src={`http://127.0.0.1:8000${item.author_pic}`}
                  alt={item.author_username}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
              )}
              <div>
                <strong className="block text-lg text-gray-900">{item.author_username}</strong>
                <p className="text-gray-700">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
