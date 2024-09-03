import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
    {/*    <div className="flex justify-between items-center">
    //     <Link to=''><img src={assets.logo} alt="Logo" /></Link>
    //     <button
    //       className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black"
    //       style={{ boxShadow: "-7px 7px 0px #000000" }}
    //     >
    //       Sign Up
    //     </button>
    //   </div> */}
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tempora
          a facilis, dicta unde fuga deleniti aperiam, facere ab impedit commodi
          alias voluptatum voluptatibus explicabo odit rerum sapiente animi id.
        </p>
      </div>
    </div>
  );
};

export default Header;
