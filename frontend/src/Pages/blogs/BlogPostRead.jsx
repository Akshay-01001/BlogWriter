import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { assets } from "../../assets/assets.js";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";
import parse from "html-react-parser";
import Comment from "../../components/Comment/Comment.jsx";

const BlogPostRead = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`);
      if (response.data) {
        setData(response.data);
        console.log(response.data.author_pic);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="bg-gray-200 py-3 px-3 md:px-12">
        <Navbar />
        <div className="text-center my-24">
          <h1 className="text-xl sm:text-3xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          {data.author && (
            <div>
              <img
                src={`http://127.0.0.1:8000${data.author_pic}`}
                alt={`${data.author.username}'s profile`}
                // width={80}
                // height={120}
                className="border border-white mx-auto mt-6 h-20 w-20 rounded-full"
              />
              <p className="mx-auto pt-1 md:pt-2 text-lg font-semibold">
                Author : {data.author.username}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[800px] md:mx-auto mt-[-80px] mb-10 mx-5">
        <img
          src={`http://127.0.0.1:8000${data.thumbnail}`}
          alt="Blog Thumbnail"
          width={1280}
          height={720}
        />

        <h1 className="my-8 font-semibold text-xl">Description</h1>
        <div>{parse(data.description)}</div>

        <h1 className="my-8 font-semibold text-xl">Content</h1>
        <div>{parse(data.content)}</div>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share This Article On Social Media
          </p>
          <div className="flex">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="cursor-pointer"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="cursor-pointer"
            />
            <img
              src={assets.googleplus_icon}
              alt="Google+"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Comment id={id} />
      <Footer />
    </div>
  );
};

export default BlogPostRead;
