import React, { useState, useRef } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [error, setError] = useState("");
  const editor = useRef(null);
  const [desc, setDesc] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", image);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("description", desc);

    try {
      const token = localStorage.getItem("authToken");
      console.log(token);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/blogs/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Blog added successfully");
        window.location.reload();
      } else {
        setError("Failed to add blog");
      }
    } catch (error) {
      console.log(error.message);
      setError("Error occurred while adding blog");
    }
  };

  return (
    <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={handleAdd}>
      <p className="text-xl">Upload Thumbnail</p>
      <label htmlFor="image">
        <img
          src={!image ? assets.upload_area : URL.createObjectURL(image)}
          alt="upload"
          width={140}
          height={70}
          className="mt-4 cursor-pointer"
        />
      </label>
      <input
        type="file"
        name="image"
        id="image"
        hidden
        required
        onChange={(e) => setImage(e.target.files[0])}
      />

      <p className="text-xl mt-4">Blog title</p>
      <input
        type="text"
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Type Here"
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        rows={4}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border h-48"
        placeholder="Write Content Here"
        required
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      <p className="text-xl mt-4">Blog Content</p>
      <JoditEditor
        className="mt-4"
        ref={editor}
        value={content}
        tabIndex={1}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        className="w-40 mt-4 px-4 py-3 mb-2 border text-gray-500"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="Technology">Technology</option>
        <option value="Startup">Startup</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <br />
      <button className="mt-8 w-40 h-12 bg-black text-white mb-3" type="submit">
        ADD
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default AddBlog;
