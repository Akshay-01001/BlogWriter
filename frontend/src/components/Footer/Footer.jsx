import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="bg-black text-white p-4 flex flex-col sm:flex-row justify-around items-center text-center sm:text-left">
      <div className="mb-4 sm:mb-0">
        <img src={assets.logo_light} alt="Logo" />
      </div>

      <div className="font-thin text-xs sm:text-sm mb-4 sm:mb-0">
        <p>All Rights Reserved. Copyright &copy; Blogger</p>
      </div>

      <div className="flex justify-center sm:justify-end gap-4 text-xs sm:text-sm">
        <img src={assets.facebook_icon} alt="Facebook" />
        <img src={assets.twitter_icon} alt="Twitter" />
        <img src={assets.googleplus_icon} alt="Google Plus" />
      </div>
    </div>
  );
};

export default Footer;
