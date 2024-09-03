import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const BlogItem = ({ id, title, desc, image, category }) => {
  
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[7px_7px_0px_#000] transition-shadow duration-300 ease-in-out cursor-pointer">
      <Link to={`/blogs/${id}`}>
        <img
          src={ `http://127.0.0.1:8000${image}`}
          alt={title}
          width={400}
          height={400}
          className="border border-black"
        />
      </Link>
      <p className="ml-5 text-white text-sm mt-5 inline-block px-1 py-1 bg-black">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium text-gray-900">{title}</h5>
        <p className="mb-3 text-sm text-gray-700">{desc}</p>
        <Link to={`/blogs/${id}`}>
          <div className="inline-flex items-center py-2 text-center font-semibold gap-2 cursor-pointer">
            Read more
            <img src={assets.arrow} alt="Arrow icon" width={12} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
